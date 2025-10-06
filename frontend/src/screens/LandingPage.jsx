import React from 'react';
import { BuildingStorefrontIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const handleLogin = () => {
    // Use default admin credentials for demo
    onLogin('admin@manifest.build', 'admin');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">FoodApp</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Login / Demo
        </button>
      </header>

      <main>
        <section className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Manage Your Restaurant, Effortlessly
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              A complete platform powered by Manifest. Add your restaurants, manage your menu, and grow your business, all in one place.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg"
              >
                Try The Demo
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">Features</h3>
              <p className="mt-4 text-lg text-gray-600">Everything you need to run your food business.</p>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <BuildingStorefrontIcon className="w-12 h-12 mx-auto text-blue-600" />
                <h4 className="mt-6 text-xl font-semibold">Restaurant Management</h4>
                <p className="mt-2 text-gray-600">Easily add and update your restaurant details, cuisine, and photos.</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <CurrencyDollarIcon className="w-12 h-12 mx-auto text-blue-600" />
                <h4 className="mt-6 text-xl font-semibold">Menu Control</h4>
                <p className="mt-2 text-gray-600">Full control over your menu items and pricing via our powerful admin panel.</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <UserGroupIcon className="w-12 h-12 mx-auto text-blue-600" />
                <h4 className="mt-6 text-xl font-semibold">Secure & Scalable</h4>
                <p className="mt-2 text-gray-600">Built on the secure and reliable Manifest backend for peace of mind.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
