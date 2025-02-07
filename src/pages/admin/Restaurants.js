import React, { useState } from 'react';
import api from '../../utils/api';

const Restaurants = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [menu, setMenu] = useState([]);
  const [menuItem, setMenuItem] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  // Add a menu item to the list
  const handleAddMenuItem = () => {
    if (menuItem.name && menuItem.price) {
      setMenu([...menu, menuItem]);
      setMenuItem({ name: '', price: '' }); // Clear the input fields
    } else {
      setMessage('Please fill in both fields for the menu item.');
    }
  };

  // Submit the restaurant data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || menu.length === 0) {
      setMessage('Please fill in all fields and add at least one menu item.');
      return;
    }

    try {
      const response = await api.post('/admin/restaurants', { name, location, menu });
      setMessage('Restaurant added successfully!');
      console.log(response.data);
      // Clear the form
      setName('');
      setLocation('');
      setMenu([]);
    } catch (error) {
      setMessage('Failed to add restaurant. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add Restaurant</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        {/* Restaurant Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Restaurant Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Restaurant Location */}
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Menu Items */}
        <div className="mb-3">
          <h4>Menu Items</h4>
          {menu.map((item, index) => (
            <div key={index} className="mb-2">
              <span>{item.name} - ${item.price}</span>
            </div>
          ))}
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Item Name"
                value={menuItem.name}
                onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={menuItem.price}
                onChange={(e) => setMenuItem({ ...menuItem, price: e.target.value })}
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddMenuItem}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Add Restaurant</button>
      </form>
    </div>
  );
};

export default Restaurants;