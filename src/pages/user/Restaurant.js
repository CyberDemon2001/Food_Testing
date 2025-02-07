// Restaurant component
import React, { useEffect, useState } from "react";
import api from "../../utils/api";  // Use the axios instance with base URL
import { useParams } from "react-router-dom";

const Restaurant = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("Fetching restaurant data for ID:", id);  // Log the restaurant ID
        
        // Use api to make the request
        api.get(`/restaurants/${id}`)
            .then(response => {
                if (response.status === 404) {
                    console.error("Restaurant not found:", response);
                } else {
                    console.log("Response data:", response.data);  // Log the response data
                    setRestaurant(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);  // Log the error
                setError('Failed to fetch restaurant data. Please try again later.');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">{restaurant.name}</h1>
            <h2 className="text-center">Menu</h2>

            {/* Ensure restaurant.menu exists and is an array before trying to map over it */}
            {Array.isArray(restaurant.menu) && restaurant.menu.length > 0 ? (
                <ul className="list-group">
                    {restaurant.menu.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No menu available</p>
            )}
        </div>
    );
};

export default Restaurant;
