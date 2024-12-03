'use client'
import { useCartStore } from "@/store";

export default function Checkout()
{
    const cartStore = useCartStore();


    return(
        <div>
            <h1>Pedido completo, já pode encher o carrinho novamente...</h1>
            <button onClick={() => cartStore.setCheckout('cart')}>Voltar a comprar</button>
        </div>
    )
}