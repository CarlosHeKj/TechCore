import { ProductType } from "../../types/ProductType"
import ProductImage from "./ProductImage";
import AddCart from "./AddCart";
import { formatPrice } from "@/libs/utils";
import Link from "next/link";
type ProductProps = {
    product: ProductType
}



export default function Product({product}: ProductProps) {
    
    return (
     
<div className="flex flex-row md:flex-col h-auto shadow-lg bg-white rounded-md relative md:h-[400px] ">
<Link href={`/product/${product.id}`}>
  <div className="relative h-32 w-24 md:w-full md:h-64 mt-20 md:mt-1 object-cover md:flex md:justify-center">
    <ProductImage product={product}  />
  </div>
  </Link>

  <div className="flex flex-col justify-between flex-1 overflow-hidden md:overflow-visible">
  <Link href={`/product/${product.id}`}>
    <div className="flex justify-between font-bold my-3 text-black p-5 md:p-0 text-start ml-1 line-clamp-2 hover:text-purple-500 z-20">
      {product.name}
    </div>
    </Link>
    
    <div   className="flex p-5 justify-between items-center relative">
    <Link href={`/product/${product.id}`}><div className="text-green-600 font-bold">
        <p> {formatPrice(product.price)}</p>
      </div></Link>
      <AddCart product={product}/>
    </div>
  </div>
</div>


    );
}