import { ProductType } from "../../types/ProductType"
import ProductImage from "./ProductImage";
import { FiShoppingCart } from "react-icons/fi";
import { formatPrice } from "@/libs/utils";
type ProductProps = {
    product: ProductType
}

export default function Product({product}: ProductProps) {
    
    return (
<div className="flex flex-row md:flex-col h-auto md:h-92 shadow-lg bg-white rounded-md relative">

  <div className="relative h-32 w-24 md:w-full md:h-64 mt-20 md:mt-1">
    <ProductImage product={product} fill />
  </div>

  <div className="flex flex-col justify-between flex-1 overflow-hidden md:overflow-visible">
   
    <div className="flex justify-between font-bold my-3 text-black p-5 md:p-0 text-start ml-1">
      {product.name}
    </div>
    
    <div className="flex p-5 justify-between items-center">
      <div className="text-green-600 font-bold">
        <p> {formatPrice(product.price)}</p>
      </div>
      <button className="bg-gray-600 rounded-full text-green-600 p-3.5">
      <FiShoppingCart className="text-xl " />
      </button>
    </div>
  </div>
</div>

    )
}