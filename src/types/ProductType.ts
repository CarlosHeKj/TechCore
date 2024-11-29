export type ProductType = {
    id: string;
    price: number;
    name: string;
    quantity?: number | 1;
    image: string;
    category:string;
    description: string;
    currency?: string;
}
   