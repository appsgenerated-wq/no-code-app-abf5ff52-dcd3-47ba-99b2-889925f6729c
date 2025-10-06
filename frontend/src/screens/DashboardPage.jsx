import React, { useEffect, useState } from 'react';
import config from '../constants';
import { PlusIcon, PhotoIcon, BuildingStorefrontIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, restaurants, onLogout, onLoadRestaurants, onCreateRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState({ name: '', description: '', cuisine: 'Italian' });
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    onLoadRestaurants();
  }, []);

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    await onCreateRestaurant(newRestaurant);
    setNewRestaurant({ name: '', description: '', cuisine: 'Italian' });
    setFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600">Manage your restaurants below.</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-300 flex items-center space-x-2"
            >
              <BuildingStorefrontIcon className='w-5 h-5'/>
              <span>Admin Panel</span>
            </a>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className='w-5 h-5'/>
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main>
          <div className="mb-8">
            <button
              onClick={() => setFormVisible(!isFormVisible)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <PlusIcon className="w-5 h-5" />
              <span>{isFormVisible ? 'Cancel' : 'Add New Restaurant'}</span>
            </button>
          </div>

          {isFormVisible && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">New Restaurant Details</h2>
              <form onSubmit={handleCreateRestaurant} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g., The Italian Place"
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                 <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    placeholder="A short description of your restaurant"
                    value={newRestaurant.description}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine</label>
                  <select
                     id="cuisine"
                     value={newRestaurant.cuisine}
                     onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
                     className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Italian</option>
                    <option>Mexican</option>
                    <option>Japanese</option>
                    <option>American</option>
                    <option>Indian</option>
                    <option>Thai</option>
                  </select>
                </div>
                <p className='text-sm text-gray-500'>Restaurant photo can be added via the Admin Panel after creation.</p>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">Create Restaurant</button>
              </form>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Restaurants</h2>
            {restaurants.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No restaurants found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding a new restaurant.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(resto => (
                  <div key={resto.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
                    {resto.photo ? (
                        <img src={resto.photo.thumbnail.url} alt={resto.name} className="w-full h-48 object-cover" />
                    ) : (
                       <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                         <PhotoIcon className="w-12 h-12 text-gray-400"/>
                       </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900">{resto.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 truncate">{resto.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mt-2 px-2.5 py-0.5 rounded-full">{resto.cuisine}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
