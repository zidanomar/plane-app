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
export const deleteManyPlanes = (selectedItems) =>
  API.delete('/plane/deleteMany', { data: selectedItems });

// CUSTOMER ROUTES
export const getAllCustomers = () => API.get('/customer');
export const addNewCustomer = (newCustomerData) =>
  API.post('/customer', newCustomerData);
export const updateCustomer = (customerId, newCustomer) =>
  API.patch(`/customer/${customerId}`, newCustomer);
export const deleteCustomer = (customerId) =>
  API.delete(`/customer/${customerId}`);
export const deleteManyCustomers = (selectedItems) =>
  API.delete('/customer/deleteMany', { data: selectedItems });

// FLIGHT ROUTES
export const getAllFlights = () => API.get('/flight');
export const addNewFlight = (newFlightData) =>
  API.post('/flight', newFlightData);
export const updateFlight = (flightId, flightData) =>
  API.patch(`/flight/${flightId}`, flightData);
export const deleteFlight = (flightId) => API.delete(`/flight/${flightId}`);
export const deleteManyFlights = (selectedItems) => {
  API.post('/flight/deleteMany', { data: selectedItems });
};
