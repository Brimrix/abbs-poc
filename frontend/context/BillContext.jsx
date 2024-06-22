import { createContext, useContext, useReducer } from "react";

const billContext = createContext();


export function BillProvider({ children }) {
  const initialState = {
    selectedInvoice: {
      items: [],
      orders: [],
      customer: {
        name: '',
        defaultRate: 0
      },
      discount: 0,
      data() {
        return this.items.concat(this.orders)
      }
    },
    billData: [
      {
        tableId: 1,
        key: 0,
        description: "\u200b",
        upload: null,
        height: 0,
        width: 0,
        area: 0,
        price: () => this.selectedInvoice.customer.defaultRate,
        quantity: 1,
        amount: 0,
        order: 1,
        image_src: "",
      },
    ],
    orderCount: {
      count: 1,
    },

    shouldReRender: false,
  };

  function calculateArea(width, height, unit = 144) {
    return Number((width * height) / unit).toFixed(2);
  }

  function calculateRowAmount(row) {
    return Number((row.area * row.quantity * row.price).toFixed(2))
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

      case "ORDER_ADD":
        const orderID = Number(Date.now());
        const orderRow = {
          tableId: Number(action.payload.tableId),
          key: state.billData.length,
          description: `ORDER #${Number(Date.now())}`,
          type: "order",
          orderId: orderID,
          upload: "",
          price: '',
          quantity: "",
          order: state.billData.length + 1,
          image_src: "",
        };
        newState.billData = [...state.billData, orderRow];
        break;

      case "setPrice":
        newState.billData = state.billData.map((item) =>
          item.key === action.payload.key &&
            item.tableId === Number(action.payload.tableId)
            ? {
              ...item,
              price: action.payload.price,
              amount: action.payload.price * item.quantity * item.area,
            }
            : item
        );
        break;

      case "setQuantity":
        newState.billData = state.billData.map((item) =>
          (item.key === action.payload.key &&
            item.tableId === action.payload.tableId)
            ? {
              ...item,
              quantity: action.payload.quantity,
              amount: item.price * action.payload.quantity * item.area,
            }
            : item
        );
        break;

      case "ADD_ROW":
        const newItem = {
          tableId: Number(action.payload.tableId),
          key: state.billData.length + 1,
          description: "\u200b",
          height: 0,
          width: 0,
          type: "item",
          orderId: Number(Date.now()),
          area: 0,
          upload: null,
          price: state.selectedInvoice.customer.defaultRate,
          quantity: 1,
          amount: 0,
          order: state.billData.length + 1,
          image_src: "",
        };
        newState.billData = [...state.billData, newItem];
        break;

      case "uploadImage":
        newState.billData = state.billData.map((item) =>
          item.key === action.payload.key
            ? {
              ...item,
              description: action.payload.name,
              height: action.payload.HEIGHT,
              width: action.payload.WIDTH,
              area: calculateArea(action.payload.WIDTH, action.payload.HEIGHT),
              image_src: action.payload.IMAGE_SOURCE,
              amount: item.price * item.quantity * calculateArea(action.payload.WIDTH, action.payload.HEIGHT),
            }
            : item
        );
        break;

      case "REMOVE_ROW":
        let filteredData = state.billData.filter(
          (item) => item.key !== action.payload._key
        );
        if (action.payload.orderId)
          filteredData = filteredData.filter(
            (item) => item.tableId !== action.payload.orderId
          );
        const newShouldReRender = !state.shouldReRender;
        newState.shouldReRender = newShouldReRender;
        newState.billData = filteredData.map((item, index) => {
          if (item.type === "item") {
            return {
              ...item,
              key: index,
              order: index + 1,
            };
          }
          return item;
        });

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

    debugger;
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
