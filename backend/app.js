const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/models');

const db = require('./utility/dbconfig');

const app = express();

// SETUP MIDDLEWARES
app.use(cors());
app.use(express.json());

// SETUP ROUTES
const planeRoutes = require('./routes/planeRoutes'); // Plane Controller
const customerRoutes = require('./routes/customerRoutes'); // Customer Routes
const flightRoutes = require('./routes/flightRoutes'); // Flight Routes

app.use('/plane', planeRoutes);
app.use('/customer', customerRoutes);
app.use('/flight', flightRoutes);

// START UP SERVER;
app.listen({ port: 5000 }, async () => {
  console.log('Server started');
  await sequelize.authenticate();
  console.log('database connected');
});
