'use client'

import { ReactNode, useState, useEffect } from "react";

export default function Hydrate({children}:{children: ReactNode}){
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return isMounted ? <>{children}</> : <span>Carregando...</span>
}
