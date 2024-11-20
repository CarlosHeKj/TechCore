
import { ProductType } from "../types/ProductType";
import Product from "./components/Product";
async function getProducts()
{
  const res = await fetch('https://fakestoreapi.com/products')

  if(!res.ok){
    throw new Error('Failed to fetch products')
  }

  return res.json()

}

const products20 = await getProducts();
export default async function Home() {

  const products = await getProducts();
  

  function ProductsList(min: number,max: number) {
    const productElements = [];
        for (let i = 0; i < products.length; i++) {
          if(products[i].price > min && products[i].price < max) {
          productElements.push(
            <Product key={products[i].id} product={products[i]} />
          );}
        }
        return productElements;
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">

      
      <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$50,00</h1>      
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

      {ProductsList(0,50)}
      </div>
      <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$100,00</h1>      
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

      {
    ProductsList(30,100)
  }
      </div>
      <h1 className="font-bold text-2xl mt-20">Produtos abaixo de R$200,00</h1>      
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

      {ProductsList(100,200)}
      </div>
      <h1 className="font-bold text-2xl mt-20">Produtos diversos </h1>      
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">

      {ProductsList(100,1000)}
      </div>
      
      </div>
  );
}
