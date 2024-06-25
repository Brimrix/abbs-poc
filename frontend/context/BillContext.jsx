import { createContext, useContext, useReducer } from "react";

const billContext = createContext();


export function BillProvider({ children }) {
  const initialState = {
    selectedInvoice: {
      items: [],
      customer: {
        name: '',
        defaultRate: 0
      },
      discount: 0,
    },
  };

  function calculateArea(width, height, unit = 144) {
    return Number((width * height) / unit).toFixed(2);
  }

  function calculateRowAmount(row) {
    return Number((row.area * row.quantity * row.price).toFixed(2))
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
      tableId: action.payload.tableId,
      key: createItemKey(state, action.payload),
      description: createItemDescription(state, action.payload),
      upload: null,
      image_src: "",
      height: 0,
      width: 0,
      area: 0,
      price: state.selectedInvoice.customer.defaultRate,
      quantity: 1,
      amount: 0,
      order: Boolean(action.payload.order)
    };
  }

  function setItemImage(row, payload) {
    payload['area'] = calculateArea(payload.width, payload.height)
    return updateRow(row, payload)
  }

  function updateRow(row, items) {
    const newRow = {
      ...row,
      ...items,
    }
    newRow['amount'] = calculateRowAmount(newRow)
    return newRow
  }

  const reducerMethod = (state, action) => {
    const newState = { ...state }; // Create a new state variable

    switch (action.type) {
      case 'setCustomerDetails':
        newState.selectedInvoice.customer = action.payload
        break

      case 'setCustomerRate':
        newState.selectedInvoice.customer.defaultRate = action.payload
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
        newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
          item.key === action.payload.key ? updateRow(item, action.payload) : item
        )
        break;

      case "setHeight":
        newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
          item.key === action.payload.key ? updateRow({...item, area: calculateArea(item.width, action.payload.height, 144)}, action.payload) : item )
      break;
      case "setWidth":
        newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
          item.key === action.payload.key ? updateRow({...item, area: calculateArea(action.payload.width, item.height, 144)}, action.payload) : item )


      break;

      case "setImageData":
        newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
          item.key === action.payload.key
            ? setItemImage(item, action.payload)
            : item)
        break;

      case "deleteRow":
        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.key !== action.payload.key)
        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.tableId !== action.payload.key)

        // I have Removed nested rows as well if any
        break;

        case "updateRow":
          const { key, tableId, cellSource, row } = action.payload;
          const { dataIndex } = cellSource;
          const updatedItems = state.selectedInvoice.items.map(item => {
              if (item.key === key && item.tableId === tableId) {
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

      default:
        break;
    }
    return newState;
  };

  const [state, dispatch] = useReducer(reducerMethod, initialState);
  return (
    <billContext.Provider value={{ state, dispatch }}>
      {children}
    </billContext.Provider>
  );
}

export const useBillContext = () => useContext(billContext);
