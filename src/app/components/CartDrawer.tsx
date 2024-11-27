'use client'
import { formatPrice } from "@/libs/utils";
import { useCartStore } from "@/store"
import Image from "next/image";
import CheckoutButton from "./CheckoutButtom";
export default function CartDrawer() 
{
    const useStore = useCartStore();
    const totalPrice = useStore.cart.reduce((acc,item)=> {
        return acc + item.price * item.quantity!;

    },0);
    return (
            <div onClick={() => useStore.toggleCart()} 
            className="fixed w-full h-screen bg-black/25 left-0 top-0 z-[9999]">
            <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bg-slate-600 right-0 top-0 w-1/4 h-screen p-8 overflow-y-auto">

                <button onClick={() => useStore.toggleCart()} className="font-bold text-md text-purple-400">Voltar para loja</button>
                <div className="border-t border-gray-400 my-4">

                </div>

            {useStore.cart.map((item)=>(
                <div key={item.id} className="flex gap-4 py-4" >
                    <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-md object-cover w-24">
                        
                        </Image>
                        <div><h2 className="w-24 truncate md:w-80">{item.name}</h2>
                        <h2>Qtd: {item.quantity}</h2>
                        <p className="text-purple-400 font-bold text-md">{formatPrice(item.price)}</p>
                        <button className="py-1 px-2 border rounded-md mt-2 text-sm  mr-1" onClick={() => useStore.addProduct(item)}>Adicionar</button>
                        <button className="py-1 px-2 border rounded-md mt-2 text-sm  mr-1" onClick={() => useStore.removeProduct(item)}>Remover</button></div>
                        </div>
            ))}

            {useStore.cart.length > 0 && useStore.onCheckout === 'cart' &&(
               <CheckoutButton totalPrice={totalPrice} />
            )}
            </div>
                            
                        </div>
                            
    )
}