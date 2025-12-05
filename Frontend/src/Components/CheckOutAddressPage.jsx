import React, { useState } from 'react';
import {
  MapPin,
  User,
  Phone,
  Home,
  Building,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
} from 'lucide-react';

import AmitSharma from '../assets/AmitSharma.png';
import RajeshKumar from '../assets/RajeshKumar.png';
import PriyaPatel from '../assets/PriyaPatel.png';

const CheckOutAddressPage = ({ product, quantity = 1, onBack, onContinue }) => {
  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    addressType: 'home',
  });

  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [skipTechnician, setSkipTechnician] = useState(false);

  const [showSlotModal, setShowSlotModal] = useState(false);
  const [activeTechnicianForSlot, setActiveTechnicianForSlot] = useState(null);

  const [technicianSlots, setTechnicianSlots] = useState({});

  const [errors, setErrors] = useState({});

  const technicians = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      experience: '8 years',
      specialization: 'Desktop & Laptop Setup',
      rating: 4.8,
      completedJobs: 1250,
      image: RajeshKumar,
    },
    {
      id: 2,
      name: 'Amit Sharma',
      experience: '5 years',
      specialization: 'Hardware Installation',
      rating: 4.6,
      completedJobs: 890,
      image: AmitSharma,
    },
    {
      id: 3,
      name: 'Priya Patel',
      experience: '6 years',
      specialization: 'Software & OS Setup',
      rating: 4.9,
      completedJobs: 1100,
      image: PriyaPatel,
    },
  ];

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateAddress = () => {
    const newErrors = {};

    if (!address.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!address.phoneNumber.trim())
      newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(address.phoneNumber))
      newErrors.phoneNumber = 'Enter valid 10-digit phone number';
    if (!address.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(address.pincode))
      newErrors.pincode = 'Enter valid 6-digit pincode';
    if (!address.addressLine1.trim())
      newErrors.addressLine1 = 'Address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateAddress()) {
      alert('Please fill all required address fields correctly');
      return;
    }

    if (!skipTechnician && !selectedTechnician) {
      alert('Please select a technician or choose to skip');
      return;
    }

    const orderDetails = {
      product,
      quantity,
      address,
      technician: skipTechnician
        ? null
        : {
            ...technicians.find((t) => t.id === selectedTechnician),
            slot: technicianSlots[selectedTechnician] || null,
          },
    };

    console.log('Order Details:', orderDetails);

    // You'll add this to your OrderDetailContext
    if (onContinue) {
      onContinue(orderDetails);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <span className="ml-2 font-semibold text-gray-900">Address</span>
            </div>
            <div className="w-20 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                2
              </div>
              <span className="ml-2 font-semibold text-gray-500">Payment</span>
            </div>
            <div className="w-20 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                3
              </div>
              <span className="ml-2 font-semibold text-gray-500">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-4">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) =>
                          handleAddressChange('fullName', e.target.value)
                        }
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={address.phoneNumber}
                        onChange={(e) =>
                          handleAddressChange(
                            'phoneNumber',
                            e.target.value.replace(/\D/g, '').slice(0, 10)
                          )
                        }
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                          errors.phoneNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pincode & Landmark */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) =>
                        handleAddressChange(
                          'pincode',
                          e.target.value.replace(/\D/g, '').slice(0, 6)
                        )
                      }
                      placeholder="6-digit pincode"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                        errors.pincode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(e) =>
                        handleAddressChange('landmark', e.target.value)
                      }
                      placeholder="Nearby landmark"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Address Lines */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) =>
                      handleAddressChange('addressLine1', e.target.value)
                    }
                    placeholder="House No., Building Name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                      errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.addressLine1}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={address.addressLine2}
                    onChange={(e) =>
                      handleAddressChange('addressLine2', e.target.value)
                    }
                    placeholder="Road Name, Area, Colony"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        handleAddressChange('city', e.target.value)
                      }
                      placeholder="Enter city"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        handleAddressChange('state', e.target.value)
                      }
                      placeholder="Enter state"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Address Type
                  </label>
                  <div className="flex gap-4">
                    {['home', 'work', 'other'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleAddressChange('addressType', type)}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          address.addressType === type
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type === 'home' && <Home className="w-5 h-5" />}
                        {type === 'work' && <Building className="w-5 h-5" />}
                        {type === 'other' && <MapPin className="w-5 h-5" />}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technician Booking Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Book a Technician
                  </h2>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    Optional
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSkipTechnician(!skipTechnician);
                    if (!skipTechnician) setSelectedTechnician(null);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    skipTechnician
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {skipTechnician ? 'Include Technician' : 'Skip This Step'}
                </button>
              </div>

              {!skipTechnician && (
                <div className="space-y-4">
                  {technicians.map((tech) => (
                    <div
                      key={tech.id}
                      onClick={() => setSelectedTechnician(tech.id)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedTechnician === tech.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Technician Image Placeholder */}
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                          <img
                            src={tech.image}
                            alt={tech.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Technician Details */}
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {tech.name}
                            </h3>
                            {selectedTechnician === tech.id && (
                              <div className="bg-blue-500 text-white p-1 rounded-full">
                                <Check className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {tech.specialization}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-700">
                              <span className="font-semibold">
                                {tech.experience}
                              </span>{' '}
                              experience
                            </span>
                            <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                              ⭐ {tech.rating}
                            </span>
                            <span className="text-gray-600">
                              {tech.completedJobs}+ jobs
                            </span>
                          </div>

                          <div className="flex gap-3 items-center flex-row-reverse justify-between">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // prevent selecting tech on slot button click
                                setActiveTechnicianForSlot(tech.id);
                                setShowSlotModal(true);
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600"
                            >
                              Book Slot
                            </button>

                            {/* Show selected slot if exists */}
                            {technicianSlots[tech.id] && (
                              <div className="text-sm text-green-600 font-semibold">
                                {technicianSlots[tech.id].date} @{' '}
                                {technicianSlots[tech.id].time}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {skipTechnician && (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
                  <p className="text-gray-600">
                    You've chosen to skip technician booking. You can set up
                    your device on your own.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              {product && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex gap-3">
                    <img
                      src={product.imageUrls}
                      alt={product.name}
                      className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">Qty: {quantity}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹
                    {product
                      ? (
                          parseInt(product.price.replace(/,/g, '')) * quantity
                        ).toLocaleString('en-IN')
                      : '0'}
                  </span>
                </div>
                {!skipTechnician && selectedTechnician && (
                  <div className="flex justify-between text-gray-700">
                    <span>Installation Service</span>
                    <span className="font-semibold">₹999</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-red-500">
                    ₹
                    {product
                      ? (
                          parseInt(product.price.replace(/,/g, '')) * quantity +
                          (!skipTechnician && selectedTechnician ? 999 : 0)
                        ).toLocaleString('en-IN')
                      : '0'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onBack || (() => window.history.back())}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSlotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Book Slot</h2>

            {/* Date */}
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              onChange={(e) =>
                setTechnicianSlots((prev) => ({
                  ...prev,
                  [activeTechnicianForSlot]: {
                    ...prev[activeTechnicianForSlot],
                    date: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />

            {/* Time */}
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Time Slot
            </label>
            <select
              onChange={(e) =>
                setTechnicianSlots((prev) => ({
                  ...prev,
                  [activeTechnicianForSlot]: {
                    ...prev[activeTechnicianForSlot],
                    time: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border rounded-lg mb-6"
            >
              <option value="">Choose Slot</option>
              <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
              <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
              <option value="2:00 PM – 4:00 PM">2:00 PM – 4:00 PM</option>
              <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSlotModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowSlotModal(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutAddressPage;
