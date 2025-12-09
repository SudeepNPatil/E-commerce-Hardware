import React, { useState } from 'react';
import {
  CreditCard,
  Wallet,
  Banknote,
  Building2,
  ArrowLeft,
  ArrowRight,
  Check,
  Shield,
  Lock,
} from 'lucide-react';

const PaymentPage = ({ orderDetails, onBack, onConfirm }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Banknote className="w-6 h-6" />,
      description: 'Pay when you receive the product',
      color: 'green',
      recommended: true,
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Visa, MasterCard, Rupay',
      color: 'blue',
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <Wallet className="w-6 h-6" />,
      description: 'GPay, PhonePe, Paytm',
      color: 'yellow',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Building2 className="w-6 h-6" />,
      description: 'All major banks',
      color: 'red',
    },
  ];

  // Generate Order ID
  const generateOrderId = () => {
    return `ORD${Date.now().toString().slice(-8)}`;
  };

  // Estimated Delivery: 5 days from today
  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const orderId = generateOrderId();
  const estimatedDelivery = getEstimatedDelivery();
  let orderedOn = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const validateCardDetails = () => {
    const newErrors = {};
    if (
      !cardDetails.cardNumber ||
      cardDetails.cardNumber.replace(/\s/g, '').length !== 16
    ) {
      newErrors.cardNumber = 'Enter valid 16-digit card number';
    }
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = 'Card holder name is required';
    }
    if (
      !cardDetails.expiryDate ||
      !/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)
    ) {
      newErrors.expiryDate = 'Enter valid expiry date (MM/YY)';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      newErrors.cvv = 'Enter valid 3-digit CVV';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUPI = () => {
    const newErrors = {};
    if (!upiId || !upiId.includes('@')) {
      newErrors.upiId = 'Enter valid UPI ID';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    // Validate based on payment method
    if (selectedPaymentMethod === 'card' && !validateCardDetails()) {
      alert('Please fill all card details correctly');
      return;
    }
    if (selectedPaymentMethod === 'upi' && !validateUPI()) {
      alert('Please enter valid UPI ID');
      return;
    }

    const paymentInfo = {
      method: selectedPaymentMethod,
      details:
        selectedPaymentMethod === 'card'
          ? cardDetails
          : selectedPaymentMethod === 'upi'
          ? { upiId }
          : null,
      timestamp: new Date().toISOString(),
    };

    console.log('Payment Info:', paymentInfo);
    console.log('Complete Order:', {
      ...orderDetails,
      payment: paymentInfo,
      orderId: orderId,
      estimatedDelivery: estimatedDelivery,
      orderedOn: orderedOn,
    });

    // Simulate payment processing
    if (selectedPaymentMethod === 'cod') {
      if (onConfirm) {
        onConfirm({
          ...orderDetails,
          payment: paymentInfo,
          orderId: orderId,
          estimatedDelivery: estimatedDelivery,
          orderedOn: orderedOn,
        });
      }
    } else {
      // Simulate payment gateway
      alert('Processing payment... (This is a dummy payment gateway)');
      setTimeout(() => {
        alert('Payment Successful!');
        if (onConfirm) {
          onConfirm({
            ...orderDetails,
            payment: paymentInfo,
            orderId: orderId,
            estimatedDelivery: estimatedDelivery,
            orderedOn: orderedOn,
          });
        }
      }, 1500);
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const total = orderDetails?.product
    ? parseInt(orderDetails.product.price.replace(/,/g, '')) *
        orderDetails.quantity +
      (orderDetails.technician ? 999 : 0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                <Check className="w-6 h-6" />
              </div>
              <span className="ml-2 font-semibold text-gray-900">Address</span>
            </div>
            <div className="w-20 h-1 bg-red-500"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="ml-2 font-semibold text-gray-900">Payment</span>
            </div>
            <div className="w-20 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                3
              </div>
              <span className="ml-2 font-semibold text-gray-500">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Select Payment Method
                </h2>
                <Lock className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 relative ${
                      selectedPaymentMethod === method.id
                        ? `border-${method.color}-500 bg-${method.color}-50`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 bg-${method.color}-500  rounded-full flex items-center justify-center text-white`}
                      >
                        {method.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {method.name}
                          </h3>
                          {method.recommended && (
                            <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <div
                          className={`bg-${method.color}-500 text-white p-1 rounded-full`}
                        >
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Details Form */}
              {selectedPaymentMethod === 'card' && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Enter Card Details
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(
                          e.target.value.replace(/\D/g, '').slice(0, 16)
                        );
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: formatted,
                        });
                        if (errors.cardNumber)
                          setErrors({ ...errors, cardNumber: '' });
                      }}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardName}
                      onChange={(e) => {
                        setCardDetails({
                          ...cardDetails,
                          cardName: e.target.value,
                        });
                        if (errors.cardName)
                          setErrors({ ...errors, cardName: '' });
                      }}
                      placeholder="Name on card"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setCardDetails({
                            ...cardDetails,
                            expiryDate: formatted,
                          });
                          if (errors.expiryDate)
                            setErrors({ ...errors, expiryDate: '' });
                        }}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                          errors.expiryDate
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => {
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 3),
                          });
                          if (errors.cvv) setErrors({ ...errors, cvv: '' });
                        }}
                        placeholder="123"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'upi' && (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Enter UPI ID</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPI ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        if (errors.upiId) setErrors({ ...errors, upiId: '' });
                      }}
                      placeholder="yourname@upi"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-purple-500 ${
                        errors.upiId ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.upiId && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.upiId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'netbanking' && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Select Your Bank
                  </h3>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {selectedPaymentMethod === 'cod' && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white p-2 rounded-full">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Cash on Delivery
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Pay with cash when your order is delivered to your
                        doorstep.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• No advance payment required</li>
                        <li>• Inspect product before payment</li>
                        <li>• Safe and convenient</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              {orderDetails?.product && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex gap-3">
                    <img
                      src={
                        orderDetails.product.imageUrls ||
                        orderDetails.product.imageUrl
                      }
                      alt={orderDetails.product.name}
                      className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {orderDetails.product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Qty: {orderDetails.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Product Total</span>
                  <span className="font-semibold">
                    ₹
                    {orderDetails?.product
                      ? (
                          parseInt(
                            orderDetails.product.price.replace(/,/g, '')
                          ) * orderDetails.quantity
                        ).toLocaleString('en-IN')
                      : '0'}
                  </span>
                </div>
                {orderDetails?.technician && (
                  <div className="flex justify-between text-gray-700">
                    <span>Installation Service</span>
                    <span className="font-semibold">₹999</span>
                  </div>
                )}
                {selectedPaymentMethod === 'cod' && (
                  <div className="flex justify-between text-amber-600">
                    <span>COD Charges</span>
                    <span className="font-semibold">₹50</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    ₹
                    {(
                      total + (selectedPaymentMethod === 'cod' ? 50 : 0)
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              {orderDetails?.address && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Delivery Address
                  </h4>
                  <p className="text-sm text-gray-700">
                    {orderDetails.address.fullName}
                    <br />
                    {orderDetails.address.addressLine1},{' '}
                    {orderDetails.address.addressLine2}
                    <br />
                    {orderDetails.address.city}, {orderDetails.address.state} -{' '}
                    {orderDetails.address.pincode}
                    <br />
                    Phone: {orderDetails.address.phoneNumber}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handlePayment}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  {selectedPaymentMethod === 'cod'
                    ? 'Place Order'
                    : 'Proceed to Pay'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onBack}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Address
                </button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Secure & Safe Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
