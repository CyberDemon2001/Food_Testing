import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    const fetchOrders = async () => {
      try {
        const ordersResponse = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchUserData();
    fetchOrders();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Order History</h1>
      <div className="text-center mb-4">
        {user && <h2>Welcome, {user.name}!</h2>}
      </div>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order._id} className="list-group-item">
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
