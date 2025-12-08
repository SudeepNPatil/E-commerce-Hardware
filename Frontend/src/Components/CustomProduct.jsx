import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Check,
  AlertCircle,
  ShoppingCart,
  Trash2,
  Info,
  X,
  Zap,
  Package,
} from 'lucide-react';

import { MdError } from 'react-icons/md';
import ModalLogin from '../modals/ModalLogin.jsx';
import { useProductTypeContext } from '../Context/ProductTypeContext.jsx';

const CustomProduct = () => {
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    gpu: null,
    psu: null,
    cooling: null,
    cabinet: null,
    monitor: null,
    keyboard: null,
    mouse: null,
  });
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('cpu');
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [loginmodal, setloginmodal] = useState(false);
  const { ProductPurpose } = useProductTypeContext();

  const [categories, setcategories] = useState([
    {
      id: 'cpu',
      name: 'Processor',
      data: [],
      icon: '🎯',
      color: 'red',
    },
    {
      id: 'motherboard',
      name: 'Motherboard',
      data: [],
      icon: '⚡',
      color: 'blue',
    },
    { id: 'ram', name: 'RAM', data: [], icon: '💾', color: 'green' },
    {
      id: 'storage',
      name: 'Storage',
      data: [],
      icon: '💿',
      color: 'yellow',
    },
    {
      id: 'gpu',
      name: 'Graphics Card',
      data: [],
      icon: '🎮',
      color: 'red',
    },
    {
      id: 'psu',
      name: 'Power Supply',
      data: [],
      icon: '🔌',
      color: 'blue',
    },
    {
      id: 'cooling',
      name: 'Cooling',
      data: [],
      icon: '❄️',
      color: 'cyan',
    },
    {
      id: 'cabinet',
      name: 'Cabinet',
      data: [],
      icon: '📦',
      color: 'gray',
    },
    {
      id: 'monitor',
      name: 'Monitor',
      data: [],
      icon: '🖥️',
      color: 'purple',
    },
    {
      id: 'keyboard',
      name: 'Keyboard',
      data: [],
      icon: '⌨️',
      color: 'indigo',
    },
    { id: 'mouse', name: 'Mouse', data: [], icon: '🖱️', color: 'pink' },
  ]);

  const colorSchemes = {
    red: 'bg-red-500 hover:bg-red-600 text-white',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    cyan: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white',
    purple: 'bg-purple-500 hover:bg-purple-600 text-white',
    indigo: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    pink: 'bg-pink-500 hover:bg-pink-600 text-white',
  };

  const borderSchemes = {
    red: 'border-red-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    cyan: 'border-cyan-500',
    gray: 'border-gray-500',
    purple: 'border-purple-500',
    indigo: 'border-indigo-500',
    pink: 'border-pink-500',
  };

  useEffect(() => {
    function getcatagory(cat) {
      switch (cat) {
        case 'cpu':
          return 'Processor & CPU';
        case 'motherboard':
          return 'Motherboard';
        case 'ram':
          return 'RAM Module';
        case 'storage':
          return 'storageDevices';
        case 'gpu':
          return 'graphicsCards';
        case 'cooling':
          return 'coolingSystems';
        case 'cabinet':
          return 'cabinets';
        case 'monitor':
          return 'Monitor';
        case 'keyboard':
          return 'Keyboards';
        case 'mouse':
          return 'Mouse';
        case 'psu':
          return 'powerSupplies';
        default:
          return 'Processor & CPU';
      }
    }
    fetch(
      `http://localhost:5000/products/category/${getcatagory(activeCategory)}`
    )
      .then((data) => data.json())
      .then((data) => {
        setcategories((prev) =>
          prev.map((item) =>
            item.id === activeCategory ? { ...item, data: data.products } : item
          )
        );
      });
  }, [activeCategory]);

  // Check compatibility
  useEffect(() => {
    const issues = [];
    const { cpu, motherboard, ram, psu, gpu, cabinet } = selectedComponents;

    if (cpu && motherboard) {
      if (cpu.socket !== motherboard.socket) {
        issues.push(
          `⚠️ CPU socket (${cpu.socket}) doesn't match motherboard socket (${motherboard.socket})`
        );
      }
    }

    if (ram && motherboard) {
      const ramType = ram.type;
      if (
        !motherboard.supported_ram
          ?.toLowerCase()
          .includes(ramType.toLowerCase())
      ) {
        issues.push(`⚠️ RAM type (${ramType}) not supported by motherboard`);
      }
    }

    if (psu && gpu) {
      const psuWattage = parseInt(psu.wattage);
      const requiredPSU = parseInt(gpu.recommendedPSU);
      if (psuWattage < requiredPSU) {
        issues.push(
          `⚠️ Power supply (${psuWattage}W) is below GPU recommendation (${requiredPSU}W)`
        );
      }
    }

    if (motherboard && cabinet) {
      const mbFormFactor = motherboard.form_factor;
      if (!cabinet.supportedMotherboards?.includes(mbFormFactor)) {
        issues.push(
          `⚠️ Motherboard form factor (${mbFormFactor}) may not fit in selected cabinet`
        );
      }
    }

    setCompatibilityIssues(issues);
  }, [selectedComponents]);

  const handleSelectComponent = (category, component) => {
    let token = localStorage.getItem('token');
    if (token) {
      setSelectedComponents((prev) => ({
        ...prev,
        [category]: component,
      }));
    } else {
      setloginmodal(true);
    }
  };

  const handleRemoveComponent = (category) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  const calculateTotal = () => {
    return Object.values(selectedComponents).reduce((total, component) => {
      return total + (component?.price || 0);
    }, 0);
  };

  const getSelectedCount = () => {
    return Object.values(selectedComponents).filter((c) => c !== null).length;
  };

  const isComponentSelected = (category, componentId) => {
    return selectedComponents[category]?._id === componentId;
  };

  const openDetailModal = (component) => {
    setDetailModal(component);
  };

  const DetailModal = ({ component, onClose }) => {
    if (!component) return null;

    const allDetails = Object.entries(component).filter(
      ([key, value]) =>
        key !== 'id' &&
        key !== 'imageUrls' &&
        key !== 'imageUrl' &&
        key !== 'description' &&
        value !== null &&
        value !== undefined &&
        value !== ''
    );

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-red-500 to-blue-500 text-white p-6 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold">{component.name}</h2>
              <p className="text-sm opacity-90 mt-1">{component.brand}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div>
                <img
                  src={component.imageUrls || component.imageUrl}
                  alt={component.name}
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-4 bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">Price</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                      ₹{component.price?.toLocaleString()}
                    </span>
                  </div>
                  {component.warranty && (
                    <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span>Warranty: {component.warranty}</span>
                    </div>
                  )}
                  {component.availability && (
                    <div className="mt-1 text-sm flex items-center gap-2">
                      <Package size={16} className="text-green-500" />
                      <span className="text-green-600 font-semibold">
                        {component.availability}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    Description
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {component.description}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    <Zap className="text-red-500" size={20} />
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {allDetails.map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-white rounded-lg p-3 shadow-sm"
                      >
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-sm text-gray-800 font-medium">
                          {typeof value === 'object'
                            ? JSON.stringify(value)
                            : value.toString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ComponentCard = ({ component, category }) => {
    const isSelected = isComponentSelected(category, component._id);
    const categoryColor =
      categories.find((c) => c.id === category)?.color || 'blue';

    return (
      <div
        className={`border-2 rounded-xl p-4 transition-all duration-200 ${
          isSelected
            ? `${borderSchemes[categoryColor]} bg-gradient-to-br from-white to-${categoryColor}-50 shadow-lg scale-105`
            : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
        }`}
      >
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={component.imageUrls || component.imageUrl}
              alt={component.name}
              className="w-28 h-28 object-cover rounded-lg shadow-md"
            />
            {isSelected && (
              <div
                className={`absolute -top-2 -right-2 ${colorSchemes[categoryColor]} rounded-full p-1.5 shadow-lg`}
              >
                <Check size={16} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base mb-1 text-gray-900">
              {component.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2 font-semibold">
              {component.brand}
            </p>
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
              {component.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                ₹{component.price?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleSelectComponent(category, component)}
            className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${
              isSelected
                ? 'bg-gray-200 text-gray-600 cursor-default'
                : `${colorSchemes[categoryColor]}`
            }`}
            disabled={isSelected}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
          <button
            onClick={() => openDetailModal(component)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-lg font-semibold text-sm transition flex items-center gap-1"
          >
            <Info size={16} />
            Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 border-b sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Zap size={32} className="text-yellow-300" />
                Custom PC Builder
              </h1>
              <p className="text-sm text-white opacity-90 mt-1">
                Build your perfect setup, component by component
              </p>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-white text-gray-800 px-6 py-3 rounded-xl hover:shadow-xl transition flex items-center gap-2 font-bold"
            >
              <ShoppingCart size={20} className="text-red-500" />
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                ₹{calculateTotal().toLocaleString()}
              </span>
              {getSelectedCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg">
                  {getSelectedCount()}
                </span>
              )}
            </button>
          </div>

          {/* Compatibility Alert */}
          {compatibilityIssues.length > 0 && (
            <div className="mt-4 bg-white bg-opacity-95 backdrop-blur rounded-xl p-4 shadow-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-red-600 text-sm">
                    Compatibility Warnings:
                  </p>
                  <ul className="mt-2 space-y-1">
                    {compatibilityIssues.map((issue, idx) => (
                      <li key={idx} className="text-xs text-gray-700">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Category Navigation */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 sticky top-28 shadow-lg">
              <h2 className="font-bold mb-4 text-gray-900 text-lg flex items-center gap-2">
                <Package className="text-blue-500" size={20} />
                Components
              </h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between font-semibold ${
                      activeCategory === cat.id
                        ? `${colorSchemes[cat.color]} shadow-lg scale-105`
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      {cat.name}
                    </span>
                    {selectedComponents[cat.id] && (
                      <Check
                        size={18}
                        className={
                          activeCategory === cat.id
                            ? 'text-white'
                            : 'text-green-500'
                        }
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-9">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-3xl">
                    {categories.find((c) => c.id === activeCategory)?.icon}
                  </span>
                  {categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                {selectedComponents[activeCategory] && (
                  <button
                    onClick={() => handleRemoveComponent(activeCategory)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-semibold transition shadow-md"
                  >
                    <Trash2 size={16} />
                    Remove Selection
                  </button>
                )}
              </div>

              <div className="grid gap-5">
                {categories
                  .find((c) => c.id === activeCategory)
                  ?.data.map((component) => (
                    <ComponentCard
                      key={component._id}
                      component={component}
                      category={activeCategory}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-20"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white p-6 sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingCart size={24} />
                  Your Build
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="border-b-2 border-gray-100 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.name}
                      </span>
                    </div>
                    {selectedComponents[cat.id] ? (
                      <div className="flex items-start gap-3 bg-gradient-to-br from-gray-50 to-blue-50 p-3 rounded-lg">
                        <img
                          src={
                            selectedComponents[cat.id].imageUrls ||
                            selectedComponents[cat.id].imageUrl
                          }
                          alt={selectedComponents[cat.id].name}
                          className="w-16 h-16 object-cover rounded-lg shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate text-gray-800">
                            {selectedComponents[cat.id].name}
                          </p>
                          <p className="text-sm font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                            ₹
                            {selectedComponents[cat.id].price?.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveComponent(cat.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg">
                        Not selected
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-red-50 to-blue-50 p-4 rounded-xl">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={(e) => (
                    e.preventDefault(),
                    navigate('/Cheoutaddress', { state: selectedComponents })
                  )}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl transition font-bold shadow-lg text-lg"
                  disabled={getSelectedCount() === 0}
                >
                  Continue ({getSelectedCount()} items)
                </button>
                {compatibilityIssues.length > 0 && (
                  <p className="text-xs text-yellow-600 mt-3 text-center bg-yellow-50 p-2 rounded-lg font-semibold">
                    ⚠️ Review compatibility warnings
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModal && (
        <DetailModal
          component={detailModal}
          onClose={() => setDetailModal(null)}
        />
      )}

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

export default CustomProduct;
