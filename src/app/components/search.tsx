'use client';

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void; 
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    onSearch(searchTerm); 
  };

  return (
    <form
      onSubmit={handleSearch} 
      className="flex justify-between bg-white rounded-lg shadow-md p-2 md:w-1/3 h-auto"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Pesquise o seu produto"
        id="search"
        className="rounded-sm w-full border-none text-black p-2 text-sm focus:outline-none"
      />
      <button
        type="submit" 
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        <FiSearch className="text-md font-bold" />
      </button>
    </form>
  );
}

export default SearchBar;
