'use client'
import { useCartStore } from "@/store"
import { ProductType } from "@/types/ProductType"
import { FiShoppingCart } from "react-icons/fi";

export default function AddCart({product}: {product:ProductType}) {
    
   const {addProduct} = useCartStore(); 
    return (   
<button
      onClick={()=> addProduct(product)}
      className="bg-gray-600 rounded-full text-green-600 p-3.5">
      <FiShoppingCart className="text-xl " />
      </button>
     )}