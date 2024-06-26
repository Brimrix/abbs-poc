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
    return {
      id: createItemKey(),
      objectId: action.payload.objectId,
      description: createItemDescription(state, action.payload),
      upload: null,
      image_src: "",
      height: 0,
      width: 0,
      area: 0,
      unit_price: state.selectedInvoice.company.defaultRate || 0,
      quantity: 1,
      amount: 0,
      model: action.payload.model
    };
  }

  function setItemImage(row, payload) {
    return updateRow(row, payload)
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
        // Adds all type of rows, depends on tableId & order
        newState.selectedInvoice.items = [
          ...state.selectedInvoice.items,
          addItem(state, action)
        ]
        break;

      case "setPrice":
      case "setQuantity":
      case "setHeight":
      case "setWidth":
        newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
          item.id === action.payload.id ? updateRow(item, action.payload) : item
        )
        break;

      case "setImageData":
        newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
          item.id === action.payload.id
            ? setItemImage(item, action.payload)
            : item)
        break;

      case "deleteRow":
        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.id !== action.payload.key)
        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.tableId !== action.payload.key)

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
        newState.selectedInvoice = action.payload
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
