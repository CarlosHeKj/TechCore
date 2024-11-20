'use client'
import Link from "next/link";
import Image from "next/image";
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "./search";
import logo from "@/app/assets/logotech.png";
import Cart from "./Cart";

function Navbar ()  {
    //const useStore = useCartStore();
    
    return (
        
           <nav className="fixed top-0 w-full flex items-center py-2 px-2 justify-between gap-2 z-50 bg-gray-900 text-gray-300">
          <Link href="/" className="uppercase font-bold text-md h-12 flex items-center mr-2">
          <Image 
          src={logo} // Importação direta da imagem
          alt="Logo TechCore" 
          width={50} // Ajuste a largura conforme necessário
          height={50} // Ajuste a altura conforme necessário
          className="mr-2 rounded-full md:block hidden" // Espaço entre a imagem e o texto
        /> TechCore
          </Link>
          
         <SearchBar></SearchBar>
         <div className="flex items-center gap-8 md:gap-14">
            <Cart></Cart>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                <button className="border  rounded-md border-gray-400 px-3 py-2">
                <strong>Entrar</strong> ou <strong>Cadastrar</strong>
                </button>
                </SignInButton>
              
                
            </SignedOut>
         </div>
        </nav>
        
    );
}

export default Navbar;