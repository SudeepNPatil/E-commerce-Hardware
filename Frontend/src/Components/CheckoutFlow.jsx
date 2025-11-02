import React, { useState } from 'react';
import CheckOutAddressPage from './CheckOutAddressPage.jsx';
import PaymentPage from './PaymentPage.jsx';
import { useLocation } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage.jsx';
import { useOrderContext } from '../Context/OrderContext.jsx';

const CheckoutFlow = ({ quantity = 1 }) => {
  const location = useLocation();
  const product = location.state;
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);

  const { addToOrder } = useOrderContext();
  const handleAddressContinue = (details) => {
    setOrderDetails(details);
    setCurrentStep(2);
  };

  const handlePaymentBack = () => {
    setCurrentStep(1);
  };

  const handlePaymentConfirm = (completeOrder) => {
    setOrderDetails(completeOrder);
    setCurrentStep(3);
    addToOrder(completeOrder);
    // Move to confirmation
    // Save to OrderDetailContext here
  };

  return (
    <>
      {currentStep === 1 && (
        <CheckOutAddressPage
          product={product}
          quantity={quantity}
          onContinue={handleAddressContinue}
        />
      )}

      {currentStep === 2 && (
        <PaymentPage
          orderDetails={orderDetails}
          onBack={handlePaymentBack}
          onConfirm={handlePaymentConfirm}
        />
      )}

      {currentStep === 3 && <ConfirmationPage orderDetails={orderDetails} />}
    </>
  );
};

export default CheckoutFlow;
