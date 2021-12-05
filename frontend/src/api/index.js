import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     req.headers['x-auth-token'] = token;
//   }

//   return req;
// });

// PLANE ROUTES
export const addNewPlane = (planeData) => API.post('/plane', planeData);
export const getAllPlanes = () => API.get('/plane');
export const getPlaneById = (planeId) => API.get(`/user/${planeId}`);
export const updatePlane = (planeId, planeData) =>
  API.patch(`/plane/${planeId}`, planeData);
export const deletePlane = (planeId) => API.delete(`/plane/${planeId}`);

// CUSTOMER ROUTES
export const getAllCustomers = () => API.get('/customer');
