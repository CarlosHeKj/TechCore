'use server'
import { ProductType } from "@/types/ProductType";
import {stripe} from "@/libs/stripe";
  export  async function fetchProducts({lastProductId}:{lastProductId?:string | undefined}){
    
    const params = lastProductId ? { starting_after: lastProductId, limit: 12} : {};

    const {data: products,has_more} = await stripe.products.list();

    const formattedProducts = await Promise.all(
      products.map(async (product) => {
        const price = await stripe.prices.list({
          product: product.id,
          active: true,
        });
        return {
          id: product.id,
          price: price.data[0]?.unit_amount || 0,
          name: product.name,
          description: product.description || "",
          image: product.images[0] || "",
          category: product.metadata.category || "general",
          currency: price.data[0]?.currency || "usd",
        };
      })
    );
    return {formattedProducts,has_more};
  
}