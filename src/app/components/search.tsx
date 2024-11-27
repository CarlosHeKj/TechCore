'use client';

import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Ícone de busca

type SearchBarProps = {
  onSearch: (searchTerm: string) => void; // Função recebida como prop
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  // Função chamada ao submeter o formulário
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    onSearch(searchTerm); // Passa o termo de pesquisa para a função onSearch da Navbar
  };

  return (
    <form
      onSubmit={handleSearch} // Submete o formulário chamando handleSearch
      className="flex justify-between bg-white rounded-lg shadow-md p-2 md:w-1/3 h-auto"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o valor digitado
        placeholder="Pesquise o seu produto"
        id="search"
        className="rounded-sm w-full border-none text-black p-2 text-sm focus:outline-none"
      />
      <button
        type="submit" // Envia o formulário ao clicar no botão
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        <FiSearch className="text-md font-bold" />
      </button>
    </form>
  );
}

export default SearchBar;
