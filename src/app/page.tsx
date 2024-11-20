
import Stripe from "stripe";
import Product from "./components/Product";

// Verifica se a variável de ambiente está configurada

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});



export async function getProducts() {
  const products = await stripe.products.list();
  const formattedProducts = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
        active: true,
      });
      return {
        id: product.id,
        price: price.data[0]?.unit_amount || 0,
        name: product.name,
        description: product.description || "",
        image: product.images[0] || "",
        category: product.metadata.category || "general",
        currency: price.data[0]?.currency || "usd",
      };
    })
  );
  return formattedProducts;
}

// Componente principal
export default async function Home() {
  // Busca os produtos
  const products = await getProducts();

  // Função para filtrar e renderizar produtos
  function ProductsList(min: number, max: number) {
    const productElements = [];
    for (let i = 0; i < products.length; i++) {
      const productPrice = products[i].price / 100; // Stripe retorna valores em centavos
      if (productPrice > min && productPrice <= max) {
        productElements.push(
          <Product key={products[i].id} product={products[i]} />
        );
      }
    }
    return productElements;
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 bg-gray-900/20">
      <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$50,00</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {ProductsList(0, 50)}
      </div>

      <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$100,00</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {ProductsList(50, 100)}
      </div>

      <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$200,00</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {ProductsList(100, 200)}
      </div>

      <h1 className="font-bold text-2xl mt-20">Produtos diversos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {ProductsList(10, 1000)}
      </div>
    </div>
  );
}
