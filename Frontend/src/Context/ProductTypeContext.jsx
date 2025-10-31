import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export const ProductTypeContext = createContext();

export const ProductTypeContextProvider = function ({ children }) {
  const [ProductType, setProductType] = useState('readymade');

  return (
    <ProductTypeContext.Provider value={{ ProductType, setProductType }}>
      {children}
    </ProductTypeContext.Provider>
  );
};

export const useProductTypeContext = () => useContext(ProductTypeContext);
