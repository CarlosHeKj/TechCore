'use client'
import { useCartStore } from "@/store"
import { FiShoppingCart } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
export default function Cart()
{
    const useStore = useCartStore();
    

    return(
        <>
         <div 
         onClick={() => useStore.toggleCart()}
         className="flex items-center cursor-pointer relative">
             <FiShoppingCart className="text-2xl" />
             <span className="bg-purple-400 text-sm font-bold rounded-full h-5 w-5  flex items-center justify-center absolute bottom-3.5 left-3.5">{useStore.cart.length}</span>
            </div>
            {!useStore.isOpen &&
                <CartDrawer/>
            }
            
        </>
       
    )
}