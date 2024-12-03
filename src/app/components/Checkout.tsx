'use client'
import { useCartStore } from "@/store";

export default function Checkout()
{
    const cartStore = useCartStore();


    return(
        <div>
            <h1 className="text-purple-400 font-bold">Pedido completo, já pode encher o carrinho novamente...</h1>
            <button onClick={() => cartStore.setCheckout('cart')} className="w-full rounded-md bg-purple-400 text-white py-2 mt-2">Voltar a comprar</button>
        </div>
    )
}