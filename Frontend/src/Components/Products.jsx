import React, { useRef, useState } from 'react';
import CustomProduct from './CustomProduct.jsx';
import {
  Package,
  Wrench,
  Monitor,
  Gamepad2,
  Briefcase,
  Code,
  Coffee,
  X,
} from 'lucide-react';
import ReadyMadeProducts from './ReadyMadeProducts.jsx';
import { useProductTypeContext } from '../Context/ProductTypeContext.jsx';

export default function ProductPage() {
  const { ProductType, setProductType, ProductPurpose, setProductPurpose } =
    useProductTypeContext();
  const [modal, setmodal] = useState(true);
  const [step, setStep] = useState(1);

  const productTypes = [
    {
      id: 'readymade',
      title: 'Ready-Made Products',
      description: 'Pre-built systems ready to use out of the box',
      icon: Package,
      color: 'red',
    },
    {
      id: 'custom',
      title: 'Custom Products',
      description: 'Build your own custom system with components you choose',
      icon: Wrench,
      color: 'blue',
    },
  ];

  const purposes = [
    {
      id: 'gaming',
      title: 'Gaming',
      description: 'High-performance systems for gaming enthusiasts',
      icon: Gamepad2,
      color: 'red',
    },
    {
      id: 'professional',
      title: 'Professional Work',
      description: 'Reliable systems for business and productivity',
      icon: Briefcase,
      color: 'blue',
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Powerful machines for coding and development',
      icon: Code,
      color: 'yellow',
    },
    {
      id: 'general',
      title: 'General Use',
      description: 'Everyday computing for casual users',
      icon: Coffee,
      color: 'green',
    },
  ];

  const handleTypeSelect = (type) => {
    setProductType(type);
    setStep(2);
  };

  const handlePurposeSelect = (purpose) => {
    setProductPurpose(purpose);
  };

  const handleSubmit = () => {
    setmodal(false);
  };

  const handleBack = () => {
    setStep(1);
    setProductPurpose('');
  };

  const handleReset = () => {
    if (!ProductPurpose && !ProductType) {
      setProductPurpose('general');
      setProductType('custom');
    }

    setmodal(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-500',
        hoverBg: 'hover:bg-red-50',
        selectedBg: 'bg-red-100',
        selectedBorder: 'border-red-500',
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-500',
        hoverBg: 'hover:bg-blue-50',
        selectedBg: 'bg-blue-100',
        selectedBorder: 'border-blue-500',
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-500',
        text: 'text-yellow-600',
        hoverBg: 'hover:bg-yellow-50',
        selectedBg: 'bg-yellow-100',
        selectedBorder: 'border-yellow-500',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-500',
        hoverBg: 'hover:bg-green-50',
        selectedBg: 'bg-green-100',
        selectedBorder: 'border-green-500',
      },
    };
    return colors[color];
  };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 ">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl transform animate-bounceIn max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-3xl relative">
              <button
                onClick={handleReset}
                className="absolute top-6 right-6 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <Monitor size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Let's Get Started</h2>
                  <p className="text-red-100">
                    Tell us about your requirements
                  </p>
                </div>
              </div>

              <div className="flex items-center mt-6  gap-5">
                <div className="flex items-center gap-2 ">
                  <div
                    onClick={handleBack}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer font-bold ${
                      step >= 1
                        ? 'bg-white text-red-500'
                        : 'bg-white bg-opacity-30 text-white'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm font-semibold">Product Type</span>
                </div>
                <div
                  className={`h-1 flex-1 rounded ${
                    step >= 2 ? 'bg-white' : 'bg-white bg-opacity-30'
                  }`}
                ></div>
                <div className="flex items-center gap-2 flex-1">
                  <div
                    onClick={() => setStep(2)}
                    className={`w-10 h-10 rounded-full flex items-center cursor-pointer justify-center font-bold ${
                      step >= 2
                        ? 'bg-white text-red-500'
                        : 'bg-white bg-opacity-30 text-white'
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm font-semibold">Purpose</span>
                </div>
              </div>
            </div>

            <div className="p-8 relative">
              <p
                onClick={handleBack}
                className="absolute top-5 left-5 text-red-500 cursor-pointer"
              >
                ⇠ Back
              </p>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      What type of product are you looking for?
                    </h3>
                    <p className="text-gray-600">
                      Choose between ready-made systems or custom-built
                      solutions
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {productTypes.map((type) => {
                      const Icon = type.icon;
                      const colors = getColorClasses(type.color);

                      return (
                        <button
                          key={type.id}
                          onClick={() => handleTypeSelect(type.id)}
                          className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${
                            ProductType === type.id
                              ? `${colors.selectedBg} ${colors.selectedBorder} shadow-lg`
                              : `border-gray-200 ${colors.hoverBg}`
                          }`}
                        >
                          <div
                            className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-4`}
                          >
                            <Icon className={colors.text} size={36} />
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">
                            {type.title}
                          </h4>
                          <p className="text-gray-600">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      What will you be using it for?
                    </h3>
                    <p className="text-gray-600">
                      Select the primary purpose to get personalized
                      recommendations
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {purposes.map((purpose) => {
                      const Icon = purpose.icon;
                      const colors = getColorClasses(purpose.color);

                      return (
                        <button
                          key={purpose.id}
                          onClick={() => (
                            handlePurposeSelect(purpose.id), handleSubmit()
                          )}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left ${
                            ProductPurpose === purpose.id
                              ? `${colors.selectedBg} ${colors.selectedBorder} shadow-lg`
                              : `border-gray-200 ${colors.hoverBg}`
                          }`}
                        >
                          <div
                            className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-3`}
                          >
                            <Icon className={colors.text} size={28} />
                          </div>
                          <h4 className="text-lg font-bold text-gray-800 mb-1">
                            {purpose.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {purpose.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!modal && ProductType && ProductPurpose && (
        <>
          {ProductType === 'Custom' ? (
            <CustomProduct purpose={ProductPurpose} />
          ) : (
            <ReadyMadeProducts purpose={ProductPurpose} />
          )}
        </>
      )}
    </>
  );
}
