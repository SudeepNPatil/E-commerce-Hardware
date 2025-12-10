import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Wrench,
  CreditCard,
  Download,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { useCustomOrderContext } from '../Context/CustomOrderContext.jsx';
import { Link } from 'react-router-dom';
import { useLogincontext } from '../Context/LoginContext.jsx';

const baseurl = `${import.meta.env.VITE_API_URL}`;

const CustomConfirmationPage = ({
  orderId,
  address,
  technician,
  paymentMethod,
  cartItems,
  totalAmount,
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { CustomaddToOrder } = useCustomOrderContext();
  const { logindata } = useLogincontext();

  // Generate order ID and dates
  // const orderId = orderId?.orderId || `0`;
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

  const estimatedDelivery = getEstimatedDelivery();
  let orderedOn = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  useEffect(() => {
    // Create the order object
    const newOrder = {
      orderId,
      address,
      technician,
      payment: paymentMethod,
      cartItems,
      totalAmount,
      orderedOn: orderedOn,
      estimatedDelivery: estimatedDelivery,
    };

    // Add it to context

    let fullorderdetails = {
      ...newOrder,
      userId: logindata.user._id,
      status: 'placed',
    };

    CustomaddToOrder(fullorderdetails);

    fetch(`${baseurl}/CustomOrders/save-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullorderdetails),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const assemblyDate =
    technician !== 'skip'
      ? technician.slot.date + technician.slot.time // 1 day after delivery
      : null;

  // Animation sequence
  useEffect(() => {
    setShowConfetti(true);
    const timer1 = setTimeout(() => setAnimationStep(1), 300);
    const timer2 = setTimeout(() => setAnimationStep(2), 600);
    const timer3 = setTimeout(() => setAnimationStep(3), 900);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(confettiTimer);
    };
  }, []);

  // Order tracking steps
  const trackingSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully',
      icon: CheckCircle,
      status: 'completed',
    },
    {
      id: 2,
      title: 'Processing',
      description: 'Components are being prepared for shipment',
      icon: Package,
      status: 'active',
    },
    {
      id: 3,
      title: 'Shipped',
      description: 'Your order is on the way',
      icon: Truck,
      status: 'pending',
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Components delivered to your address',
      icon: Home,
      status: 'pending',
    },
  ];

  if (technician !== 'skip') {
    trackingSteps.push({
      id: 5,
      title: 'Assembly',
      description: `${technician?.name || 'Technician'} will assemble your PC`,
      icon: Wrench,
      status: 'pending',
      /* estimatedDate: assemblyDate?.toLocaleDateString(), */
    });
  }

  return (
    <div className="space-y-6 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                width: '10px',
                height: '10px',
                backgroundColor: [
                  '#EF4444',
                  '#3B82F6',
                  '#10B981',
                  '#F59E0B',
                  '#8B5CF6',
                ][i % 5],
                borderRadius: '50%',
                animation: `fall ${2 + Math.random() * 2}s linear`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Success Message with Animation */}
      <div
        className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-green-500 text-center transition-all duration-500 ${
          animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle size={50} className="text-white" />
          </div>
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
        </div>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Thank you for your purchase. Your custom PC build is on its way!
        </p>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Order ID</span>
            <span className="text-xl font-bold text-gray-800">{orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Order Date</span>
            <span className="text-sm font-semibold text-gray-800">
              {orderedOn}
            </span>
          </div>
        </div>

        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
          >
            <Download size={18} />
            Download Invoice
          </button>
          <button
            onClick={() => window.open()}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition shadow-md"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      {/* Order Tracking */}
      <div
        className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 transition-all duration-500 delay-200 ${
          animationStep >= 2 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order Tracking</h2>
            <p className="text-sm text-gray-600">
              Track your order status in real-time
            </p>
          </div>
        </div>

        <div className="relative">
          {trackingSteps?.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div key={step.id} className="flex gap-4 relative">
                {/* Timeline Line */}
                {index < trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-6 top-16 w-0.5 h-20 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}

                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg'
                      : isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg animate-pulse'
                      : 'bg-gray-200'
                  }`}
                >
                  <Icon
                    size={24}
                    className={
                      isCompleted || isActive ? 'text-white' : 'text-gray-400'
                    }
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pb-8 ${
                    isCompleted || isActive ? '' : 'opacity-60'
                  }`}
                >
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      {step?.date && (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <Calendar size={14} />
                          {step?.date}
                        </span>
                      )}
                      {step?.time && (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <Clock size={14} />
                          {step?.time}
                        </span>
                      )}
                      {step?.estimatedDate && !step.date && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <Calendar size={14} />
                          Est. {step?.estimatedDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery & Assembly Information */}
      <div
        className={`grid grid-cols-2 gap-6 transition-all duration-500 delay-300 ${
          animationStep >= 3 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Delivery Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Truck className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Delivery Details
            </h3>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-orange-600" size={18} />
                <span className="font-semibold text-gray-800">
                  Expected Delivery
                </span>
              </div>
              <p className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {estimatedDelivery}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin
                  className="text-gray-400 mt-1 flex-shrink-0"
                  size={16}
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">
                    Delivery Address
                  </p>
                  <p className="text-gray-600">{address?.fullName}</p>
                  <p className="text-gray-600">{address?.address}</p>
                  <p className="text-gray-600">
                    {address?.city}, {address?.state} - {address?.pincode}
                  </p>
                  {address?.landmark && (
                    <p className="text-gray-500 text-xs">
                      Landmark: {address.landmark}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="text-gray-400 flex-shrink-0" size={16} />
                <span className="text-gray-600">{address?.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="text-gray-400 flex-shrink-0" size={16} />
                <span className="text-gray-600">{address?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assembly Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Wrench className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Assembly Service
            </h3>
          </div>

          {technician === 'skip' ? (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-1">Self Assembly</h4>
              <p className="text-sm text-gray-600">
                You've chosen to assemble the PC yourself
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-green-600" size={18} />
                  <span className="font-semibold text-gray-800">
                    Assembly Scheduled
                  </span>
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {technician?.slot.date}
                </p>
                <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {technician?.slot.time}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={technician?.image}
                    alt={technician?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">
                      {technician?.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {technician?.specialization}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="font-bold text-sm text-gray-800">
                      ⭐ {technician?.rating}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-bold text-sm text-gray-800">
                      {technician?.experience}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Fee</p>
                    <p className="font-bold text-sm text-green-600">
                      ₹{technician?.price}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            <p className="text-sm text-gray-600">
              {cartItems?.length || 0} items in your build
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200"
            >
              <img
                src={item.imageUrls || item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
              <p className="text-sm font-bold text-gray-800">
                ₹{item.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-semibold text-gray-800">
              ₹
              {(
                totalAmount -
                (technician !== 'skip' ? technician?.price || 0 : 0)
              ).toLocaleString()}
            </span>
          </div>

          {technician !== 'skip' && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Assembly Service</span>
              <span className="font-semibold text-green-600">
                ₹{technician?.price?.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Payment Method</span>
            <span className="font-semibold text-gray-800 flex items-center gap-2">
              <CreditCard size={16} />
              {paymentMethod?.method === 'cod'
                ? 'Cash on Delivery'
                : paymentMethod?.method === 'card'
                ? 'Card Payment'
                : paymentMethod?.method === 'upi'
                ? 'UPI Payment'
                : 'COD'}
            </span>
          </div>

          <div className="flex justify-between items-center text-xl font-bold pt-3 border-t-2">
            <span className="text-gray-800">Total Amount</span>
            <span className="text-3xl bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              ₹{totalAmount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        to={`/Orders`}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-2"
      >
        View Orders
        <ChevronRight size={24} />
      </Link>
    </div>
  );
};

export default CustomConfirmationPage;
