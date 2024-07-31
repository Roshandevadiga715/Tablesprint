import express from 'express';
import {
    createSubCategory,
    getSubCategories,
    deleteSubCategory
} from '../controllers/subcategory.js';


const router = express.Router();


//subCatergation
router.post('/api/post/subcategory', createSubCategory);
router.get('/api/getsub', getSubCategories);
router.delete('/subcategories/:id', deleteSubCategory);
export default router