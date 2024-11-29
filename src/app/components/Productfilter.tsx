'use client'
import Product from "./Product";
import { getProducts } from "../page";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia", 
  });
export default async function Productfiltered() {
  const products = await getProducts();
  const searchParams = useSearchParams();

  // Obtém o valor do parâmetro "search"
  const searchTerm = searchParams.get("search") || "";

  // Estado para os filtros do formulário
  const [filters, setFilters] = useState<string[]>([]);

  // Filtra os produtos com base no termo de busca e nos filtros
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      filters.length === 0 ||
      filters.some((filter) => product.name.toLowerCase().includes(filter.toLowerCase()));

    return matchesSearch && matchesFilters;
  });

  // Manipula as alterações nos filtros
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setFilters((prevFilters) => {
      if (checked) {
        return value === "Todos" ? [] : [...prevFilters, value];
      } else {
        return prevFilters.filter((filter) => filter !== value);
      }
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 bg-gray-900/20">
        <form className="max-w-7xl mb-8 gap-2">
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="Todos"
              onChange={handleFilterChange}
            />
            Todos
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="cpu"
              onChange={handleFilterChange}
            />
            CPU
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="memória ram"
              onChange={handleFilterChange}
            />
            Memória RAM
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa de vídeo"
              onChange={handleFilterChange}
            />
            Placa de Vídeo
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa mãe"
              onChange={handleFilterChange}
            />
            Placa Mãe
          </label>
        </form>

        <h1 className="font-bold text-2xl mt-20">Produtos</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
