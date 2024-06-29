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
    return Number(Date.now());
  }

  const createItemDescription = (state, payload) => {
    let description = "\u200b"
    return description
  }

  function addItem(state, action) {
    return {
      id: createItemKey(),
      uniqueId: createItemKey(),
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

  function getOrderIndex(state, rowUniqueId) {
    return state.selectedInvoice.orders.findIndex(order => order.uniqueId === rowUniqueId)
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

    const invoice = {
      ...data,
      items: data.items.map(item => ({ ...item, uniqueId: createItemKey() })),
      orders: data.orders.map(order => ({
        ...order,
        uniqueId: createItemKey(),
        items: order.items.map(item => ({ ...item, uniqueId: createItemKey() }))
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

      case "addItem":
        const item = addItem(state, action);
        if (action.payload.model === "order") {
          newState.selectedInvoice.orders = [
            ...state.selectedInvoice.orders,
            { ...item, items: [] }
          ]
        }
        else {
          newState.selectedInvoice.items = [
            ...state.selectedInvoice.items,
            item
          ]
        }
        break;

      case "addInnerOrderItem":
        let Index = getOrderIndex(state, action.payload.objectId);
        let updatedOrders = [...newState.selectedInvoice.orders];
        const items = updatedOrders[Index].items;
        updatedOrders[Index].items = [...items, addItem(state, action)];
        newState.selectedInvoice.orders = updatedOrders;
        break;


      case "setPrice":
      case "setQuantity":
      case "setHeight":
      case "setWidth":
        let orderedIndex = getOrderIndex(state, action.payload.objectId);
        if (typeof orderedIndex !== "undefined" && orderedIndex !== -1) {
          newState.selectedInvoice.orders[orderedIndex].items = state.selectedInvoice.orders[orderedIndex].items.map(item =>
            item.id === action.payload.id
              ? updateRow(item, action.payload) : item)
        }
        else {
          newState.selectedInvoice.items = state.selectedInvoice?.items.map(item =>
            item.id === action.payload.id ? updateRow(item, action.payload) : item
          )
        }
        break;

      case "setImageData":
        /* Pass in itemId, orderId if the item is in an order
        {itemId:1,orderId;1}: Update image of order item with given order id.
        {itemId:1,orderId;null}: Update image of invoice item
        */
        let orderIndex = getOrderIndex(state, action.payload.objectId);
        if (typeof orderIndex !== "undefined" && orderIndex !== -1) {
          newState.selectedInvoice.orders[orderIndex].items = state.selectedInvoice.orders[orderIndex].items.map(item =>
            item.id === action.payload.id
              ? updateRow(item, action.payload)
              : item)
        }
        else {

          newState.selectedInvoice.items = state.selectedInvoice.items.map(item =>
            item.id === action.payload.id
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
          debugger
          if (action.payload.itemId && orderIndex !== -1) {
            newState.selectedInvoice.orders[orderIndex].items = state.selectedInvoice.orders[orderIndex].items.filter(item =>
              item.uniqueId !== action.payload.itemId
            )
          }
          else
            newState.selectedInvoice.orders = state.selectedInvoice.orders.filter(order => order.uniqueId !== action.payload.orderId)
        } else {
          newState.selectedInvoice.items = state.selectedInvoice.items.filter(item => item.uniqueId !== action.payload.itemId)
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
        let orders = action.payload.orders;
        newState.selectedInvoice = action.payload;
        orders = orders.map(item => ({ ...item, model: "order" }));
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
