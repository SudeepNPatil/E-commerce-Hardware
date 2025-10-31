import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [Cartitem, setCartitem] = useState([]);

  const addToCart = (item) => {
    setCartitem((prev) => [...prev, item]);
  };

  const RemoveCartItem = (item) => {
    const afterremove = Cartitem.filter(
      (filitem) => filitem.projectId != item.projectId
    );

    setCartitem(afterremove);
  };

  const clearcart = () => {
    setCartitem([]);
  };

  return (
    <CartContext.Provider
      value={{ Cartitem, addToCart, RemoveCartItem, clearcart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
