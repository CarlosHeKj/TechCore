
import clsx from "clsx"
export default function SkeletonCart(isLoading: {isLoading?: boolean}) {

    return(
        <div className={clsx('flex flex-row md:flex-col h-auto md:h-92 shadow-lg bg-white rounded-md relative',
            {
                'relative overflow-hidden before:absolute before:inset-0 before:translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent': isLoading,
            }
        )}>
            <div className="flex flex-row md:flex-col h-auto md:h-92 shadow-lg bg-white rounded-md relative">

<div className="relative h-32 w-24 md:w-full md:h-64 mt-20 md:mt-1">
  
</div>

<div className="flex flex-col justify-between flex-1 overflow-hidden md:overflow-visible">
 
  <div className="flex justify-between font-bold my-3 text-black p-5 md:p-0 text-start ml-1">
   
  </div>
  
  <div className="flex p-5 justify-between items-center">
    <div className="text-green-600 font-bold">
      
    </div>
    
  </div>
</div>
</div>
</div>
    )
}