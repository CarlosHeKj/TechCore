import { ProductType } from "../../../type/ProductType"

type ProductProps = {
    product: ProductType
}

export default function Product({product}: ProductProps) {
    
    return (
        <div className="flex flex-col shadow-lg h-96 bg-white rounded-md">
                <div className="relative max-h-72 flex-1">IMG </div>
                <div className="flex justify-between font-bold my-3 text-black p-5">{product.title} </div>
                <div className="flex p-5 justify-between"><div className="text-green-600 font-bold flex justify-center items-center"> <p>R$ {product.price}</p> </div><button className=" bg-gray-600 rounded-full text-green-600 p-3.5 w-auto ">Add</button></div>
        </div>
    )
}