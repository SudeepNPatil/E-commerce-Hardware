import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useLogincontext } from './LoginContext.jsx';

const baseurl = `${import.meta.env.VITE_API_URL}`;

export const OrderContext = createContext();

export function OrderContextProvider({ children }) {
  const { logindata } = useLogincontext();
  let id = logindata.user?._id;
  const [Order, setOrder] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`${baseurl}/readymadeOrders/orders/${id}`)
      .then((data) => data.json())
      .then((data) => setOrder(data.orders || []))
      .catch((err) => console.error(err));
  }, [id]);

  const addToOrder = (item) => {
    setOrder((prev) => [...prev, item]);
  };

  const RemoveFromOrder = (id) => {
    const Orderlist = Order.filter((filitem) => filitem?.product?.id != id);

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
