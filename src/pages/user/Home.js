import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.get('/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.error(error));
      
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Restaurants</h1>
      <div className="row">
        {restaurants.map(restaurant => (
          <div key={restaurant._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">{restaurant.location}</p>
                <a href={`/restaurant/${restaurant._id}`} className="btn btn-primary">View Menu</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;