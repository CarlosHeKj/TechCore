import { ProductType } from "src/types/ProductType";// Certifique-se de que o caminho está correto
import Product from "./components/Product";
import Image from "next/image";
import banner from "@/app/assets/banner.png";
import Link from "next/link";
import { getProducts } from "@/libs/stripeUtils";

// Componente principal
export default async function Home() {
  console.log("Iniciando requisição...");
  let products: ProductType[] = [];  // Tipando explicitamente como ProductType[]
  
  try {
    products = await getProducts();  // A função getProducts agora retorna ProductType[]
  } catch (error) {
    console.error('Falha ao carregar produtos:', error);
  }

  function ProductsList(min: number, max: number) {
    const productElements = [];
    for (let i = 0; i < products.length; i++) {
      const productPrice = products[i].price / 100; // Convertendo de centavos para reais
      if (productPrice > min && productPrice <= max) {
        productElements.push(<Product key={products[i].id} product={products[i]} />);
      }
    }
    return productElements;
  }

  return (
    <div>
      <Link href={`/catalog`}>
        <Image 
          src={banner}
          alt="banner promoção"
          layout="responsive"
          width={1920}
          height={600}
          className="mt-8 w-full h-auto cursor-pointer"
        />
      </Link>

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

        <div className="flex justify-between">
          <h1 className="font-bold text-2xl mt-20">Produtos diversos</h1>
          <Link href={`/catalog`}>
            <h1 className="font-bold text-2xl mt-20 cursor-pointer">Ver mais</h1>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          {ProductsList(10, 1000)}
        </div>
      </div>
    </div>
  );
}
