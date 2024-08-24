
import React, { createContext, useState} from "react";

type contaxtAPi={
    children:React.ReactNode
}
type TypeThemscontaxt ={
    Themscolorname:string;
    setThemscolorname:React.Dispatch<React.SetStateAction<string>>
}

export const ThemscontextModel = createContext<TypeThemscontaxt|null>(null)

export const ThemsColorModel =({children}:contaxtAPi)=>{
    const [Themscolorname,setThemscolorname]=useState('noon')
    return <ThemscontextModel.Provider value={{Themscolorname,setThemscolorname}}>{children}</ThemscontextModel.Provider>
}
