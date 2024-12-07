// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');
const serviceRoutes = require('./routes/service.route');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: "1mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "1mb", extended: true })); // Increase URL-encoded payload limit
app.use(bodyParser.json());
app.use(cors());
// Serve static files from the "public" directory
app.use("/public", express.static(path.join(__dirname, "public")));
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err) => {
  console.log('Error syncing the database:', err);
});
