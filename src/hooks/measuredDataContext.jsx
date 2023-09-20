import { createContext, useContext, useEffect, useState } from "react";

//Declaracion de contexto
const measuredDataContext= createContext()
export function MeasuredDataProvider({children}){    
    const [bpmData,setBpmData]=useState(null);
    return (
        <measuredDataContext.Provider value={
            {
            bpmData,
            }}>
                {children}
        </measuredDataContext.Provider>
    );
}

//Hook personalizado
export const useMeasuredData = () => useContext(measuredDataContext);