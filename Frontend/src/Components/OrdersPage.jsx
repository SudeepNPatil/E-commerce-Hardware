import React, { useState } from 'react';
import { useOrderContext } from '../Context/OrderContext';
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  Eye,
  X,
  Download,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
  Phone,
} from 'lucide-react';

const OrdersPage = () => {
  const { Order, RemoveFromOrder } = useOrderContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

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

  const getOrderStatus = (order) => {
    return order?.status || 'placed';
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

    fetch(`http://localhost:5000/readymadeOrders/orders/${selectedOrder._id}`, {
      method: 'DELETE',
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
    RemoveFromOrder(selectedOrder?.product?.id);
    alert('Order cancelled successfully!');
    setShowCancelModal(false);
    setCancelReason('');
    setSelectedOrder(null);
  };

  const TrackingModal = ({ order, onClose }) => {
    const trackingSteps = [
      {
        status: 'placed',
        label: 'Order Placed',
        completed: true,
        date: order.timestamp,
      },
      {
        status: 'confirmed',
        label: 'Order Confirmed',
        completed: true,
        date: order.timestamp,
      },
      { status: 'shipped', label: 'Shipped', completed: false, date: null },
      {
        status: 'outfordelivery',
        label: 'Out for Delivery',
        completed: false,
        date: null,
      },
      { status: 'delivered', label: 'Delivered', completed: false, date: null },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Track Order</h2>
              <p className="text-gray-600 text-sm">
                Order ID: {order?.orderId || 'ORD12345678'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-4 bg-gray-50 rounded-lg p-4 mb-6">
              <img
                src={order.product.imageUrls}
                alt={order.product.name}
                className="w-24 h-24 object-contain bg-white rounded-lg"
              />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {order.product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Qty: {order.quantity}
                </p>
                <p className="text-lg font-bold text-red-500">
                  ₹{order.product.price}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div key={step?.status} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
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
                    <h3
                      className={`text-lg font-bold ${
                        step.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </h3>
                    {step.date && (
                      <p className="text-sm text-gray-600">
                        {new Date(step.date).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    )}
                    {!step.completed && (
                      <p className="text-sm text-gray-500">Pending</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h4 className="font-bold text-gray-900">Delivery Address</h4>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold">{order.address.fullName}</p>
                <p>
                  {order.address.addressLine1}, {order.address.addressLine2}
                </p>
                <p>
                  {order.address.city}, {order.address.state} -{' '}
                  {order.address.pincode}
                </p>
                <p>Phone: {order.address.phoneNumber}</p>
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
                  Order ID: {order?.orderId || 'ORD12345678'}
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

  if (Order.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Orders Yet
          </h2>
          <p className="text-gray-600 mb-8">
            Start shopping to see your orders here!
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-600">
            You have {Order.length} order{Order.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-4">
          {Order.map((order) => {
            const status = getOrderStatus(order);
            const statusInfo = orderStatuses[status];
            const estimatedDelivery = order.estimatedDelivery;
            const totalAmount =
              parseInt(order.product.price.replace(/,/g, '')) * order.quantity +
              (order.technician ? 999 : 0) +
              (order.payment?.method === 'cod' ? 50 : 0);

            return (
              <div
                key={order?.orderId || 'ORD12345678'}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        {statusInfo.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">
                            Order #{order?.orderId || 'ORD12345678'}
                          </h3>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Ordered: {order?.orderedOn || 'not provided'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                            <Truck className="w-4 h-4" />
                            <span>Arrives by: {estimatedDelivery}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-500">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.payment?.method === 'cod'
                          ? 'Cash on Delivery'
                          : order.payment?.method === 'card'
                          ? 'Paid via Card'
                          : order.payment?.method === 'upi'
                          ? 'Paid via UPI'
                          : 'Paid via Net Banking'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 mb-4">
                    <img
                      src={order.product.imageUrls}
                      alt={order.product.name}
                      className="w-32 h-32 object-contain bg-gray-100 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {order.product.name}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <p>
                          <span className="font-semibold">Brand:</span>{' '}
                          {order.product.brand}
                        </p>
                        <p>
                          <span className="font-semibold">Processor:</span>{' '}
                          {order.product.processor}
                        </p>
                        <p>
                          <span className="font-semibold">Quantity:</span>{' '}
                          {order.quantity}
                        </p>
                      </div>
                      {order.technician && (
                        <div className="bg-blue-50 rounded-lg p-2 inline-flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-700 font-semibold">
                            Installation service included
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold text-gray-900 mb-1">
                          Delivery Address
                        </p>
                        <p>{order.address.fullName}</p>
                        <p>
                          {order.address.addressLine1}, {order.address.city} -{' '}
                          {order.address.pincode}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-gray-600">
                          <Phone className="w-3 h-3" />
                          <span>{order.address.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowTrackingModal(true);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Track Order
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Cancel
                      </button>
                    )}
                    {status === 'delivered' && (
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
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

export default OrdersPage;
