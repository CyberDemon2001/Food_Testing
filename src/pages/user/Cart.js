import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // Calculate the total price of items in the cart
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(total);
  };

  // Remove an item from the cart
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Place an order
  const handlePlaceOrder = async () => {
    const studentId = JSON.parse(localStorage.getItem('user')).id;
    const restaurantId = cart[0]?.restaurantId; // Assuming all items are from the same restaurant

    if (!studentId || !restaurantId || cart.length === 0) {
      setMessage('Cannot place an empty order.');
      return;
    }

    try {
      const response = await api.post(
        '/orders',
        { studentId, restaurantId, items: cart, total },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage('Order placed successfully!');
      // Clear the cart
      setCart([]);
      localStorage.removeItem('cart');
      // Redirect to home after 2 seconds
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Failed to place order. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cart</h1>
      {message && <div className="alert alert-info">{message}</div>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="list-group">
            {cart.map((item, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <button className="btn btn-danger" onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;