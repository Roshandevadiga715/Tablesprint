import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import {userAuthentication }from '../middlewares/userAuthentication.js';

const router = express.Router();

router.post('/api/post',userAuthentication, createCategory);
router.get('/api/get',userAuthentication, getCategories);
router.get('/:id',userAuthentication, getCategoryById);
router.put('/:id',userAuthentication ,updateCategory);
router.delete('/Categories/:id',userAuthentication, deleteCategory);



export default router;
