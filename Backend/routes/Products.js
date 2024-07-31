import express from 'express';
import {
    createProducts,
    getProducts,
    deleteProducts
} from '../controllers/Products.js';


const router = express.Router();


//subCatergation
router.post('/api/products', createProducts);
router.get('/api/getproducts', getProducts);
router.delete('/Products/:id', deleteProducts);
export default router