'use client';
import React, { createContext, useState} from "react";
import Thems from '@/app/contaxt/Thems/Thems.json'

type contaxtAPi={
    children:React.ReactNode
}
type TypeThemscontaxt ={
    Themscolorname:string;
    setThemscolorname:(Themscolorname:string)=>void;
}


export const Themscontext = createContext(Thems)
export const ThemsColor =({children}:contaxtAPi)=>{
    return <Themscontext.Provider value={Thems}>{children}</Themscontext.Provider>
}

export const ThemscontextModel = createContext<TypeThemscontaxt|null>(null)
export const ThemsColorModel =({children}:contaxtAPi)=>{
    const [Themscolorname,setThemscolorname]=useState('noon')
    return <ThemscontextModel.Provider value={{Themscolorname,setThemscolorname}}>{children}</ThemscontextModel.Provider>
}
