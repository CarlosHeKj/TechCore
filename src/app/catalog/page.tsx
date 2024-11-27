'use client'
import { useState, useEffect } from "react";
import Product from "../components/Product";


async function getProducts() {
  const res = await fetch("/api/products"); 
  const data = await res.json();
  return data;
}

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);


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


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
     
      setSelectedFilters((prevFilters) => [...prevFilters, value]);
    } else {
   
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };


  const handleFilterClick = (event: React.FormEvent) => {
    event.preventDefault();

 
    if (selectedFilters.includes("Todos")) {
      setFilteredProducts(products);
    } else if (selectedFilters.length === 0) {
     
      setFilteredProducts(products);
    } else {
     
      const filtered = products.filter((product) =>
        selectedFilters.some((filter) =>
          product.description.toLowerCase().includes(filter.toLowerCase())
        )
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 bg-gray-900/20">
      <h1 className="font-bold text-2xl mt-20">Produtos</h1>

      <form className="max-w-7xl mb-8 gap-2" onSubmit={handleFilterClick}>
        <div className="flex gap-4">
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="Todos"
              onChange={handleCheckboxChange}
            />
            Todos
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="cpu"
              onChange={handleCheckboxChange}
            />
            CPU
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="memória ram"
              onChange={handleCheckboxChange}
            />
            Memória RAM
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa de vídeo"
              onChange={handleCheckboxChange}
            />
            Placa de Vídeo
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa mãe"
              onChange={handleCheckboxChange}
            />
            Placa Mãe
          </label>
        </div>
        <button type="submit" className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
          Filtrar
        </button>
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