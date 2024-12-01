import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

// Função para listar produtos
export async function getProducts() {
  try {
    const products = await stripe.products.list();
    const formattedProducts = await Promise.all(
      products.data.map(async (product) => {
        const priceList = await stripe.prices.list({
          product: product.id,
          active: true,
        });

        const price = priceList.data[0]; // Assume o primeiro preço ativo como válido.

        return {
          id: product.id,
          name: product.name,
          price: price?.unit_amount || 0,
          description: product.description || "",
          image: product.images[0] || "",
          category: product.metadata.category || "general",
          currency: price?.currency || "usd",
        };
      })
    );

    return formattedProducts;
  } catch (error) {
    console.error("Erro ao carregar os produtos do Stripe:", error);
    throw new Error("Erro ao carregar os produtos");
  }
}

// Função para buscar um produto específico
export async function getProduct(id: string) {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error(`Produto com ID ${id} não encontrado`);
  }

  return product;
}
