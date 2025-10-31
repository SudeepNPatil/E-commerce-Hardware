import { createContext, useContext, useState } from 'react';

export const OrderContext = createContext();

export function OrderContextProvider({ children }) {
  const [Order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder((prev) => [...prev, item]);
  };

  const RemoveFromOrder = (id) => {
    const Orderlist = Order.filter((filitem) => filitem.projectId != id);

    console.log(Orderlist);
    setOrder(Orderlist);
  };

  return (
    <OrderContext.Provider value={{ Order, addToOrder, RemoveFromOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderContext = () => useContext(OrderContext);
