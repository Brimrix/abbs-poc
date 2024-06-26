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
    if(payload.order && payload.tableId==="root") {
      return `Order #${(Date.now().toString().substring(7,14))}`
    }
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
      quantity: action.payload.order && action.payload.tableId === "root" ? 0 : 1,
      amount: 0,
      order: action.payload.order
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

  const findOrderRow = (items, orderKey) => {
    return items.find((item) => item.key === orderKey);
  };

  const filterNestedItems = (items, tableId) => {
    return items.filter((item) => item.tableId === tableId);
  };

  const calculateTotalAmount = (items) => {
    return items.map((item) => item.amount).reduce((acc, amount) => acc + amount, 0);
  };

  const calculateTotalArea = (items) => {
    const totalArea =  items.map((item) => Number(item.area)).reduce((acc, area) => acc + area, 0);
    return Number(totalArea).toFixed(2);

  };

  const calculateOrderQuantity = (items) => {
    return items.reduce((sum, item) => sum + Number(item.quantity), 0);
  };

  const updateOrderRow = (state, action) => {
    if (action.payload.order) {
      let totalAmountRow = 0;
      let totalOrderQuantity = 0;
      let totalOrderArea = 0;
      const orderRow = findOrderRow(state.selectedInvoice.items, action.payload.order);

      if (orderRow) {
        const nestedItems = filterNestedItems(state.selectedInvoice.items, orderRow.key);
        if (nestedItems.length > 0) {
          totalAmountRow = calculateTotalAmount(nestedItems);
          totalOrderArea = calculateTotalArea(nestedItems);
          totalOrderQuantity = calculateOrderQuantity(nestedItems);
        }
      }

      if(orderRow) {
        state.selectedInvoice.items = state.selectedInvoice.items.map((item) => {
          if (item.key === orderRow?.key){
            return {...item,  amount: Number(totalAmountRow).toFixed(2), quantity: totalOrderQuantity, area: Number(totalOrderArea).toFixed(2)}
          }
          return item
        });
      }


    }

    return state.selectedInvoice.items
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

        updateOrderRow(state, action)

        break;

      case "setPrice":
      case "setQuantity":
      case "setHeight":
      case "setWidth":


        newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
          item.key === action.payload.key ? updateRow(item, action.payload) : item
        );

        updateOrderRow(state, action)


        break;

      case "setImageData":

        newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
          item.key === action.payload.key
            ? setItemImage(item, action.payload)
            : item);

          updateOrderRow(state, action);


        break;

      case "deleteRow":

        const index = newState.selectedInvoice.items.findIndex((item) => item.key === action.payload.key);
        const order = newState.selectedInvoice.items[index].order;

        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.key !== action.payload.key)
        newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.tableId !== action.payload.key)

        updateOrderRow(newState, {payload: {order}});


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
