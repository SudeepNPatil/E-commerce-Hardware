import React from 'react';
import OrdersPage from './OrdersPage.jsx';
import CustomOrderPage from './CustomOrderPage.jsx';

export default function Orders() {
  let ProductPurpose = localStorage.getItem('ProductPurpose');
  let ProductType = localStorage.getItem('ProductType');

  return <>{ProductType === 'Custom' ? <CustomOrderPage /> : <OrdersPage />}</>;
}
