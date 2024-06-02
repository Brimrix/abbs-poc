import {
  createContext, useReducer,
} from 'react';
import ImageSelector from '@/components/ImageSelector';
import PriceComponent from '@/components/PriceComponent';
import QuantityComponent from '@/components/QuantityComponent';
import DeleteIcon from '@/components/RemoveComponent';

export const billContext = createContext();

export function BillProvider({ children }) {
  const initialState = {
    billData: [
      {
        key: 0,
        image_name: '\u200b',
        upload: <ImageSelector _id={0} reRender={false} />,
        height: 0,
        width: 0,
        area: 0,
        actualPrice: 0,
        actualQuantity: 0,
        actions: <DeleteIcon _id={0} />,
        price: <PriceComponent _id={0} defaultInputValue={0} reRender={false} />,
        quantity: <QuantityComponent _id={0} defaultInputValue={1} reRender={false} />,
        amount: 0,
        order: 1,
        image_src: '',
      },
    ],

    clientDetails: {
      clientName: '',
      billDate: '',
    },
    shouldReRender: false,
  };

  const reducerMethod = (state, action) => {
    const newState = { ...state }; // Create a new state variable

    switch (action.type) {
      case 'PRICE_CHANGE':
        newState.billData = state.billData.map((item) => (item.key === action.payload._key
          ? { ...item, actualPrice: action.payload.actualPrice, amount: action.payload.AMOUNT }
          : item));
        break;

      case 'QUANTITY_CHANGE':
        newState.billData = state.billData.map((item) => (item.key === action.payload._key
          ? { ...item, actualQuantity: action.payload.actualQuantity, amount: action.payload.AMOUNT }
          : item));
        break;

      case 'ADD_ROW':
        const newItem = {
          key: state.billData.length,
          image_name: '\u200b',
          height: 0,
          width: 0,
          area: 0,
          actualPrice: 0,
          actualQuantity: 0,
          upload: <ImageSelector _id={state.billData.length} reRender={false} />,
          price: <PriceComponent _id={state.billData.length} defaultInputValue={0} reRender={false} />,
          quantity: <QuantityComponent _id={state.billData.length} defaultInputValue={1} reRender={false} />,
          amount: 0,
          order: state.billData.length + 1,
          actions: <DeleteIcon _id={state.billData.length} />,
          image_src: '',
        };
        newState.billData = [...state.billData, newItem];
        break;

      case 'SET_DIMENSION':
        newState.billData = state.billData.map((item) => (item.key === action.payload._key
          ? {
            ...item,
            height: action.payload.HEIGHT,
            image_name: action.payload.name,
            width: action.payload.WIDTH,
            area: action.payload.area,
            image_src: action.payload.IMAGE_SOURCE,
            amount: action.payload.AMOUNT,
          }
          : item));
        break;

      case 'REMOVE_ROW':
        const filteredData = state.billData.filter((item) => item.key !== action.payload._key);
        const newShouldReRender = !state.shouldReRender;
        newState.shouldReRender = newShouldReRender;
        newState.billData = filteredData.map((item, index) => ({
          ...item,
          upload: <ImageSelector _id={Number(index)} reRender={newShouldReRender} renderSource={filteredData[index].image_src} />,
          price: <PriceComponent _id={Number(index)} defaultInputValue={filteredData[index].actualPrice} reRender={newShouldReRender} />,
          quantity: <QuantityComponent _id={Number(index)} defaultInputValue={filteredData[index].actualQuantity} reRender={newShouldReRender} />,
          actions: <DeleteIcon _id={Number(index)} />,
          key: index,
          order: index + 1,
        }));
        break;

      case 'SET_CLIENT_DETAILS':
        newState.clientDetails = {
          clientName: action.payload.name,
          billDate: action.payload.date,
        };
        break;

      case 'UPDATE_ROW':
        debugger;
        newState.billData = state.billData.map((item) => {
          if (item.key === action.payload.key) {
            if (action.payload.cellSource.dataIndex === "height") {
              return {
                ...item,
                height: action.payload.row.height ? Number(action.payload.row.height) : 0,
                area: Math.round((item.width * Number(action.payload.row.height) / 144) * 100) / 100
              };
            } else if (action.payload.cellSource.dataIndex === "width") {
              return {
                ...item,
                width: action.payload.row.width ? Number(action.payload.row.width) : 0,
                area: Math.round((item.height * Number(action.payload.row.width) / 144) * 100) / 100
              };
            } else if (action.payload.cellSource.dataIndex === "image_name") {
              return {
                ...item,
                image_name: action.payload.row.image_name ? action.payload.row.image_name : '\u200b'
              };
            }
          }
          return item;
        });
        break;

      default:
        break;
    }

    return newState;
  };


  // UseReducer setup
  const [state, dispatch] = useReducer(reducerMethod, initialState);

  return (
    <billContext.Provider value={{ state, dispatch }}>
      {children}
    </billContext.Provider>
  );
}
