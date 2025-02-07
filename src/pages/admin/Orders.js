import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    api.get('/orders')
      .then(response => setOrders(response.data))
      .catch(error => {
        console.error('Error fetching orders:', error);
        // You could optionally log the error or display a message to the user in the UI
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      // Update the order status in the backend
      const response = await api.put(`/orders/${id}`, { status });

      // Update the orders state with the new status
      setOrders(orders.map(order => order._id === id ? { ...order, status: response.data.status } : order));

      // Optionally log to the console or handle success in another way
      console.log('Order status updated!');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Manage Orders</h1>
      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">No orders available.</div>
      ) : (
        <div className="list-group">
          {orders.map(order => (
            <div key={order._id} className="list-group-item">
              <h5>Order ID: {order._id}</h5>
              <p>Status: 
                <span className={`badge ${order.status === 'pending' ? 'bg-warning' : order.status === 'preparing' ? 'bg-info' : 'bg-success'}`}>
                  {order.status}
                </span>
              </p>
              <p>Total: ${order.total}</p>
              <div className="mt-2">
                <button 
                  className="btn btn-sm btn-info me-2" 
                  onClick={() => updateStatus(order._id, 'preparing')}
                  disabled={order.status === 'preparing' || order.status === 'delivered'}
                >
                  Mark as Preparing
                </button>
                <button 
                  className="btn btn-sm btn-success" 
                  onClick={() => updateStatus(order._id, 'delivered')}
                  disabled={order.status === 'delivered'}
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
