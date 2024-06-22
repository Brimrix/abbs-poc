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

  const createItemKey = (state, payload) => {
    let key = state.selectedInvoice.items.length + 1
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

      case "setImageData":
        newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
          item.key === action.payload.key
            ? setItemImage(item, action.payload)
            : item)
        break;

      case "deleteRow":
        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.key !== action.payload.key)
        // Remove nested rows too.
        break;

      case "UPDATE_ROW":
        newState.billData = state.billData.map((item) => {
          if (
            item.key === action.payload.key &&
            item.tableId === Number(action.payload.tableId)
          ) {
            if (action.payload.cellSource.dataIndex === "height") {
              return {
                ...item,
                height: action.payload.row.height
                  ? Number(action.payload.row.height)
                  : 0,
                area:
                  Math.round(
                    ((item.width * Number(action.payload.row.height)) / 144) *
                    100
                  ) / 100,
              };
            } else if (action.payload.cellSource.dataIndex === "width") {
              return {
                ...item,
                width: action.payload.row.width
                  ? Number(action.payload.row.width)
                  : 0,
                area:
                  Math.round(
                    ((item.height * Number(action.payload.row.width)) / 144) *
                    100
                  ) / 100,
              };
            } else if (action.payload.cellSource.dataIndex === "description") {
              return {
                ...item,
                description: action.payload.row.description
                  ? action.payload.row.description
                  : "\u200b",
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

  const [state, dispatch] = useReducer(reducerMethod, initialState);
  return (
    <billContext.Provider value={{ state, dispatch }}>
      {children}
    </billContext.Provider>
  );
}

export const useBillContext = () => useContext(billContext);
