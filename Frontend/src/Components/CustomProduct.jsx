import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import {
  Processors_CPUs,
  Motherboards,
  RAM,
  storageDevices,
  graphicsCards,
  powerSupplies,
  coolingSystems,
} from '../data/readymade_Product.js';

export default function CustomProduct() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Combine all products with normalized structure
  const allProducts = [
    ...Processors_CPUs.map((p) => ({
      ...p,
      imageUrl: p.imageUrls,
      categoryName: 'Processors & CPUs',
    })),
    ...Motherboards.map((p) => ({
      ...p,
      imageUrl: p.imageUrls,
      categoryName: 'Motherboards',
    })),
    ...RAM.map((p) => ({
      ...p,
      imageUrl: p.imageUrls,
      categoryName: 'RAM Modules',
    })),
    ...storageDevices.map((p) => ({
      ...p,
      categoryName: 'Storage Devices',
    })),
    ...graphicsCards.map((p) => ({
      ...p,
      categoryName: 'Graphics Cards',
    })),
    ...powerSupplies.map((p) => ({
      ...p,
      imageUrl: p.imageUrls || p.imageUrl,
      categoryName: 'Power Supplies',
    })),
    ...coolingSystems.map((p) => ({
      ...p,
      imageUrl: p.imageUrls || p.imageUrl,
      categoryName: 'Cooling Systems',
    })),
  ];

  // Get unique categories
  const categories = [
    'All',
    'Processors & CPUs',
    'Motherboards',
    'RAM Modules',
    'Storage Devices',
    'Graphics Cards',
    'Power Supplies',
    'Cooling Systems',
  ];

  // Get unique brands
  const brands = [
    'All',
    ...new Set(allProducts.map((p) => p.brand).filter(Boolean)),
  ];

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.categoryName === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBrand =
      selectedBrand === 'All' || product.brand === selectedBrand;

    return matchesCategory && matchesSearch && matchesBrand;
  });

  const ProductCard = ({ product }) => (
    <div
      key={product.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {product.availability === 'In Stock' && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            In Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand & Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
            {product.brand}
          </span>
          <span className="text-xs text-gray-500">{product.categoryName}</span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Key Specs - Dynamic based on product type */}
        <div className="space-y-2 mb-4">
          {product.cores && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Cores:</span> {product.cores} /{' '}
              {product.threads} threads
            </p>
          )}
          {product.capacity && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Capacity:</span>{' '}
              {product.capacity}
            </p>
          )}
          {product.vram && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">VRAM:</span> {product.vram}
            </p>
          )}
          {product.socket && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Socket:</span> {product.socket}
            </p>
          )}
          {product.chipset && !product.vram && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Chipset:</span> {product.chipset}
            </p>
          )}
          {product.wattage && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Wattage:</span> {product.wattage}
            </p>
          )}
          {product.type && product.categoryName === 'Cooling Systems' && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Type:</span> {product.type}
            </p>
          )}
          {product.readSpeed && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Read:</span> {product.readSpeed}
            </p>
          )}
        </div>

        {/* Warranty */}
        {product.warranty && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span>{product.warranty} Warranty</span>
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-red-500">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-md">
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-red-100">
            Explore our wide range of computer hardware components
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
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
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-sm text-gray-600 font-semibold">
              Active Filters:
            </span>
            {selectedCategory !== 'All' && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                {selectedCategory}
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {selectedBrand}
              </span>
            )}
            {searchQuery && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                Search: "{searchQuery}"
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold">
            Showing{' '}
            <span className="text-red-500">{filteredProducts.length}</span>{' '}
            products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
    </div>
  );
}
