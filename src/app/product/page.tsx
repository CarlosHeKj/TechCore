
import Product from "../components/Product";
import { getProducts } from "../page";


export default async function Page() {
  const products = await getProducts();
  
  // Array para as palavras-chave de filtro
  const names: string[] = []; // Certifique-se de que seja um array de strings

  // Função para filtrar produtos com base nas palavras-chave
  function ProductsList(keywords: string[]) {
    return products
      .filter(product => 
        // Se não houver palavras-chave, exibe todos os produtos
        keywords.length === 0 ||
        keywords.some(keyword =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      )
      .map(product => (
        <Product key={product.id} product={product} />
      ));
  }

  return (
    <>    
      <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 bg-gray-900/20">
      <form className="max-w-7xl mb-8 gap-2 ">
      <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="Todos"
            /> Todos
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="cpu"
            /> CPU
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="memória ram"
            /> Memória RAM
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa de vídeo"
            /> Placa de Vídeo
          </label>
          <label className="pr-4 font-bold text-lg">
            <input
              type="checkbox"
              value="placa mãe"
            /> Placa Mãe
          </label>
            <button type="submit">Filtrar</button>
        </form>
        <h1 className="font-bold text-2xl mt-20">Produtos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          {ProductsList(names)} 
        </div>
      </div>
    </>
  );
}
