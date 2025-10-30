import React from 'react';
import {
  Wrench,
  Package,
  Target,
  Zap,
  Cpu,
  Smartphone,
  Monitor,
  ShieldCheck,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
      <div className="bg-gradient-to-r from-red-500 to-red-500 bg-opacity-95 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Our Hardware Shop</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Your one-stop destination for computer hardware, custom builds, and
            professional installation services
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <section className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                <Package className="text-red-500" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                What is Our Hardware Shop?
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We are a specialized e-commerce platform dedicated to computer and
              mobile hardware. Unlike traditional electronics stores, we focus
              exclusively on hardware components and complete systems tailored
              to your specific needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're a gamer, professional, developer, or tech
              enthusiast, we provide both ready-made and custom-built solutions.
              From individual components like processors, RAM, motherboards, and
              microcontrollers to complete laptops, desktops, and mobile devices
              - we've got it all under one roof.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Product Range
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-red-500 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                <Cpu className="text-red-500" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Computer Components
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Processors & CPUs</li>
                <li>• RAM & ROM</li>
                <li>• Motherboards</li>
                <li>• Graphics Cards</li>
                <li>• Storage Drives</li>
                <li>• Power Supplies</li>
                <li>• Cooling Systems</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Monitor className="text-blue-500" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Ready-Made Systems
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Gaming Laptops</li>
                <li>• Professional Laptops</li>
                <li>• Development Laptops</li>
                <li>• Gaming Desktops</li>
                <li>• Workstation Desktops</li>
                <li>• Custom Built PCs</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-500 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
                <Smartphone className="text-yellow-600" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Mobile Hardware
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Smartphones</li>
                <li>• Mobile Processors</li>
                <li>• Display Screens</li>
                <li>• Batteries</li>
                <li>• Camera Modules</li>
                <li>• Mobile Components</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-red-500 to-red-500 rounded-3xl shadow-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What Makes Us Different?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wrench size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Built-in Technician Service
                    </h3>
                    <p className="text-red-100 leading-relaxed">
                      No more searching for technicians after purchase! Book a
                      professional technician directly while placing your order.
                      Our certified experts will install, configure, and test
                      your hardware at your doorstep, ensuring everything works
                      perfectly from day one.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Purpose-Based Recommendations
                    </h3>
                    <p className="text-red-100 leading-relaxed">
                      Tell us your purpose - gaming, professional work, software
                      development, content creation, or casual use. Our
                      intelligent system shows you products specifically
                      optimized for your needs, saving you time and ensuring you
                      get exactly what you need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Custom & Ready-Made Options
                    </h3>
                    <p className="text-red-100 leading-relaxed">
                      Choose from our curated ready-made systems or build your
                      dream machine component by component. Whether you need a
                      plug-and-play solution or a custom configuration, we
                      provide both with expert guidance throughout the process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Quality Assurance
                    </h3>
                    <p className="text-red-100 leading-relaxed">
                      Every product is thoroughly tested before shipping. When
                      you book our technician service, they perform additional
                      checks during installation to guarantee optimal
                      performance and compatibility of all components.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-500">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Select Your Purpose
              </h3>
              <p className="text-gray-600">
                Choose your use case - gaming, professional work, development,
                or general use
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-yellow-600">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Browse & Choose
              </h3>
              <p className="text-gray-600">
                View products tailored to your needs and select components or
                ready-made systems
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-500">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Book Technician
              </h3>
              <p className="text-gray-600">
                Optionally add professional installation and setup service to
                your order
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-500">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Get It Installed
              </h3>
              <p className="text-gray-600">
                Receive your products and have them professionally installed and
                tested
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Users className="text-yellow-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Our Commitment to You
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="text-red-500" size={24} />
                  Expertise You Can Trust
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our team consists of hardware specialists with years of
                  experience. We carefully curate every product and ensure our
                  technicians are certified professionals who understand the
                  intricacies of hardware installation and optimization.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-blue-500" size={24} />
                  Complete Peace of Mind
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  From purchase to installation, we're with you every step of
                  the way. Our warranty covers both products and installation
                  services, and our support team is always ready to assist with
                  any questions or concerns you may have.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Your Perfect Setup?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the future of hardware shopping - where quality
              products meet professional installation services
            </p>
            <Link
              to={`/Products`}
              className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Shopping Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
