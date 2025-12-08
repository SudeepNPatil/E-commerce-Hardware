import React, { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    mainCategory: '',
    productType: '',
    name: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    image: null,
    features: {},
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Updated product structure
  const productStructure = {
    Laptop: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'processor',
        'ram',
        'storage',
        'graphicsCard',
        'display',
        'operatingSystem',
        'warranty',
        'weight',
        'batteryLife',
        'ports',
      ],
    },
    Desktop: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'processor',
        'ram',
        'storage',
        'graphicsCard',
        'display',
        'operatingSystem',
        'warranty',
        'coolingSystem',
        'powerSupply',
        'ports',
      ],
    },
    'Processors (CPUs)': {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'cores',
        'threads',
        'baseClock',
        'boostClock',
        'socket',
        'tdp',
        'cache',
        'integratedGraphics',
      ],
    },
    Motherboards: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'socket',
        'chipset',
        'formFactor',
        'ramSlots',
        'maxRamCapacity',
        'pciSlots',
        'm2Slots',
        'sataSlots',
        'usbPorts',
        'networkingChipset',
      ],
    },
    RAM: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'capacity',
        'memoryType',
        'speed',
        'latency',
        'voltage',
        'modules',
        'rgbLighting',
        'heatSpreader',
      ],
    },
    'Graphics Cards': {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'gpu',
        'vramCapacity',
        'memoryType',
        'coreClock',
        'boostClock',
        'tdp',
        'powerConnectors',
        'displayPorts',
        'hdmiPorts',
        'length',
        'coolingType',
      ],
    },
    'Storage Devices': {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'capacity',
        'storageType',
        'interface',
        'formFactor',
        'readSpeed',
        'writeSpeed',
        'tbw',
        'cache',
      ],
    },
    'Power Supplies': {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'wattage',
        'efficiencyRating',
        'modularType',
        'formFactor',
        'pciePowerConnectors',
        'sataConnectors',
        'fanSize',
        'cableSleeve',
      ],
    },
    'Cooling Systems': {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'coolerType',
        'fanSize',
        'numberOfFans',
        'rpm',
        'noiseLevel',
        'socketCompatibility',
        'radiatorSize',
        'rgbLighting',
        'tdpRating',
      ],
    },
    Cabinets: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'cabinetType',
        'formFactor',
        'material',
        'sidePanelType',
        'maxGpuLength',
        'maxCpuCoolerHeight',
        'fanSupport',
        'radiatorSupport',
        'driveBays',
        'expansionSlots',
        'usbPorts',
        'rgbLighting',
      ],
    },
    Monitors: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'screenSize',
        'resolution',
        'panelType',
        'refreshRate',
        'responseTime',
        'aspectRatio',
        'brightness',
        'contrastRatio',
        'hdrSupport',
        'displayPorts',
        'hdmiPorts',
        'vesa',
        'curvedScreen',
      ],
    },
    Keyboards: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'keyboardType',
        'switchType',
        'layout',
        'connectivity',
        'backlighting',
        'keycapMaterial',
        'wristRest',
        'hotSwappable',
        'macroKeys',
      ],
    },
    Mice: {
      types: ['Development', 'Gaming', 'Professional', 'General Use'],
      features: [
        'manufacturer',
        'mouseType',
        'sensor',
        'maxDpi',
        'pollingRate',
        'numberOfButtons',
        'connectivity',
        'weight',
        'rgbLighting',
        'programmableButtons',
        'batteryLife',
      ],
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData);

  const handleMainCategoryChange = (e) => {
    setFormData({
      mainCategory: e.target.value,
      productType: '',
      name: '',
      brand: '',
      price: '',
      stock: '',
      description: '',
      image: null,
      features: {},
    });
  };

  const handleFeatureChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const getProductFeatures = () => {
    if (!formData.mainCategory) return [];

    const category = productStructure[formData.mainCategory];
    if (!category) return [];

    return category.features;
  };

  const handleSubmit = async () => {
    if (
      !formData.mainCategory ||
      !formData.productType ||
      !formData.name ||
      !formData.brand ||
      !formData.price ||
      !formData.stock ||
      !formData.description
    ) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const productData = new FormData();
      productData.append('category', formData.mainCategory);
      productData.append('subcategory', formData.productType);
      productData.append('name', formData.name);
      productData.append('brand', formData.brand);
      productData.append('price', formData.price);
      productData.append('stock', formData.stock);
      productData.append('description', formData.description);
      let obj = formData.features;
      for (let key in obj) {
        productData.append(`${key}`, obj[key]);
      }
      productData.append('image', formData.image);

      const response = await fetch(
        'http://localhost:5000/products/save-product',
        {
          method: 'POST',
          body: productData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Product added successfully!' });
        setFormData({
          mainCategory: '',
          productType: '',
          name: '',
          brand: '',
          price: '',
          stock: '',
          description: '',
          image: null,
          features: {},
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to add product',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error connecting to server: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const featureFields = getProductFeatures();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 w-full h-screen overflow-scroll">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Add New Product
            </h1>
            <p className="text-gray-600">
              Add products and PC components to your inventory
            </p>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg border-l-4 ${
                message.type === 'success'
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'bg-red-50 border-red-500 text-red-800'
              }`}
            >
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Main Category & Product Type */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category *
                  </label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleMainCategoryChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Product Category</option>
                    {Object.keys(productStructure).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    disabled={!formData.mainCategory}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Subcategory</option>
                    {formData.mainCategory &&
                      productStructure[formData.mainCategory].types.map(
                        (type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter detailed product description"
                />
              </div>
            </div>

            {/* Product Features */}
            {featureFields.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Features & Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featureFields.map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        value={formData.features[field] || ''}
                        onChange={(e) =>
                          handleFeatureChange(field, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${field
                          .replace(/([A-Z])/g, ' $1')
                          .trim()
                          .toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Images
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-16 h-16 text-gray-400 mb-3" />
                  <span className="text-lg text-gray-700 font-medium">
                    Click to upload images
                  </span>
                  <span className="text-sm text-gray-500 mt-2">
                    PNG, JPG, JPEG (Max 5MB per file)
                  </span>
                </label>
              </div>

              {formData.image && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                  <div className="relative group">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: null }))
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      Image
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-6 h-6 mr-2" />
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
