import { createContext, useState } from 'react';

export const billContext = createContext();


export const BillProvider = ({ children }) => {

    const [billData, setBillData] = useState([]);
    
 
    return (
        <billContext.Provider value={{ billData, setBillData }}>
            {children}
        </billContext.Provider>
    )
}



