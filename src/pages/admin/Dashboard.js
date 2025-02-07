import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch orders
    api.get('/admin/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));

    // Fetch restaurants
    api.get('/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row">
        {/* Orders Section */}
        <div className="col-md-6">
          <h2>Orders</h2>
          <div className="list-group">
            {orders.map(order => (
              <div key={order._id} className="list-group-item">
                <h5>Order ID: {order._id}</h5>
                <p>Status: <span className={`badge ${order.status === 'pending' ? 'bg-warning' : order.status === 'preparing' ? 'bg-info' : 'bg-success'}`}>
                  {order.status}
                </span></p>
                <p>Total: ${order.total}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="col-md-6">
          <h2>Restaurants</h2>
          <div className="list-group">
            {restaurants.map(restaurant => (
              <div key={restaurant._id} className="list-group-item">
                <h5>{restaurant.name}</h5>
                <p>{restaurant.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;