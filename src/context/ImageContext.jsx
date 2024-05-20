import { createContext, useEffect, useState } from 'react';

export const imageContext = createContext();


export const ImageProvider = ({ children }) => {

    const [imageData, setImageData] = useState([{
        imageSrc: '',
        rowIndex: 0,
    }]);
    
       
    return (
        <imageContext.Provider value={{ imageData, setImageData }}>
            {children}
        </imageContext.Provider>
    )

    
}