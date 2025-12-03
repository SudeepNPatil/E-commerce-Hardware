import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  Calendar,
  MapPin,
  User,
  Phone,
  CreditCard,
  Download,
  ArrowRight,
  Star,
  ShoppingBag,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmationPage = ({ orderDetails }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide animation after 3 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    // Hide confetti after 4 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days from now
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const generateOrderId = () => {
    return `ORD${Date.now().toString().slice(-8)}`;
  };

  const orderId = generateOrderId();
  const estimatedDelivery = getEstimatedDelivery();

  const total = orderDetails?.product
    ? parseInt(orderDetails.product.price.replace(/,/g, '')) *
        orderDetails.quantity +
      (orderDetails.technician ? 999 : 0) +
      (orderDetails.payment?.method === 'cod' ? 50 : 0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-3 h-3 ${
                  [
                    'bg-red-500',
                    'bg-blue-500',
                    'bg-yellow-400',
                    'bg-green-500',
                    'bg-purple-500',
                  ][Math.floor(Math.random() * 5)]
                }`}
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-3xl p-12 text-center animate-scale-in shadow-2xl">
            <div className="relative">
              <div className="w-32 h-32 bg-green-500 rounded-full mx-auto flex items-center justify-center animate-bounce-in">
                <CheckCircle className="w-20 h-20 text-white animate-check-draw" />
              </div>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-600">
              Your order has been confirmed successfully
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar - All Complete */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="ml-2 font-semibold text-gray-900">Address</span>
            </div>
            <div className="w-20 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="ml-2 font-semibold text-gray-900">Payment</span>
            </div>
            <div className="w-20 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="ml-2 font-semibold text-gray-900">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Order Confirmed!</h1>
              </div>
              <p className="text-green-100 text-lg mb-4">
                Thank you for your purchase. Your order has been placed
                successfully.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-green-100 text-sm">Order ID</p>
                  <p className="text-2xl font-bold">{orderId}</p>
                </div>
                <div className="h-12 w-px bg-green-400"></div>
                <div>
                  <p className="text-green-100 text-sm">Estimated Delivery</p>
                  <p className="text-xl font-bold">{estimatedDelivery}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                <Package className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Order Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Timeline
              </h2>

              <div className="relative space-y-8">
                {/* Order Placed */}
                <div className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-1 h-full bg-gray-300 absolute top-12"></div>
                  </div>
                  <div className="flex-grow pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        Order Placed
                      </h3>
                      <span className="text-sm text-green-600 font-semibold">
                        Completed
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {new Date().toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>

                {/* Order Confirmed */}
                <div className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-1 h-full bg-gray-300 absolute top-12"></div>
                  </div>
                  <div className="flex-grow pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        Order Confirmed
                      </h3>
                      <span className="text-sm text-green-600 font-semibold">
                        Completed
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Your order has been confirmed and is being processed
                    </p>
                  </div>
                </div>

                {/* Shipped */}
                <div className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center z-10">
                      <Truck className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="w-1 h-full bg-gray-300 absolute top-12"></div>
                  </div>
                  <div className="flex-grow pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-500">
                        Shipped
                      </h3>
                      <span className="text-sm text-gray-400 font-semibold">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      We'll notify you when your order is shipped
                    </p>
                  </div>
                </div>

                {/* Out for Delivery */}
                <div className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center z-10">
                      <Package className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="w-1 h-full bg-gray-300 absolute top-12"></div>
                  </div>
                  <div className="flex-grow pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-500">
                        Out for Delivery
                      </h3>
                      <span className="text-sm text-gray-400 font-semibold">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Your order is on the way
                    </p>
                  </div>
                </div>

                {/* Delivered */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-500">
                        Delivered
                      </h3>
                      <span className="text-sm text-gray-400 font-semibold">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Expected by {estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Details
              </h2>

              {orderDetails?.product && (
                <div className="flex gap-6 border-b border-gray-200 pb-6 mb-6">
                  <img
                    src={orderDetails.product.imageUrls}
                    alt={orderDetails.product.name}
                    className="w-32 h-32 object-contain bg-gray-100 rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {orderDetails.product.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Brand:</span>{' '}
                        {orderDetails.product.brand}
                      </p>
                      <p>
                        <span className="font-semibold">Processor:</span>{' '}
                        {orderDetails.product.processor}
                      </p>
                      <p>
                        <span className="font-semibold">RAM:</span>{' '}
                        {orderDetails.product.ram} |{' '}
                        <span className="font-semibold">Storage:</span>{' '}
                        {orderDetails.product.storage}
                      </p>
                      <p>
                        <span className="font-semibold">Quantity:</span>{' '}
                        {orderDetails.quantity}
                      </p>
                    </div>
                    <div className="mt-3">
                      <span className="text-2xl font-bold text-red-500">
                        ₹{orderDetails.product.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Technician Info */}
              {orderDetails?.technician && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Installation Service Booked
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {orderDetails.technician.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {orderDetails.technician.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.technician.specialization}
                      </p>
                      <p className="text-sm text-yellow-600">
                        ⭐ {orderDetails.technician.rating} rating
                      </p>
                      <p className="text-sm text-green-600">
                        Slot Booked :- {orderDetails.technician.slot.date} @{' '}
                        {orderDetails.technician.slot.time}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3">
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
                {orderDetails?.payment?.method === 'cod' && (
                  <div className="flex justify-between text-gray-700">
                    <span>COD Charges</span>
                    <span className="font-semibold">₹50</span>
                  </div>
                )}
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-red-500">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-gray-900">
                  Delivery Address
                </h3>
              </div>
              {orderDetails?.address && (
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900">
                    {orderDetails.address.fullName}
                  </p>
                  <p>{orderDetails.address.addressLine1}</p>
                  {orderDetails.address.addressLine2 && (
                    <p>{orderDetails.address.addressLine2}</p>
                  )}
                  {orderDetails.address.landmark && (
                    <p>Near {orderDetails.address.landmark}</p>
                  )}
                  <p>
                    {orderDetails.address.city}, {orderDetails.address.state}
                  </p>
                  <p>PIN: {orderDetails.address.pincode}</p>
                  <p className="flex items-center gap-1 mt-2">
                    <Phone className="w-4 h-4" />
                    {orderDetails.address.phoneNumber}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-900">
                  Payment Method
                </h3>
              </div>
              {orderDetails?.payment && (
                <div>
                  <p className="text-gray-700 font-semibold capitalize">
                    {orderDetails.payment.method === 'cod'
                      ? 'Cash on Delivery'
                      : orderDetails.payment.method === 'card'
                      ? 'Credit/Debit Card'
                      : orderDetails.payment.method === 'upi'
                      ? 'UPI'
                      : 'Net Banking'}
                  </p>
                  {orderDetails.payment.method === 'cod' && (
                    <p className="text-sm text-gray-600 mt-2">
                      Pay when you receive your order
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => window.print()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </button>
              <button
                onClick={() => navigate('/Products')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </button>
              <Link
                to={`/Orders`}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                View All Orders
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Promotional Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <Star className="w-8 h-8 mb-3" />
              <h4 className="font-bold text-lg mb-2">Rate Your Experience</h4>
              <p className="text-sm text-purple-100 mb-4">
                Help us serve you better by sharing your feedback
              </p>
              <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-purple-50 transition-all duration-300">
                Rate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dasharray: 0, 100;
          }
          100% {
            stroke-dasharray: 100, 100;
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-check-draw {
          animation: check-draw 0.5s ease-out 0.3s;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationPage;
