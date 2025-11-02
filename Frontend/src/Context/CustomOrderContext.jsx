import { createContext, useContext, useState } from 'react';

export const CustomOrderContext = createContext();

export function CustomOrderContextProvider({ children }) {
  const [CustomOrder, setCustomOrder] = useState([]);

  const CustomaddToOrder = (item) => {
    setCustomOrder((prev) => [...prev, item]);
  };

  const RemoveFromCustomOrder = (id) => {
    const Orderlist = CustomOrder.filter((filitem) => filitem?.orderId != id);

    setCustomOrder(Orderlist);
  };

  return (
    <CustomOrderContext.Provider
      value={{ CustomOrder, CustomaddToOrder, RemoveFromCustomOrder }}
    >
      {children}
    </CustomOrderContext.Provider>
  );
}

export const useCustomOrderContext = () => useContext(CustomOrderContext);
