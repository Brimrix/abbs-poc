import { createContext, useContext, useReducer } from "react";
import { useFetch } from '@/hooks/useFetch';
import { message } from "antd";

const billContext = createContext();

export function BillProvider({ children }) {
  const initialState = {
    invoices: [],
    selectedInvoice: {
      items: [],
      orders: [],
      company: {
        id: -1,
        name: '',
        defaultRate: 0
      },
      discount: 0,
    },
  };

  function calculateArea(width, height, unit = 144) {
    return Number((width * height) / unit)
  }

  function calculateRowAmount(row) {
    return Number((row.area * row.quantity * row.unit_price).toFixed(2))
  }

  const createItemKey = () => {
    // Generating Unique Keys
    let key = Number(Date.now());
    return key
  }

  const createItemDescription = (state, payload) => {
    let description = "\u200b"
    return description
  }

  function addItem(state, action) {
    return  {
      id: createItemKey(),
      objectId: action.payload.objectId,
      description: createItemDescription(state, action.payload),
      model: action.payload.model,
      upload: null,
      image_src: "",
      height: 0,
      width: 0,
      area: 0,
      unit_price: state.selectedInvoice.company.defaultRate || 0,
      quantity: 1,
      amount: 0,
    };
  }

  function setItemImage(row, payload) {
    return updateRow(row, payload)
  }

  function getOrderIndex(state, id) {
    return state.selectedInvoice.orders.findIndex(order => order.id === id)
  }

  function isOrderRow(state, id){
    return state.selectedInvoice.orders.some(order => order.id === id);
  }

  function updateRow(row, items) {
    const newRow = {
      ...row,
      ...items,
    }
    newRow['area'] = calculateArea(newRow.width, newRow.height)
    newRow['amount'] = calculateRowAmount(newRow)
    return newRow
  }

  const handleLoadInvoices = async () => {
    try {
      const { ok, data } = await useFetch(`api/invoices/`);
      console.log(data);
      dispatch({
        type: "setInvoices",
        payload: data
      })
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  };

  const handleSaveInvoice = async () => {

    const { ok, data } = await useFetch('api/invoices/', {
      method: 'POST',
      body: JSON.stringify({
        items: state.selectedInvoice.items.map(item => ({ ...item, object_id: item.objectId })), company: state.selectedInvoice.company.id,
        orders: state.selectedInvoice.orders.map(item => ({ ...item, object_id: item.objectId }))
      })
    })

    if (ok) {
      message.success(`Invoice saved. Id ${data.id}`)
      dispatch({
        type: "setSelectedInvoice",
        payload: initialState.selectedInvoice
      })
    } else {
      message.error('Failed to store')
    }
  }

  const handleLoadInvoiceDetail = async (id) => {
    const { ok, data } = await useFetch(`api/invoices/${id}/`)
    console.log(data);
    if (ok) {
      message.info('Invoice opened in edit mode')
      dispatch({
        type: "setSelectedInvoice",
        payload: data
      })
    }
  }

  const reducerMethod = (state, action) => {
    const newState = { ...state }; // Create a new state variable

    switch (action.type) {
      case 'setCustomerDetails':
        newState.selectedInvoice.company = action.payload
        break

      case 'setCustomerRate':
        newState.selectedInvoice.company.defaultRate = action.payload
        break

      case 'setDiscount':
        newState.selectedInvoice.discount = action.payload.discount
        break
      case "addItem":
        console.log(newState.selectedInvoice);
        const item = addItem(state, action);
        if(action.payload.model === "order"){
          newState.selectedInvoice.orders = [
            ...state.selectedInvoice.orders,
            {...item, items: []}
          ]
        }
        else
        {newState.selectedInvoice.items = [
          ...state.selectedInvoice.items,
          item
        ]}


        break;

      case "addInnerOrderItem":

      let Index = getOrderIndex(state, action.payload.objectId);

      let updatedOrders = [...newState.selectedInvoice.orders];
      const items = updatedOrders[Index].items;
      updatedOrders[Index].items = [...items, addItem(state, action)];
      console.log(updatedOrders);
      newState.selectedInvoice.orders = updatedOrders;


      break;


      case "setPrice":
      case "setQuantity":
      case "setHeight":
      case "setWidth":
        let orderedIndex = getOrderIndex(state, action.payload.objectId);
        if(typeof orderedIndex !== "undefined" && orderedIndex !== -1){
          newState.selectedInvoice.orders[orderedIndex].items = state.selectedInvoice.orders[orderedIndex].items.map(item =>
            item.id === action.payload.id
              ? updateRow(item, action.payload) : item)
        }
        else{
        newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
          item.id === action.payload.id ? updateRow(item, action.payload) : item
        )
      }
        break;

      case "setImageData":
        let orderIndex = getOrderIndex(state, action.payload.objectId);
        if(typeof orderIndex !== "undefined" && orderIndex !== -1){
          newState.selectedInvoice.orders[orderIndex].items = state.selectedInvoice.orders[orderIndex].items.map(item =>
            item.id === action.payload.id
              ? setItemImage(item, action.payload)
              : item)
        }
        else{

          newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
            item.id === action.payload.id
              ? setItemImage(item, action.payload)
              : item)

        }

        break;

      case "deleteRow":

      // check if we need to remove item or order
      // check if order exists against row id
       debugger;
        if(isOrderRow(state, action.payload.key)){
          // The complete order needs to be deleted
          newState.selectedInvoice.orders = state.selectedInvoice.orders.filter(order => order.id !== action.payload.key)

        }
        else if(action.payload.objectId){
          // The item inside an order row needs to be deleted
          const id = getOrderIndex(state, action.payload.objectId);
          newState.selectedInvoice.orders[id].items = state.selectedInvoice.orders[id].items.filter(item => item.id !== action.payload.key)
        }
        else{
          newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.id !== action.payload.key)
        }

        break;

      case "updateRow":
        const { id, cellSource, objectId, row } = action.payload;
        const { dataIndex } = cellSource;
        const updatedItems = state.selectedInvoice.items.map(item => {
          if (item.id === id && item.objectId === objectId) {
            switch (dataIndex) {
              case "height":
                return {
                  ...item,
                  height: row.height || 0,
                };
              case "width":
                return {
                  ...item,
                  width: row.width || 0,
                };
              case "description":
                return {
                  ...item,
                  description: row.description || "\u200b",
                };
              default:
                return item;
            }
          }
          return item;
        });

        newState.selectedInvoice.items = updatedItems;
        break;

      case 'setInvoices':
        newState.invoices = action.payload
        break;

      case 'setSelectedInvoice':
        debugger;
        let orders = action.payload.orders;
        newState.selectedInvoice = action.payload;
        orders = orders.map(item => ({...item, model: "order"}));
        newState.selectedInvoice.orders = orders;
        break;

      case 'resetSelectedInvoice':
        newState.selectedInvoice = initialState.selectedInvoice
        break
      default:
        break;
    }
    return newState;
  };

  const [state, dispatch] = useReducer(reducerMethod, initialState);

  return (
    <billContext.Provider value={{ state, dispatch, handleLoadInvoices, handleSaveInvoice, handleLoadInvoiceDetail }}>
      {children}
    </billContext.Provider>
  );
}

export const useBillContext = () => useContext(billContext);
