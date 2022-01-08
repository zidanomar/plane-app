const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { sequelize } = require('./database/models');
const db = require('./utility/dbconfig');

const app = express();

// SETUP MIDDLEWARES
app.use(cors());
app.use(express.json());
dotenv.config({ path: './.env' });

// SETUP ROUTES
const planeRoutes = require('./routes/planeRoutes'); // Plane Controller
const customerRoutes = require('./routes/customerRoutes'); // Customer Routes
const flightRoutes = require('./routes/flightRoutes'); // Flight Routes
const authRoutes = require('./routes/authRoutes'); // Auth Routes

app.use('/plane', planeRoutes);
app.use('/customer', customerRoutes);
app.use('/flight', flightRoutes);
app.use('/auth', authRoutes);

// START UP SERVER;
app.listen({ port: 5000 }, async () => {
  console.log('Server started');
  await sequelize.authenticate();
  console.log('database connected');
});
