import React, { useState } from 'react';
import {
  CreditCard,
  Wallet,
  Banknote,
  ChevronRight,
  ArrowLeft,
  Shield,
  CheckCircle,
} from 'lucide-react';

const CustomPaymentPage = ({ onSubmit, onBack, orderTotal }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod'); // Default to Cash on Delivery
  const [paymentDetails, setPaymentDetails] = useState({
    // Card payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // UPI
    upiId: '',
  });

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when you receive your order',
      color: 'green',
      recommended: true,
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay accepted',
      color: 'blue',
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Wallet,
      description: 'Google Pay, PhonePe, Paytm',
      color: 'purple',
    },
  ];

  const colorSchemes = {
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-500',
      text: 'text-green-600',
      button: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-600',
      button: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-500',
      text: 'text-purple-600',
      button: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardNumberInput = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setPaymentDetails((prev) => ({
      ...prev,
      cardNumber: value,
    }));
  };

  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setPaymentDetails((prev) => ({
      ...prev,
      expiryDate: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedPaymentMethod === 'card') {
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.cardName ||
        !paymentDetails.expiryDate ||
        !paymentDetails.cvv
      ) {
        alert('Please fill all card details');
        return;
      }
    }

    if (selectedPaymentMethod === 'upi') {
      if (!paymentDetails.upiId) {
        alert('Please enter UPI ID');
        return;
      }
    }

    onSubmit({
      method: selectedPaymentMethod,
      details: paymentDetails,
    });
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <CreditCard className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Select Payment Method
            </h2>
            <p className="text-sm text-gray-600">
              Choose how you'd like to pay for your order
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const scheme = colorSchemes[method.color];
            return (
              <div
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`border-2 rounded-xl p-5 cursor-pointer transition-all relative ${
                  selectedPaymentMethod === method.id
                    ? `${scheme.border} ${scheme.bg} shadow-lg`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {method.recommended && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Recommended
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 ${scheme.button} rounded-xl flex items-center justify-center shadow-md`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {method.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <div className="bg-green-500 text-white rounded-full p-1.5">
                      <CheckCircle size={24} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Details Forms */}
      {selectedPaymentMethod === 'cod' && (
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Banknote className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Cash on Delivery Selected
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                You will pay ₹{orderTotal?.toLocaleString() || '0'} in cash when
                your order is delivered to your doorstep.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Shield size={16} className="text-green-600" />
                  Things to Remember:
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Please keep exact change ready</li>
                  <li>• Inspect the package before payment</li>
                  <li>• No additional charges for COD</li>
                  <li>• Payment accepted in cash only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPaymentMethod === 'card' && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Card Details</h2>
              <p className="text-sm text-gray-600">
                Enter your card information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleCardNumberInput}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="JOHN DOE"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleExpiryInput}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-2">
              <Shield
                className="text-blue-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-xs text-gray-700">
                Your card information is encrypted and secure. We do not store
                your card details.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedPaymentMethod === 'upi' && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">UPI Payment</h2>
              <p className="text-sm text-gray-600">Enter your UPI ID</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                UPI ID *
              </label>
              <input
                type="text"
                name="upiId"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                placeholder="yourname@paytm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Example: yourname@paytm, yourname@phonepe, yourname@googlepay
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                Supported UPI Apps:
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay', 'BHIM'].map(
                  (app) => (
                    <span
                      key={app}
                      className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-purple-200"
                    >
                      {app}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-2">
              <Shield
                className="text-purple-600 flex-shrink-0 mt-0.5"
                size={18}
              />
              <p className="text-xs text-gray-700">
                You will be redirected to your UPI app to complete the payment
                securely.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2"
        >
          <ArrowLeft size={24} />
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-2"
        >
          Complete Order
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CustomPaymentPage;
