'use client'
import Link from "next/link";
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "./search";

function Navbar ()  {
    return (
        
           <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between gap-3 z-50 bg-gray-900 text-gray-300">
          <Link href="/" className="uppercase font-bold text-md h-12 flex items-center"> TechCore
          </Link>
          
         <SearchBar></SearchBar>
         <div className="flex items-center gap-8">
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