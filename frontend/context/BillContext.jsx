import { createContext, useContext, useReducer } from "react";
import { useFetch } from '@/hooks/useFetch';
import { message } from "antd";
import { v4 as uuidv4 } from 'uuid';


const billContext = createContext();

export function BillProvider({ children }) {
  const initialState = {
    invoices: [],
    selectedInvoice: {
      id: uuidv4(),
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
    return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  }

  const createItemDescription = (state, payload) => {
    let description = "\u200b"
    return description
  }

  function addItem(state, action) {
    return {
      id: createItemKey(),
      objectId: action.payload.objectId,
      description: createItemDescription(state, action.payload),
      model: "invoice",
      upload: null,
      image_src: "",
      height: 0,
      width: 0,
      area: 0,
      unit_price: state.selectedInvoice.company.defaultRate || 0,
      quantity: 1,
      amount: 0,
      state:'update/add'
    };
  }

  function addOrder(state) {
    return {
      id: createItemKey(),
      object_id: state.selectedInvoice.id,
      items: [],
      model: "order"
    };
  }

  function getOrderIndex(state, rowId) {
    return state.selectedInvoice.orders.findIndex(order => order.id === rowId)
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

    const invoice = {
      ...data,
      items: data.items,
      orders: data.orders.map(order => ({
        ...order,
        model: "order"
      }))
    }

    if (ok) {
      message.info('Invoice opened in edit mode')
      dispatch({
        type: "setSelectedInvoice",
        payload: invoice
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

      case "addRow":
        // if payload has an model of order then this will mean order is to be added in invoice
        if (!action.payload.orderId && action.payload.model === "order") {
          newState.selectedInvoice.orders = [
            ...state.selectedInvoice.orders,
           addOrder(state)
          ]
        }
        // If no orderId is found and model is item it would mean the item should be added
        // in invoice rather than against an order
      else if(!action.payload.orderId && action.payload.model === "item") {
            newState.selectedInvoice.items = [
              ...state.selectedInvoice.items,
              addItem(state, action)
            ]
        }
        // else the item will be added against an order
       else{
        const index = getOrderIndex(state, action.payload.orderId);
        state.selectedInvoice.orders[index].items = [...state.selectedInvoice.orders[index].items, addItem(state, action)];
    }


        break;

      case "setPrice":
      case "setQuantity":
      case "setHeight":
      case "setWidth":
        debugger;
        if(!action.payload.orderId && action.payload.itemId) {
            newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
            item.id === action.payload.itemId ? updateRow(item, action.payload) : item )
        }
        else{

          let orderedIndex = getOrderIndex(state, action.payload.orderId);
          newState.selectedInvoice.orders[orderedIndex].items = state.selectedInvoice.orders[orderedIndex].items.map(item =>
            item.id === action.payload.itemId
              ? updateRow(item, action.payload) : item)
        }

        break;

      case "setImageData":
        // If payload has no orderId and model is item then the image will be set in invoice.
        if(!action.payload.orderId && action.payload.model === "item") {
          newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
            item.id === action.payload.itemId
              ? updateRow(item, action.payload)
              : item)
        }
        // If payload has orderId and model is item then the image will be set against an order
        else{
          const orderIndex = getOrderIndex(state, action.payload.orderId);
            newState.selectedInvoice.orders[orderIndex].items = state.selectedInvoice.orders[orderIndex].items.map(item =>
              item.id === action.payload.itemId
                ? updateRow(item, action.payload)
                : item)
        }

        break;

      case "deleteRow":
        /* Delete function expected payload and behavior.
          {item:1,orderId:1} : Delete row 1 from order 1
          {item:1,orderId:null} : delete row 1 from invoice
          {item:null,orderId:1} : delete order 1 from invoice.
        */

        if (action.payload.orderId) {
          const orderIndex = getOrderIndex(state, action.payload.orderId)
          if (action.payload.itemId && orderIndex !== -1) {
            newState.selectedInvoice.orders[orderIndex].items = state.selectedInvoice.orders[orderIndex].items.filter(item =>
              item.id !== action.payload.itemId
            )
          }
          else
            newState.selectedInvoice.orders = state.selectedInvoice.orders.filter(order => order.id !== action.payload.orderId)
        } else {
          newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.id !== action.payload.itemId)
        }
        break;

      case "updateRow":
        const { itemId, cellSource, orderId, row } = action.payload;
        const dataIndex = cellSource;
        // The first case when orderId is null and itemId exists. We have to update a row from invoice.
        // Please add debuggers and test why this does not work. Everything looks fine even from debugging point of view.
        // I am struck here.
        if(!orderId && itemId){
          newState.selectedInvoice.items = newState.selectedInvoice.items.map(item => {
            if (item.id === itemId) {
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
        }
        break;

      case 'setInvoices':
        newState.invoices = action.payload
        break;

      case 'setSelectedInvoice':
        newState.selectedInvoice = action.payload;
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
