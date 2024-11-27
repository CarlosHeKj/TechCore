'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'; // Para capturar parâmetros da URL
import Product from "../components/Product";

async function getProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data;
}

export default function Catalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const searchParams = useSearchParams(); // Pegando parâmetros da URL
  const searchTerm = searchParams?.get("search") || ''; // Pegando o parâmetro 'search'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchData();
  }, []);

  // Função que filtra os produtos com base no termo de busca
  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.includes("Todos") ||
        selectedFilters.some((filter) =>
          product.description.toLowerCase().includes(filter.toLowerCase())
        );

      return matchesSearch && matchesFilters;
    });

    setFilteredProducts(filtered);
  };

  // Função chamada ao alterar os checkboxes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedFilters((prevFilters) => {
      const updatedFilters = checked
        ? [...prevFilters, value]
        : prevFilters.filter((filter) => filter !== value);

      // Reaplica os filtros sempre que os filtros de checkbox são alterados
      applyFilters();
      return updatedFilters;
    });
  };

  // Aplica o filtro de pesquisa sempre que o parâmetro 'search' mudar
  useEffect(() => {
    // Reaplica os filtros sempre que o searchTerm mudar
    applyFilters();
  }, [searchTerm, selectedFilters, products]);

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 bg-gray-900/20">
      <h1 className="font-bold text-2xl mt-20">Produtos</h1>

      <form className="max-w-7xl mb-8 gap-2">
        <div className="flex gap-4">
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="Todos"
              onChange={handleCheckboxChange}
              checked={selectedFilters.includes("Todos")}
            />
            Todos
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="cpu"
              onChange={handleCheckboxChange}
              checked={selectedFilters.includes("cpu")}
            />
            CPU
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="memória ram"
              onChange={handleCheckboxChange}
              checked={selectedFilters.includes("memória ram")}
            />
            Memória RAM
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa de vídeo"
              onChange={handleCheckboxChange}
              checked={selectedFilters.includes("placa de vídeo")}
            />
            Placa de Vídeo
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa mãe"
              onChange={handleCheckboxChange}
              checked={selectedFilters.includes("placa mãe")}
            />
            Placa Mãe
          </label>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
    </div>
  );
}
