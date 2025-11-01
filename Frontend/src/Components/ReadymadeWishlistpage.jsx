import React from 'react';
import { useWishlistContext } from '../Context/WishlistContext.jsx';
import { useCartContext } from '../Context/CartContext.jsx';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowRight,
  Package,
} from 'lucide-react';

const WishlistPage = () => {
  const { WishlistItem, RemoveWishlistItem } = useWishlistContext();
  const { addToCart, Cartitem } = useCartContext();

  const handleMoveToCart = (item) => {
    // Check if item already exists in cart
    const existsInCart = Cartitem.some((cartItem) => cartItem.id === item.id);

    if (existsInCart) {
      alert('Item already in cart!');
    } else {
      addToCart(item);
      RemoveWishlistItem(item);
      alert(`${item.name} moved to cart!`);
    }
  };

  const handleRemoveFromWishlist = (item) => {
    RemoveWishlistItem(item);
  };

  const isInCart = (itemId) => {
    return Cartitem.some((cartItem) => cartItem.id === itemId);
  };

  if (WishlistItem.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items here for later!
          </p>
          <button
            onClick={() => window.history.back()}
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-600">
            You have {WishlistItem.length} item
            {WishlistItem.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WishlistItem.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 h-64 overflow-hidden group">
                <img
                  src={item.imageUrls}
                  alt={item.name}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item)}
                  className="absolute top-4 right-4 bg-white hover:bg-red-50 text-red-500 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-xs shadow-lg">
                  {item.category}
                </div>

                {/* In Cart Badge */}
                {isInCart(item.id) && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    In Cart
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-4">
                {/* Brand & Rating */}
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                  {item.name}
                </h3>

                {/* Key Specs */}
                <div className="space-y-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="font-semibold">CPU:</span>{' '}
                    {item.processor.length > 20
                      ? item.processor.substring(0, 20) + '...'
                      : item.processor}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="font-semibold">RAM:</span> {item.ram} |{' '}
                    <span className="font-semibold">Storage:</span>{' '}
                    {item.storage}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-3 rounded-lg border-2 border-red-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-red-500">
                      ₹{item.price}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ₹
                      {(
                        parseInt(item.price.replace(/,/g, '')) * 1.2
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold inline-block mt-1">
                    20% OFF
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={isInCart(item.id)}
                    className={`flex-1 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform ${
                      isInCart(item.id)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:scale-105 shadow-lg'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart(item.id) ? 'In Cart' : 'Move to Cart'}
                  </button>
                  <button
                    onClick={() => {
                      // Navigate to product detail page
                      window.location.href = `/${item.subcategory}/${item.id}`;
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        {WishlistItem.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Package className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Total Value: ₹
                    {WishlistItem.reduce(
                      (total, item) =>
                        total + parseInt(item.price.replace(/,/g, '')),
                      0
                    ).toLocaleString('en-IN')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    You could save ₹
                    {WishlistItem.reduce(
                      (total, item) =>
                        total + parseInt(item.price.replace(/,/g, '')) * 0.2,
                      0
                    ).toLocaleString('en-IN')}{' '}
                    with current offers!
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  WishlistItem.forEach((item) => {
                    if (!isInCart(item.id)) {
                      addToCart(item);
                    }
                  });
                  alert('All available items moved to cart!');
                  WishlistItem.forEach((item) => {
                    if (!isInCart(item.id)) {
                      RemoveWishlistItem(item);
                    }
                  });
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Move All to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
