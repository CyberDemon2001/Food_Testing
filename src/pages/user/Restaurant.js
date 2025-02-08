import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.get(`/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const addToCart = (item) => {
    const cartItem = { ...item, quantity, restaurantId: restaurant._id };
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...savedCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Item added to cart!');
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">{restaurant.name}</h1>
      <h2>Menu</h2>
      <div className="list-group">
        {restaurant.menu.map((item, index) => (
          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>${item.price}</p>
            </div>
            <div>
              <input
                type="number"
                className="form-control mb-2"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
              />
              <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;