import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  MapPin,
  CreditCard,
  CheckCircle,
  Wrench,
  Star,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import AmitSharma from '../assets/AmitSharma.png';
import RajeshKumar from '../assets/RajeshKumar.png';
import PriyaPatel from '../assets/PriyaPatel.png';
import CustomPaymentPage from './CustomPaymentPage';
import CustomConfirmationPage from './CustomConfirmationPage';

// ✅ Parent Checkout Component
const CheckoutPage = () => {
  const location = useLocation();
  const selectedParts = location.state || {}; // object passed via useNavigate

  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({
    address: null,
    technician: null,
    imageUrls: null,
    payment: null,
  });

  console.log(checkoutData);

  // ✅ Convert selectedParts object → array of items (filtering nulls)
  const cartItems = useMemo(() => {
    return Object.entries(selectedParts)
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => ({
        name: value?.name || key.toUpperCase(),
        price: value?.price || 0,
        imageUrl: value?.imageUrls || value.imageUrl,
        quantity: 1,
      }));
  }, [selectedParts]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddressSubmit = (addressData) => {
    setCheckoutData((prev) => ({
      ...prev,
      address: {
        fullName: addressData.fullName,
        phone: addressData.phone,
        email: addressData.email,
        address: addressData.address,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        landmark: addressData.landmark,
      },
      technician: addressData.technician, // ✅ store separately
    }));
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (paymentData) => {
    const newOrderId = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;
    setCheckoutData((prev) => ({
      ...prev,
      payment: paymentData,
      orderId: newOrderId,
    }));
    setCurrentStep(3);
  };

  const handleback = () => {
    setCurrentStep(1);
  };

  const steps = [
    { number: 1, name: 'Address & Technician', icon: MapPin },
    { number: 2, name: 'Payment', icon: CreditCard },
    { number: 3, name: 'Confirmation', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-sm opacity-90 mt-1">
            Complete your purchase in simple steps
          </p>
        </div>
      </div>

      {/* Steps Progress */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle size={24} />
                  ) : (
                    <step.icon size={24} />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-semibold ${
                    currentStep >= step.number
                      ? 'text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all ${
                    currentStep > step.number
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            {currentStep === 1 && (
              <CheckoutAddress
                onSubmit={handleAddressSubmit}
                initialData={checkoutData.address}
              />
            )}
            {currentStep === 2 && (
              <CustomPaymentPage
                onSubmit={handlePaymentSubmit}
                onBack={handleback}
                orderTotal={totalAmount}
              />
            )}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 text-center">
                <CustomConfirmationPage
                  orderId={checkoutData.orderId}
                  address={checkoutData.address}
                  technician={checkoutData.technician}
                  paymentMethod={checkoutData.payment}
                  cartItems={cartItems}
                  totalAmount={
                    totalAmount +
                    (checkoutData.technician !== 'skip'
                      ? checkoutData.technician?.price || 0
                      : 0)
                  }
                />
              </div>
            )}
          </div>

          {/* ✅ Order Summary Sidebar */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-semibold text-gray-800">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No items selected for checkout.
                  </p>
                )}
              </div>
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
                {checkoutData.technician &&
                  checkoutData.technician !== 'skip' && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Assembly Service</span>
                      <span className="font-semibold text-green-600">
                        ₹{checkoutData.technician.price?.toLocaleString()}
                      </span>
                    </div>
                  )}
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                  <span className="text-gray-800">Total</span>
                  <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                    ₹
                    {(
                      totalAmount +
                      (checkoutData.technician !== 'skip'
                        ? checkoutData.technician?.price || 0
                        : 0)
                    )?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Checkout Address Component (unchanged)
const CheckoutAddress = ({ onSubmit, initialData }) => {
  const [selectedTechnician, setSelectedTechnician] = useState(
    initialData?.technician || null
  );
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    landmark: initialData?.landmark || '',
  });

  const [showSlotModal, setShowSlotModal] = useState(false);
  const [activeTechnicianForSlot, setActiveTechnicianForSlot] = useState(null);

  // Saved slot
  const [technicianSlots, setTechnicianSlots] = useState({});

  const technicians = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      experience: '8 Years',
      rating: 4.9,
      completedBuilds: 500,
      specialization: 'Gaming PCs & RGB Setup',
      price: 2999,
      availability: 'Available Tomorrow',
      image: RajeshKumar,
    },
    {
      id: 2,
      name: 'Amit Sharma',
      experience: '6 Years',
      rating: 4.8,
      completedBuilds: 380,
      specialization: 'Workstation & Server Setup',
      price: 2499,
      availability: 'Available in 2 Days',
      image: AmitSharma,
    },
    {
      id: 3,
      name: 'Priya Patel',
      experience: '5 Years',
      rating: 4.7,
      completedBuilds: 320,
      specialization: 'Custom Cooling & Overclocking',
      price: 3499,
      availability: 'Available Today',
      image: PriyaPatel,
    },
  ];

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTechnician) {
      alert('Please select a technician for assembly');
      return;
    }
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit({
      ...formData,
      technician:
        selectedTechnician !== 'skip'
          ? {
              ...selectedTechnician,
              slot: technicianSlots[selectedTechnician?.id] || null,
            }
          : 'skip',
    });
  };

  return (
    <div className="space-y-6">
      {/* Address Form */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
            <MapPin className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Delivery Address
            </h2>
            <p className="text-sm text-gray-600">
              Where should we deliver your components?
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Complete Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              placeholder="House No., Street, Area"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="Bangalore"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="Karnataka"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="560001"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Landmark (Optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              placeholder="Near XYZ Mall"
            />
          </div>
        </div>
      </div>

      {/* Technician Selection */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Wrench className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Select Assembly Technician
              </h2>
              <p className="text-sm text-gray-600">
                Choose an expert to assemble your PC at your doorstep
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTechnician('skip')}
            className={`px-6 py-2 rounded-xl font-semibold transition shadow-md ${
              selectedTechnician === 'skip'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {selectedTechnician === 'skip' ? 'Skipped ✓' : 'Skip Assembly'}
          </button>
        </div>

        <div className="grid gap-4">
          {selectedTechnician !== 'skip' &&
            technicians.map((tech) => (
              <div
                key={tech.id}
                onClick={() => setSelectedTechnician(tech)}
                className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                  selectedTechnician?.id === tech.id
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />
                  <div className="flex-1 gap-0.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {tech.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tech.specialization}
                        </p>
                      </div>
                      {selectedTechnician?.id === tech.id && (
                        <div className="bg-green-500 text-white rounded-full p-1.5">
                          <CheckCircle size={20} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-start">
                      <div className="flex flex-row gap-3">
                        <p className="text-sm text-gray-800">
                          {tech.experience} Experience ,
                        </p>

                        <p className="text-sm text-gray-800">
                          {tech.completedBuilds}+ Builds
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold text-gray-800">
                          {tech.rating} Rating
                        </span>
                      </div>

                      <span className="text-base font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                        ₹{tech.price.toLocaleString()}
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
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedTechnician}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-2"
      >
        Proceed to Payment
        <ChevronRight size={24} />
      </button>

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

export default CheckoutPage;
