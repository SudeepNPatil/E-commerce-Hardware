import React, { useContext, useState } from 'react';
import { createContext } from 'react';

export const ProductTypeContext = createContext();

export const ProductTypeContextProvider = function ({ children }) {
  const [ProductType, setProductType] = useState('');
  const [ProductPurpose, setProductPurpose] = useState('');

  return (
    <ProductTypeContext.Provider
      value={{ ProductType, setProductType, ProductPurpose, setProductPurpose }}
    >
      {children}
    </ProductTypeContext.Provider>
  );
};

export const useProductTypeContext = () => useContext(ProductTypeContext);
