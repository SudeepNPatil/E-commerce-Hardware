import React, { useState } from 'react';
import {
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Tag,
  Percent,
} from 'lucide-react';
import { useCartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { Cartitem, RemoveCartItem, clearcart } = useCartContext();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(
    Cartitem.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  const getItemPrice = (item) => {
    return parseInt(item.price.replace(/,/g, ''));
  };

  const calculateSubtotal = () => {
    return Cartitem.reduce((total, item) => {
      return total + getItemPrice(item) * (quantities[item.id] || 1);
    }, 0);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10 });
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setAppliedCoupon({ code: 'SAVE20', discount: 20 });
    } else {
      alert('Invalid coupon code!');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const subtotal = calculateSubtotal();
  const discount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const tax = (subtotal - discount) * 0.18; // 18% GST
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal - discount + tax + shipping;

  const handleCheckout = () => {
    if (Cartitem.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    console.log('Proceeding to checkout:', {
      items: Cartitem,
      quantities,
      total,
      appliedCoupon,
    });

    navigate('/Checkout', { state: Cartitem[0] });
  };

  if (Cartitem.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                You have {Cartitem.length} item
                {Cartitem.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <button
              onClick={clearcart}
              className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {Cartitem.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.imageUrls}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                            {item.brand}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mt-2">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => RemoveCartItem(item)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Specs */}
                      <div className="text-sm text-gray-600 mb-4 space-y-1">
                        <p>
                          <span className="font-semibold">Processor:</span>{' '}
                          {item.processor}
                        </p>
                        <p>
                          <span className="font-semibold">RAM:</span> {item.ram}{' '}
                          | <span className="font-semibold">Storage:</span>{' '}
                          {item.storage}
                        </p>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            Quantity:
                          </span>
                          <div className="flex items-center border-2 border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-1 font-bold border-x-2 border-gray-300">
                              {quantities[item.id] || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-500">
                            ₹
                            {(
                              getItemPrice(item) * (quantities[item.id] || 1)
                            ).toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{getItemPrice(item).toLocaleString('en-IN')} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-red-500" />
                Order Summary
              </h2>

              {/* Coupon Section */}
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-gray-800">
                    Have a coupon?
                  </span>
                </div>
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter code"
                      className="flex-grow px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Percent className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-700">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-sm text-green-600">
                        (-{appliedCoupon.discount}%)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  Try: SAVE10 or SAVE20
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span className="font-semibold">
                      -₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>GST (18%)</span>
                  <span className="font-semibold">
                    ₹{tax.toFixed(0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {shipping !== 0 && (
                  <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                    Add ₹{(50000 - subtotal).toLocaleString('en-IN')} more for
                    FREE shipping!
                  </p>
                )}

                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-red-500">
                      ₹{total.toFixed(0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free returns within 7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>1 Year warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
