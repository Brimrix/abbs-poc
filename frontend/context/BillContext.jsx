import { createContext, useContext, useReducer } from "react";
import ImageSelector from "@/components/invoices/ImageSelector";
import PriceComponent from "@/components/invoices/PriceComponent";
import QuantityComponent from "@/components/invoices/QuantityComponent";
import DeleteIcon from "@/components/invoices/RemoveComponent";

const billContext = createContext();

export function BillProvider({ children }) {
  const initialState = {
    billData: [
      {
        tableId: 1,
        key: 0,
        image_name: "\u200b",
        upload: <ImageSelector _id={0} reRender={false} tableId={1} />,
        height: 0,
        width: 0,
        area: 0,
        actualPrice: 0,
        actualQuantity: 0,
        actions: <DeleteIcon _id={0} tableId={1} />,
        price: (
          <PriceComponent
            _id={0}
            defaultInputValue={0}
            reRender={false}
            tableId={1}
          />
        ),
        quantity: (
          <QuantityComponent
            _id={0}
            defaultInputValue={1}
            reRender={false}
            tableId={1}
          />
        ),
        amount: 0,
        order: 1,
        image_src: "",
      },
    ],

    clientDetails: {
      clientName: "",
      billDate: "",
    },

    orderCount: {
      count: 1,
    },

    utilities: {
      selectedKey: "2",
      collapsed: false,
    },

    shouldReRender: false,
  };

  const reducerMethod = (state, action) => {
    const newState = { ...state }; // Create a new state variable

    switch (action.type) {
      case "ORDER_ADD":
        const orderID = Number(Date.now());
        const orderRow = {
          tableId: Number(action.payload.tableId),
          key: state.billData.length,
          image_name: `ORDER #${Number(Date.now())}`,
          type: "order",
          orderId: orderID,
          upload: "",
          price: "",
          quantity: "",
          order: state.billData.length + 1,
          actions: (
            <DeleteIcon
              _id={state.billData.length}
              orderId={orderID}
            />
          ),
          image_src: "",
        };
        newState.billData = [...state.billData, orderRow];

        break;

      case "PRICE_CHANGE":
        newState.billData = state.billData.map((item) =>
          item.key === action.payload._key &&
            item.tableId === Number(action.payload.tableId)
            ? {
              ...item,
              actualPrice: action.payload.actualPrice,
              amount: action.payload.AMOUNT,
            }
            : item
        );
        break;

      case "QUANTITY_CHANGE":
        newState.billData = state.billData.map((item) =>
          item.key === action.payload._key &&
            item.tableId === Number(action.payload.tableId)
            ? {
              ...item,
              actualQuantity: action.payload.actualQuantity,
              amount: action.payload.AMOUNT,
            }
            : item
        );
        break;

      case "ADD_ROW":
        const newItem = {
          tableId: Number(action.payload.tableId),
          key: state.billData.length,
          image_name: "\u200b",
          height: 0,
          width: 0,
          type: "item",
          orderId: Number(Date.now()),
          area: 0,
          actualPrice: 0,
          actualQuantity: 0,
          upload: (
            <ImageSelector
              _id={state.billData.length}
              reRender={false}
              tableId={Number(action.payload.tableId)}
            />
          ),
          price: (
            <PriceComponent
              _id={state.billData.length}
              defaultInputValue={0}
              reRender={false}
              tableId={Number(action.payload.tableId)}
            />
          ),
          quantity: (
            <QuantityComponent
              _id={state.billData.length}
              defaultInputValue={1}
              reRender={false}
              tableId={Number(action.payload.tableId)}
            />
          ),
          amount: 0,
          order: state.billData.length + 1,
          actions: (
            <DeleteIcon
              _id={state.billData.length}
              tableId={Number(action.payload.tableId)}
            />
          ),
          image_src: "",
        };
        newState.billData = [...state.billData, newItem];
        break;

      case "SET_DIMENSION":
        newState.billData = state.billData.map((item) =>
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
        );
        break;

      case "REMOVE_ROW":
        let filteredData = state.billData.filter(
          (item) => item.key !== action.payload._key
        );
        if(action.payload.orderId)
        filteredData = filteredData.filter(
          (item) => item.tableId !== action.payload.orderId
        );
        const newShouldReRender = !state.shouldReRender;
        newState.shouldReRender = newShouldReRender;
        newState.billData = filteredData.map((item, index) => {
          if (item.type === "item") {
            return {
              ...item,
              upload: (
                <ImageSelector
                  _id={Number(index)}
                  reRender={newShouldReRender}
                  renderSource={filteredData[index].image_src}
                  tableId={Number(action.payload.tableId)}
                />
              ),
              price: (
                <PriceComponent
                  _id={Number(index)}
                  defaultInputValue={filteredData[index].actualPrice}
                  reRender={newShouldReRender}
                  tableId={Number(action.payload.tableId)}
                />
              ),
              quantity: (
                <QuantityComponent
                  _id={Number(index)}
                  defaultInputValue={filteredData[index].actualQuantity}
                  reRender={newShouldReRender}
                  tableId={Number(action.payload.tableId)}
                />
              ),
              actions: <DeleteIcon _id={Number(index)} />,
              key: index,
              order: index + 1,
            };
          }
          return item;
        });

        break;

      case "SET_CLIENT_DETAILS":
        newState.clientDetails = {
          clientName: action.payload.name,
          billDate: action.payload.date,
        };
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
            } else if (action.payload.cellSource.dataIndex === "image_name") {
              return {
                ...item,
                image_name: action.payload.row.image_name
                  ? action.payload.row.image_name
                  : "\u200b",
              };
            }
          }
          return item;
        });
        break;

      case "DISPATCH_SELECT_KEY":
        newState.utilities.selectedKey = action.payload.key;
        break;

      case "DISPATCH_COLLAPSE":
        newState.utilities.collapsed = action.payload.collapse;
        break;

      default:
        break;
    }

    return newState;
  };

  const fetchInvoices = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_SERVER}api/invoices/`)
    const data = await response.json()

    return data
  }

  // UseReducer setup
  const [state, dispatch] = useReducer(reducerMethod, initialState);
  return (
    <billContext.Provider value={{ state, dispatch, fetchInvoices }}>
      {children}
    </billContext.Provider>
  );
}

export const useBillContext = () => useContext(billContext);
