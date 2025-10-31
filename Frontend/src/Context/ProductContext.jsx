import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export const ProductContext = createContext();

export const ProductContextProvider = function ({ children }) {
  const [Products, setProducts] = useState([]);

  const [searchProduct, setsearchProduct] = useState('');

  return (
    <ProductContext.Provider
      value={{ Products, setProducts, searchProduct, setsearchProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
