import express from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categories.js';
import SubcategoryRoutes  from './routes/subcategory.js'
import ProductRoutes  from './routes/Products.js'
import userRoute from './routes/user.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const mongoDBURI = process.env.mongoDBURI;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect(mongoDBURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Use routes
app.use('/', categoryRoutes);
app.use('/',SubcategoryRoutes);
app.use('/',ProductRoutes);
app.use("/",userRoute);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
