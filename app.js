const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./modules/auth/auth.routes');
const addressRoutes = require('./modules/addresses/address.routes');
const errorMiddleware = require('./middlewares/error.middleware');

// ✅ CORS MUST be first
app.use(cors({
  origin: "http://localhost:4000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// (optional but good)
app.use(cors());
app.options(/.*/, cors());
// middleware
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/admin/categories', require('./modules/admin/categories/categories.routes'));

// error handler
app.use(errorMiddleware);

module.exports = app;