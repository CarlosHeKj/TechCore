
import Link from "next/link";

function Navbar ()  {
    return (
        
           <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-gray-700 text-gray-300">
          <Link href="/" className="uppercase font-bold text-md h-12 flex items-center"> TechCore
          </Link>
          <input type="search" name="search" id="search"  className="w-1/2 text-black p-1"/>
         
        </nav>
        
    );
}

export default Navbar;