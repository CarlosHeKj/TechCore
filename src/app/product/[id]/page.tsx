import AddCart from "@/app/components/AddCart";
import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/libs/utils";
import Stripe from "stripe";

type ProductPageProps = {
    params: {
        id: string;
     };
};

async function getProduct(id:string)
{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-10-28.acacia",
      });
      const produto = await stripe.products.retrieve(id);
      const price = await stripe.prices.list({
        product: produto.id,
      });
      
      return {
        id: produto.id,
        price: price.data[0]?.unit_amount || 0,
        name: produto.name,
        description: produto.description || "",
        image: produto.images[0] || "",
        category: produto.metadata.category || "general",
        currency: price.data[0]?.currency || "usd",
      };
}
export default  async function ProductPage({params: {id} }: ProductPageProps) {
    const product = await getProduct(id);

return <div className="flex flex-col md:flex-row items-center  max-w-[400px] h-full
md:max-w-5xl mx-auto gap-8 p-10 mt-20 justify-between bg-gray-900/20">
    <ProductImage product={product}  />
    <div className="flex flex-col ">
        <div className="pb-4"><h1 className="text2xl font-bold text-white mb-20">{product.name}</h1>
        </div>
        <div className="mt-2 flex justify-between">
        <h2 className="text-xl text-teal-600 font-bold">{formatPrice(product.price)}</h2>
        <AddCart product={product} />
        </div>
       

    </div>
</div>

}