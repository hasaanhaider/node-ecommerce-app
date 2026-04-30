const express = require('express');
const app = express();

const authRoutes = require('./modules/auth/auth.routes');
const addressRoutes = require('./modules/addresses/address.routes');

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/addresses', addressRoutes);


module.exports = app;