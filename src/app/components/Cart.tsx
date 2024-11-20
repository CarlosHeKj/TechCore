'use client'
import { useCartStore } from "@/store"
import { FiShoppingCart } from "react-icons/fi";
export default function Cart()
{
    const useStore = useCartStore();
    

    return(
        <>
         <div 
         onClick={() => useStore.toggleCart()}
         className="flex items-center cursor-pointer relative">
             <FiShoppingCart className="text-2xl" />
             <span className="bg-purple-400 text-sm font-bold rounded-full h-5 w-5  flex items-center justify-center absolute bottom-3.5 left-3.5">2</span>
            </div>
            {
                useStore.isOpen &&(
<div onClick={() => useStore.toggleCart()} 
className="fixed w-full h-screen bg-black/25 left-0 top-0 z-55">
<div 
onClick={(e) => e.stopPropagation()}
className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-12 overflow-y-auto"><h1>Meu carrinho</h1>
{useStore.cart.map((item)=>(
    <div key={item.id}>{item.name}</div>
))}
</div>
                
            </div>
                )
            }
            
        </>
       
    )
}