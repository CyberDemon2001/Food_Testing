import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// const fetchOrders = async () => {
//     try {
//       console.log('Fetching orders...');
//       const response = await api.get('/orders');
//       console.log('Response:', response.data);
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error.response ? error.response.data : error);
//     }
//   };

export default api;
