import { createContext, useState, useReducer } from 'react';
import ImageSelector from '@/components/ImageSelector';
import PriceComponent from '@/components/PriceComponent';
import QuantityComponent from '@/components/QuantityComponent'
import { InputNumber } from 'antd';
import DeleteIcon from '@/components/RemoveComponent';
import { act } from 'react';



export const billContext = createContext();


export const BillProvider = ({ children }) => {


    const initialState = {
        billData: [
          {
            key: 0,
            image_name: "",
            upload: <ImageSelector _id={0} />,
            height: 0,
            width: 0,
            area: 0,
            actualPrice: 0,
            actualQuantity: 0,
            actions: <DeleteIcon _id={0} />,
            price: <PriceComponent _id={0} defaultInputValue={0} reRender={false} />,
            quantity: <QuantityComponent _id={0} defaultInputValue={0} reRender={false} />,
            amount: 0,
            order: 1,
            image_src: '',
          },
        ],
      };
      
      const reducerMethod = (state, action) => {
        switch (action.type) {
          case "PRICE_CHANGE":
            return {
              ...state,
              billData: state.billData.map(item => 
                item.key === action.payload._key
                  ? { ...item, actualPrice: action.payload.actualPrice, amount: action.payload.AMOUNT }
                  : item
              ),
            };
      
          case "QUANTITY_CHANGE":
            return {
              ...state,
              billData: state.billData.map(item => 
                item.key === action.payload._key
                  ? { ...item, actualQuantity: action.payload.actualQuantity, amount: action.payload.AMOUNT }
                  : item
              ),
            };
      
          case "ADD_ROW":
            const newItem = {
              key: state.billData.length,
              image_name: "",
              height: 0,
              width: 0,
              area: 0,
              actualPrice: 0,
              actualQuantity: 0,
              upload: <ImageSelector _id={state.billData.length}  />,
              price: <PriceComponent _id={state.billData.length} defaultInputValue={0} reRender={false}/>,
              quantity: <QuantityComponent _id={state.billData.length} defaultInputValue={0} reRender={false} />,
              amount: 0,
              order: state.billData.length + 1,
              actions: <DeleteIcon _id={state.billData.length} />,
              image_src: '',
            };
            return {
              ...state,
              billData: [...state.billData, newItem],
            };
      
          case "SET_DIMENSION":
            return {
              ...state,
              billData: state.billData.map(item => 
                item.key === action.payload._key
                  ? {
                      ...item,
                      height: action.payload.HEIGHT,
                      image_name: action.payload.name,
                      width: action.payload.WIDTH,
                      area: action.payload.area,
                      image_src: action.payload.IMAGE_SOURCE,
                      amount: action.payload.AMOUNT,
                    }
                  : item
              ),
            };
      
          case "REMOVE_ROW":
            let filteredData = state.billData.filter(item => item.key !== action.payload._key);
            
            return {
              ...state,
              billData: filteredData.map((item, index) => 
                
                                  
                index === action.payload._key
                  ? {
                      ...item,
                      upload: <ImageSelector _id={Number(index)} />,
                      price: <PriceComponent _id={Number(index)} defaultInputValue={item.actualPrice} reRender={true} />,
                      quantity: <QuantityComponent _id={Number(index)} defaultInputValue={item.actualQuantity} reRender={true}  />,
                      actions: <DeleteIcon _id={Number(index)} />,
                      key: index,
                      order: index + 1,
                                     
                    }
                  : {
                    ...item,
                    key: index,
                    order: index + 1,
                  }
              ),
            };
           
            
            debugger;

           
          
        }
      };
      
      // UseReducer setup
      const [state, dispatch] = useReducer(reducerMethod, initialState);
      

    
 
    return (
        <billContext.Provider value={{ state, dispatch }}>
            {children}
        </billContext.Provider>
    )


}



