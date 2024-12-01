import AddCart from "@/app/components/AddCart";
import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/libs/utils";

// Função para buscar um único produto da API
async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`);
  const products = await res.json();

  const product = products.find((p: any) => p.id === id);
  if (!product) {
    throw new Error("Produto não encontrado");
  }
  return product;
}

// Função de página que usa 'params'
export default async function ProductPage(props: any) {
  const { id } = props.params as { id: string };
  const product = await getProduct(id);

  return (
    <div className="flex flex-col md:flex-row items-center max-w-[400px] h-auto md:max-w-5xl mx-auto gap-8 p-10 mt-20 justify-between bg-gray-900/20">
      <ProductImage product={product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-white mb-16">{product.name}</h1>
          <h2 className="text-2xl font-bold text-gray-400 mb-20">
            {product.description}
          </h2>
        </div>
        <div className="mt-2 flex justify-between">
          <h2 className="text-xl text-purple-400 font-bold">
            {formatPrice(product.price)}
          </h2>
          <AddCart product={product} />
        </div>
      </div>
    </div>
  );
}
