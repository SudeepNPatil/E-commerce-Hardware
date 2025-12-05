import React, { useState } from 'react';
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Wrench,
  CreditCard,
  Eye,
  X,
  Download,
  CheckCircle,
  Clock,
  Truck,
  Home,
  AlertCircle,
  ShoppingBag,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import { useCustomOrderContext } from '../Context/CustomOrderContext';
import { Link } from 'react-router-dom';

const CustomOrderPage = () => {
  const { CustomOrder, RemoveFromCustomOrder } = useCustomOrderContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Get order status based on date

  const orderStatuses = {
    placed: {
      icon: <Package className="w-5 h-5" />,
      color: 'blue',
      label: 'Order Placed',
    },
    confirmed: {
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'green',
      label: 'Confirmed',
    },
    shipped: {
      icon: <Truck className="w-5 h-5" />,
      color: 'purple',
      label: 'Shipped',
    },
    outfordelivery: {
      icon: <Truck className="w-5 h-5" />,
      color: 'orange',
      label: 'Out for Delivery',
    },
    delivered: {
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'green',
      label: 'Delivered',
    },
    cancelled: {
      icon: <XCircle className="w-5 h-5" />,
      color: 'red',
      label: 'Cancelled',
    },
  };

  const getEstimatedDelivery = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCancelOrder = () => {
    if (!cancelReason.trim()) {
      alert('Please provide a cancellation reason');
      return;
    }

    fetch(`http://localhost:5000/CustomOrders/orders/${selectedOrder._id}`, {
      method: 'DELETE',
    })
      .then((data) => data.json())
      .then((data) => console.log(data));

    RemoveFromCustomOrder(selectedOrder?.orderId);
    alert('Order cancelled successfully!');
    setShowCancelModal(false);
    setCancelReason('');
    setSelectedOrder(null);
  };

  const TrackingModal = ({ order, onClose }) => {
    const currentStatus = order.status;

    const trackingSteps = [
      {
        status: 'placed',
        label: 'Order Placed',
        completed: [
          'placed',
          'confirmed',
          'shipped',
          'outfordelivery',
          'delivered',
        ].includes(currentStatus),
        date: order.orderedOn,
        icon: <Package className="w-6 h-6" />,
      },
      {
        status: 'confirmed',
        label: 'Order Confirmed',
        completed: [
          'confirmed',
          'shipped',
          'outfordelivery',
          'delivered',
        ].includes(currentStatus),
        date: order.orderedOn,
        icon: <CheckCircle className="w-6 h-6" />,
      },
      {
        status: 'shipped',
        label: 'Shipped',
        completed: ['shipped', 'outfordelivery', 'delivered'].includes(
          currentStatus
        ),
        date: order.orderedOn,
        icon: <Truck className="w-6 h-6" />,
      },
      {
        status: 'outfordelivery',
        label: 'Out for Delivery',
        completed: ['outfordelivery', 'delivered'].includes(currentStatus),
        date: order.orderedOn,
        icon: <Truck className="w-6 h-6" />,
      },
      {
        status: 'delivered',
        label: 'Delivered',
        completed: currentStatus === 'delivered',
        date: order.orderedOn,
        icon: <Home className="w-6 h-6" />,
      },
    ];

    if (order.technician !== 'skip') {
      trackingSteps.push({
        status: 'assembly',
        label: 'Assembly Completed',
        completed: currentStatus === 'delivered',
        date: order.orderedOn,
        icon: <Wrench className="w-6 h-6" />,
      });
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 text-white p-6 flex items-center justify-between z-50 rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold">Track Order</h2>
              <p className="text-sm opacity-90">Order ID: {order.orderId}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Order Items Preview */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Package className="text-blue-500" size={20} />
                Order Items ({order.cartItems?.length || 0})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {order.cartItems?.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 bg-gray-50 rounded-lg p-3"
                  >
                    <img
                      src={item.imageUrls || item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-contain bg-white rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <p className="text-sm font-bold text-red-500">
                        ₹{item.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {order.cartItems?.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    + {order.cartItems.length - 3} more items
                  </p>
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="space-y-6 mb-6">
              <h3 className="font-bold text-gray-800">Order Status</h3>
              {trackingSteps.map((step, index) => (
                <div key={step.status} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                        step.completed
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : currentStatus === step.status
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg animate-pulse'
                          : 'bg-gray-300 text-gray-500'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`w-1 h-16 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="flex-grow pb-4">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200">
                      <h4
                        className={`font-bold ${
                          step.completed || currentStatus === step.status
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </h4>
                      {step.completed && step.date ? (
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          {new Date(step.date).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </p>
                      ) : currentStatus === step.status ? (
                        <p className="text-sm text-blue-600 font-semibold mt-1">
                          In Progress
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">
                          Estimated:{' '}
                          {new Date(step.date).toLocaleDateString('en-IN', {
                            dateStyle: 'medium',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <h4 className="font-bold text-gray-900">Delivery Address</h4>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold">{order.address?.fullName}</p>
                <p>{order.address?.address}</p>
                <p>
                  {order.address?.city}, {order.address?.state} -{' '}
                  {order.address?.pincode}
                </p>
                {order.address?.landmark && (
                  <p className="text-gray-600">
                    Landmark: {order.address.landmark}
                  </p>
                )}
                <div className="flex gap-3 pt-2">
                  <p className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {order.address?.phone}
                  </p>
                  <p className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {order.address?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CancelModal = ({ order, onClose }) => {
    const cancelReasons = [
      'Changed my mind',
      'Found a better price elsewhere',
      'Ordered by mistake',
      'Delivery time too long',
      'Need to change delivery address',
      'Other',
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full">
          <div className="bg-red-500 text-white p-6 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Cancel Order</h2>
                <p className="text-red-100 text-sm">
                  Order ID: {order.orderId}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Reason for cancellation <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {cancelReasons.map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-red-300 cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="cancelReason"
                      value={reason}
                      checked={cancelReason === reason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-4 h-4 text-red-500"
                    />
                    <span className="text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-all duration-300"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!CustomOrder || CustomOrder.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Custom Orders Yet
          </h2>
          <p className="text-gray-600 mb-8">
            Start building your custom PC to see orders here!
          </p>
          <Link
            to={`/Products`}
            className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Build Custom PC
          </Link>
        </div>
      </div>
    );
  }

  console.log(CustomOrder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">Order Details</h1>
          </div>
          <p className="text-gray-600">
            You have {CustomOrder.length} custom build order
            {CustomOrder.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {CustomOrder.map((order) => {
            const status = order.status;
            const statusInfo = orderStatuses[status];

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-4">
                      <div
                        className={`bg-${statusInfo?.color}-100 text-${statusInfo?.color}-600 p-3 rounded-full`}
                      >
                        {statusInfo?.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">
                            Order #{order.orderId}
                          </h3>
                          <span
                            className={`bg-${statusInfo?.color}-100 text-${statusInfo?.color}-700 px-3 py-1 rounded-full text-xs font-bold`}
                          >
                            {statusInfo?.label}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Ordered : {order.orderedOn}</span>
                          </div>
                          {status !== 'delivered' && (
                            <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                              <Truck className="w-4 h-4" />
                              <span>
                                Arrives by : {order.estimatedDelivery}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                        ₹{order.totalAmount?.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center justify-end gap-1">
                        <CreditCard className="w-3 h-3" />
                        {order.payment?.method === 'cod'
                          ? 'Cash on Delivery'
                          : order.payment?.method === 'card'
                          ? 'Paid via Card'
                          : order.payment?.method === 'upi'
                          ? 'Paid via UPI'
                          : 'Payment'}
                      </p>
                    </div>
                  </div>

                  {/* Order Items Grid */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Build Components ({order.cartItems?.length || 0} items)
                    </h4>
                    <div className="grid grid-cols-4 gap-3">
                      {order.cartItems?.slice(0, 4).map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200"
                        >
                          <img
                            src={item.imageUrls || item.imageUrl}
                            alt={item.name}
                            className="w-full h-20 object-contain bg-white rounded-lg mb-2"
                          />
                          <p className="text-xs font-semibold text-gray-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.category}
                          </p>
                          <p className="text-xs font-bold text-red-500">
                            ₹{item.price?.toLocaleString()}
                          </p>
                        </div>
                      ))}
                      {order.cartItems?.length > 4 && (
                        <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center border border-gray-200">
                          <p className="text-sm font-bold text-gray-600">
                            +{order.cartItems.length - 4} more
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address & Assembly Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700">
                          <p className="font-semibold text-gray-900 mb-1">
                            Delivery Address
                          </p>
                          <p className="font-medium">
                            {order.address?.fullName}
                          </p>
                          <p>
                            {order.address?.city}, {order.address?.pincode}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{order.address?.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-start gap-2">
                        <Wrench className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900 mb-1">
                            Assembly Service
                          </p>
                          {order.technician === 'skip' ? (
                            <>
                              <p className="text-yellow-700 font-semibold">
                                Self Assembly
                              </p>
                              <p className="text-xs text-gray-600">
                                Customer will assemble
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-gray-800 font-semibold">
                                {order.technician?.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {order.technician?.specialization}
                              </p>
                              <p className="text-xs text-green-600 font-bold mt-1">
                                ₹{order.technician?.price}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowTrackingModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Eye className="w-5 h-5" />
                      Track Order
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Invoice
                    </button>
                    {status !== 'delivered' && status !== 'cancelled' && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowCancelModal(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <XCircle className="w-5 h-5" />
                        Cancel
                      </button>
                    )}
                    {status === 'delivered' && (
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                        <RefreshCw className="w-5 h-5" />
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showTrackingModal && selectedOrder && (
        <TrackingModal
          order={selectedOrder}
          onClose={() => {
            setShowTrackingModal(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {showCancelModal && selectedOrder && (
        <CancelModal
          order={selectedOrder}
          onClose={() => {
            setShowCancelModal(false);
            setSelectedOrder(null);
            setCancelReason('');
          }}
        />
      )}
    </div>
  );
};

export default CustomOrderPage;
