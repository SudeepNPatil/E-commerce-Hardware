import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export const WishlistContext = createContext();

export const WishlistContextProvider = ({ children }) => {
  const [WishlistItem, setWishlistItem] = useState([]);

  const addToWishlist = (item) => {
    setWishlistItem((prev) => [...prev, item]);
  };

  const RemoveWishlistItem = (item) => {
    const afterremove = WishlistItem.filter(
      (filitem) => filitem.projectId != item.projectId
    );

    setWishlistItem(afterremove);
  };

  return (
    <WishlistContext.Provider
      value={{ WishlistItem, addToWishlist, RemoveWishlistItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
