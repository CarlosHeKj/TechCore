import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

async function getProducts() {
  try {
    const products = await stripe.products.list();
    const formattedProducts = await Promise.all(
      products.data.map(async (product) => {
        const price = await stripe.prices.list({
          product: product.id,
          active: true,
        });
        return {
          id: product.id,
          name: product.name,
          price: price.data[0]?.unit_amount || 0,
          description: product.description || "",
          image: product.images[0] || "",
          category: product.metadata.category || "general",
          currency: price.data[0]?.currency || "usd",
        };
      })
    );
    return formattedProducts;
  } catch (error) {
    console.error("Erro ao carregar os produtos do Stripe:", error);
    throw new Error("Erro ao carregar os produtos");
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json({ message: "Erro ao carregar os produtos" }, { status: 500 });
  }
}
