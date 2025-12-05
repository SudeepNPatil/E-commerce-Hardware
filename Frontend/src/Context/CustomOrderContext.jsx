import { createContext, useContext, useState } from 'react';
import { useLogincontext } from './LoginContext.jsx';
import { useEffect } from 'react';

export const CustomOrderContext = createContext();

export function CustomOrderContextProvider({ children }) {
  const [CustomOrder, setCustomOrder] = useState([]);
  const { logindata } = useLogincontext();
  let id = logindata.user?._id;

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`http://localhost:5000/CustomOrders/orders/${id}`)
      .then((data) => data.json())
      .then((data) => setCustomOrder(data.orders || []))
      .catch((err) => console.error(err));
  }, [id]);

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
