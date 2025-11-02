import React from 'react';
import { useProductTypeContext } from '../Context/ProductTypeContext';
import OrdersPage from './OrdersPage.jsx';
import CustomOrderPage from './CustomOrderPage.jsx';

export default function Orders() {
  const { ProductPurpose, ProductType } = useProductTypeContext();

  return <>{ProductType === 'Custom' ? <CustomOrderPage /> : <OrdersPage />}</>;
}
