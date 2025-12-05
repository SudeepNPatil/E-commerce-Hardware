import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

export const ProductTypeContext = createContext();

export const ProductTypeContextProvider = function ({ children }) {
  const [ProductType, setProductType] = useState('');
  const [ProductPurpose, setProductPurpose] = useState('');
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    localStorage.setItem('ProductType', `${ProductType}`);
    localStorage.setItem('ProductPurpose', `${ProductPurpose}`);
  }, [ProductType, ProductPurpose]);

  return (
    <ProductTypeContext.Provider
      value={{ ProductType, setProductType, ProductPurpose, setProductPurpose }}
    >
      {children}
    </ProductTypeContext.Provider>
  );
};

export const useProductTypeContext = () => useContext(ProductTypeContext);
