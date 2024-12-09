"use client"; // Adicione isso no topo do arquivo

import React, { useEffect, useState } from "react";
import AddCart from "@/app/components/AddCart";
import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/libs/utils";
import { ProductType } from "src/types/ProductType";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Função para buscar um único produto da API
async function getProduct(id: string) {
  const baseUrl =  process.env.NEXT_PUBLIC_BASE_URL  || "http://localhost:3000";
  const res = await fetch(`/api/products`);
  const products = await res.json();
  

  const product = products.find((p: ProductType) => p.id === id);
  console.log("ID do produt0: " , product.id);
  if (!product) {
    throw new Error("Produto não encontrado");
  }
  return product;
}

// Função de página que usa 'params'
export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null); // Estado para armazenar o produto
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Usando React.use() para "desembrulhar" a Promise
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id); // Agora podemos acessar 'id' diretamente
    };
    
    fetchParams();
  }, [params]); // Reexecuta quando 'params' mudar

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        console.log(product)
        setProduct(fetchedProduct);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Define o estado de carregamento como falso após a requisição
      }
    };

    fetchProduct();
  }, [id]); // Reexecuta quando 'id' mudar
  
  if (loading) {
    return <div>Carregando...</div>; // Mostra uma mensagem de carregamento enquanto busca o produto
  }

  if (!product) {
    return <div>Produto não encontrado</div>;
  }
  
  return (
    <div className="flex flex-col md:flex-row items-center w-full h-auto md:max-w-5xl mx-auto gap-8 p-10 mt-20 justify-between bg-gray-900/20">
      <ProductImage product={product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-white mb-2 md:mb-16">{product.name}</h1>
          <h2 className="text-sm md:text-2xl font-bold text-gray-400 mb-20">{product.description}</h2>
        </div>
        <div className="mt-2 flex justify-between">
          <h2 className="text-10px md:text-xl text-purple-400 font-bold">{formatPrice(product.price)}</h2>
          
          <AddCart product={product} />
        </div>
      </div>
    </div>
  );
}
