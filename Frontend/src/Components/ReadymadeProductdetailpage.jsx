import { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const baseurl = `${import.meta.env.VITE_API_URL}`;

// Import your data
import {
  professionalLaptops,
  developmentLaptops,
  gamingLaptops,
  Generateuse,
} from '../data/readymade_Product.js';
import { useCartContext } from '../Context/CartContext.jsx';
import { useWishlistContext } from '../Context/WishlistContext.jsx';
import ModalMediam from '../modals/ModalMediam.jsx';
import { useLogincontext } from '../Context/LoginContext.jsx';
import ModalLogin from '../modals/ModalLogin.jsx';
import { MdError } from 'react-icons/md';

const ReadymadeProductDetailPage = () => {
  const { type, id } = useParams();
  const { Cartitem, addToCart } = useCartContext();
  const { logindata } = useLogincontext();
  const navigate = useNavigate();
  const { addToWishlist } = useWishlistContext();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [loginmodal, setloginmodal] = useState(false);

  useEffect(() => {
    // Find product based on type and id
    fetch(`${baseurl}/products/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setProduct(data.product);
        setSelectedImage(data.product.imageUrls || data.product.imageUrl);
      });
  }, [type, id]);

  const [modal, setmodal] = useState(false);

  const handleAddToCart = (data) => {
    if (!localStorage.getItem('token')) {
      setloginmodal(true);
      return;
    }
    setmodal(true);
    addToCart(data);
  };

  const handleBuyNow = (product) => {
    if (!localStorage.getItem('token')) {
      setloginmodal(true);
      return;
    }
    navigate('/Checkout', { state: product });
  };

  const toggleWishlist = (data) => {
    addToWishlist(data);
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', !isWishlisted);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-red-500 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-red-500 cursor-pointer capitalize">
            {type}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isWishlisted
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <div className="absolute bottom-4 left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.5)</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-6 rounded-xl border-2 border-red-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-red-500">
                    ₹{product.price}
                  </span>
                  <span className="text-gray-500 line-through text-lg">
                    ₹
                    {(
                      parseInt(product.price.replace(/,/g, '')) * 1.2
                    ).toLocaleString('en-IN')}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    20% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Specifications */}
              <div className="border border-gray-200 rounded-xl p-6 space-y-3">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <SpecItem label="Processor" value={product.processor} />
                  <SpecItem label="RAM" value={product.ram} />
                  <SpecItem label="Storage" value={product.storage} />
                  <SpecItem label="GPU" value={product.gpu} />
                  <SpecItem label="Display" value={product.display} />
                  <SpecItem label="OS" value={product.os} />
                  {product.battery !== 'N/A (Tower PC)' && (
                    <SpecItem label="Battery" value={product.battery} />
                  )}
                  <SpecItem label="Weight" value={product.weight} />
                </div>
              </div>

              {/* Features */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product?.features?.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-lg border-x-2 border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Warranty & Services */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <ServiceBadge
                  icon={<Truck className="w-6 h-6" />}
                  text="Free Delivery"
                />
                <ServiceBadge
                  icon={<Shield className="w-6 h-6" />}
                  text={product.warranty}
                />
                <ServiceBadge
                  icon={<RotateCcw className="w-6 h-6" />}
                  text="7 Days Return"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalMediam isOpen={modal} onClose={() => setmodal(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Product Added to Cart!
          </h2>
          <p className="text-gray-500 mb-6">
            Your item has been successfully added to your cart.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/Cart')}
              className="px-14 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-md transition-all"
            >
              View Cart
            </button>
            <button
              onClick={() => setmodal(false)}
              className="px-5 py-2 rounded-lg bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 shadow-md transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </ModalMediam>

      <ModalLogin isOpen={loginmodal} onClose={() => setloginmodal(false)}>
        <div className="flex flex-col justify-center items-center gap-2">
          <MdError size={60} className="text-center text-red-600" />
          <h1 className="text-center text-2xl text-black font-semibold">
            Your are not loged in yet !
          </h1>
          <p className="text-gray-700 text-center">
            You need login to add to cart and order your products , please login
            and continue.
          </p>
          <Link
            to={`/login`}
            className="text-white text-center bg-red-500 w-full py-2 mt-2 hover:bg-red-300 hover:text-red-500 hover:font-semibold rounded-xl"
          >
            Login
          </Link>
        </div>
      </ModalLogin>
    </div>
  );
};

const SpecItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);

const ServiceBadge = ({ icon, text }) => (
  <div className="flex flex-col items-center text-center gap-2 p-3 bg-gray-50 rounded-lg">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs font-medium text-gray-700">{text}</p>
  </div>
);

export default ReadymadeProductDetailPage;
