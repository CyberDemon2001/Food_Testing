import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/admin/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await api.put(`/admin/orders/${id}`, { status });
      alert('Order status updated!');
      setOrders(orders.map(order => order._id === id ? response.data : order));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Manage Orders</h1>
      <div className="list-group">
        {orders.map(order => (
          <div key={order._id} className="list-group-item">
            <h5>Order ID: {order._id}</h5>
            <p>Status: <span className={`badge ${order.status === 'pending' ? 'bg-warning' : order.status === 'preparing' ? 'bg-info' : 'bg-success'}`}>
              {order.status}
            </span></p>
            <p>Total: ${order.total}</p>
            <div className="mt-2">
              <button className="btn btn-sm btn-info me-2" onClick={() => updateStatus(order._id, 'preparing')}>Mark as Preparing</button>
              <button className="btn btn-sm btn-success" onClick={() => updateStatus(order._id, 'delivered')}>Mark as Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;