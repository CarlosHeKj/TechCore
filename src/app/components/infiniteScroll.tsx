'use client'

import { ProductType } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Product from "./Product";
import { fetchProducts } from "../actions";

interface InfiniteScrollProps {
  min: number;
  max: number;
  initialProducts: ProductType[];
}

function InfiniteScroll({ min, max, initialProducts }: InfiniteScrollProps) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Filtrando os produtos que atendem à faixa de preço
  const productElements = products
    .filter((product) => {
      const productPrice = product.price / 100; // Preço em reais
      return productPrice > min && productPrice <= max;
    })
    .map((product) => <Product key={product.id} product={product} />);

  // ID do último produto para a paginação
  const lastProductId = products[products.length - 1]?.id;

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return; // Previne múltiplas chamadas simultâneas

    setIsLoading(true);
    const { formattedProducts, has_more } = await fetchProducts({ lastProductId });
    if (formattedProducts) {
      setProducts((prevProducts) => [...prevProducts, ...formattedProducts]);
      setHasMore(has_more);
    }
    setIsLoading(false);
  }, [lastProductId, isLoading, hasMore]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [inView, hasMore, isLoading, loadMoreProducts]);

  if (products.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div ref={ref}>
        {productElements}
        {isLoading && <p>Carregando...</p>}
        {!hasMore && <p>Não há mais produtos.</p>}
      </div>

      {hasMore && !isLoading && (
        <div ref={ref}>
          Carregando mais registros...
        </div>
      )}
    </>
  );
}

export default InfiniteScroll;
