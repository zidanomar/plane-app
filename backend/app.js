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
const authRoutes = require('./routes/authRoutes'); // Auth Routes
const userRoutes = require('./routes/UserRoutes');
const planeRoutes = require('./routes/planeRoutes'); // Plane Controller
const companyRoutes = require('./routes/companyRoutes'); // Company Routes
const flightRoutes = require('./routes/flightRoutes'); // Flight Routes
const likeRoutes = require('./routes/likeRoutes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/plane', planeRoutes);
app.use('/company', companyRoutes);
app.use('/flight', flightRoutes);
app.use('/like', likeRoutes);

// START UP SERVER;
app.listen({ port: 5000 }, async () => {
  console.log('Server started');
  await sequelize.authenticate();
  console.log('database connected');
});
