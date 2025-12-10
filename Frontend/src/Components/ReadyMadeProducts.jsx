import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Laptop,
  Cpu,
  HardDrive,
  Monitor,
} from 'lucide-react';
import { useProductTypeContext } from '../Context/ProductTypeContext.jsx';
import { useCartContext } from '../Context/CartContext.jsx';
import ModalMediam from '../modals/ModalMediam.jsx';
import ModalLogin from '../modals/ModalLogin.jsx';
import { MdError } from 'react-icons/md';

const baseurl = `${import.meta.env.VITE_API_URL}`;

export default function ReadyMadeProducts({ purpose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [selectedPurpose, setSelectedPurpose] = useState(purpose || 'general');
  const { setProductType, ProductType } = useProductTypeContext();
  const { addToCart } = useCartContext();
  const [modal, setmodal] = useState(false);
  const [loginmodal, setloginmodal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(`${baseurl}/products/laptop/${selectedPurpose}`)
      .then((data) => data.json())
      .then((data) => setAllProducts(data.products));
  }, [selectedPurpose]);

  // Unique brands list
  const brands = useMemo(() => {
    return ['All', ...new Set(allProducts.map((p) => p.brand).filter(Boolean))];
  }, [allProducts]);

  // Price range filters
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹50,000', min: 0, max: 50000 },
    { label: '₹50,000 - ₹80,000', min: 50000, max: 80000 },
    { label: '₹80,000 - ₹1,20,000', min: 80000, max: 120000 },
    { label: 'Above ₹1,20,000', min: 120000, max: Infinity },
  ];

  // Filter logic (safe checks for missing data)
  const filteredProducts = useMemo(() => {
    const selectedRange = priceRanges.find((r) => r.label === priceRange);
    return allProducts.filter((product) => {
      const name = product.name?.toLowerCase() || '';
      const brand = product.brand?.toLowerCase() || '';
      const processor = product.processor?.toLowerCase() || '';
      const price = Number(product.price) || 0;

      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) ||
        brand.includes(searchQuery.toLowerCase()) ||
        processor.includes(searchQuery.toLowerCase());

      const matchesBrand =
        selectedBrand === 'All' || product.brand === selectedBrand;

      const matchesPrice =
        price >= selectedRange.min && price <= selectedRange.max;

      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [allProducts, searchQuery, selectedBrand, priceRange]);

  // Purpose title & color
  const purposeTitles = {
    gaming: 'Gaming Laptops & Desktops',
    professional: 'Professional Laptops & Desktops',
    development: 'Development Laptops & Desktops',
    general: 'General Use Laptops & Desktops',
  };
  const getPurposeTitle = () =>
    purposeTitles[selectedPurpose] || 'Laptops & Desktops';

  const purposeColors = {
    gaming: { bg: 'from-red-500 to-red-600', badge: 'bg-red-500' },
    professional: { bg: 'from-blue-500 to-blue-600', badge: 'bg-blue-500' },
    development: {
      bg: 'from-yellow-500 to-yellow-600',
      badge: 'bg-yellow-600',
    },
    general: { bg: 'from-green-500 to-green-600', badge: 'bg-green-500' },
  };
  const purposeColor = purposeColors[selectedPurpose] || purposeColors.general;

  // Product card
  const ProductCard = ({ product }) => {
    const imgSrc =
      Array.isArray(product.imageUrls) && product.imageUrls.length > 0
        ? product.imageUrls[0] || product.imageUrl
        : typeof product.imageUrls || product.imageUrl === 'string'
        ? product.imageUrls || product.imageUrl
        : 'https://via.placeholder.com/300x200?text=No+Image';

    const handleaddtocart = (product) => {
      let token = localStorage.getItem('token');
      if (token) {
        addToCart(product);
        setmodal(true);
      } else {
        setloginmodal(true);
      }
    };

    return (
      <Link
        to={`/Products/${product?.subcategory}/${product?._id}`}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
      >
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <img
            src={imgSrc}
            alt={product.name || 'Laptop'}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            {product.subcategory && (
              <span
                className={`${purposeColor.badge} text-white px-3 py-1 rounded-full text-xs font-semibold`}
              >
                {product.subcategory}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            {product.brand && (
              <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                {product.brand}
              </span>
            )}
            {product.category && (
              <span className="text-xs text-gray-500">{product.category}</span>
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
            {product.name || 'Unnamed Product'}
          </h3>

          <div className="space-y-2 mb-4">
            {product.processor && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Cpu size={16} className="text-red-500" />
                <span className="font-medium">{product.processor}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <HardDrive size={16} className="text-blue-500" />
              <span>
                {product.ram || 'N/A'} | {product.storage || 'N/A'}
              </span>
            </div>

            {product.display && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Monitor size={16} className="text-yellow-600" />
                <span className="line-clamp-1">{product.display}</span>
              </div>
            )}

            {product.gpu && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">GPU:</span> {product.gpu}
              </p>
            )}
          </div>

          {product.features?.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.warranty && (
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span>{product.warranty}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-2xl font-bold text-red-500">
              ₹{product?.price || 0}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(),
                  e.preventDefault(),
                  handleaddtocart(product);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md"
            >
              <ShoppingCart size={18} />
              Add
            </button>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      <div
        className={`bg-gradient-to-r ${purposeColor.bg} text-white py-12 px-4 relative`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Title Section */}
          <div className="flex items-center gap-4">
            <Laptop size={40} />
            <div>
              <h1 className="text-4xl font-bold">{getPurposeTitle()}</h1>
              <p className="text-white text-opacity-90">
                Specially curated for your {selectedPurpose} needs
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <select
              value={ProductType}
              onChange={(e) => setProductType(e.target.value)}
              id="info"
              className=" outline-none text-black bg-white rounded-md px-7 py-2"
            >
              <option value="readymade">Readymade</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, brand, or processor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-white"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand === 'All' ? 'All Brands' : brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-white"
              >
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
              >
                <option className="text-black" value="gaming">
                  Gaming Laptops & Pc
                </option>
                <option className="text-black" value="professional">
                  Professional Laptops & Pc
                </option>
                <option className="text-black" value="development">
                  Development Laptops & Pc
                </option>
                <option className="text-black" value="general">
                  General Laptops & Pc
                </option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-sm text-gray-600 font-semibold">
              Active Filters:
            </span>
            <span
              className={`${purposeColor.badge} text-white px-3 py-1 rounded-full text-sm font-medium`}
            >
              {getPurposeTitle()}
            </span>
            {selectedBrand !== 'All' && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {selectedBrand}
              </span>
            )}
            {priceRange !== 'All' && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                {priceRange}
              </span>
            )}
            {searchQuery && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Search: "{searchQuery}"
              </span>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold">
            Showing{' '}
            <span className="text-red-500">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.productId || product.name}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Filter className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
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
}
