import { NextResponse } from "next/server";
import { getProducts } from "@/libs/stripeUtils";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { message: "Erro ao carregar os produtos" },
      { status: 500 }
    );
  }
}
