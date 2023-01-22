import express from 'express';
import auth from './verifyToken.js';
import {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
} from '../controllers/BookController.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', auth, addBook);
router.put('/books/:id', auth, editBookById);
router.delete('/books/:id', auth, deleteBookById);

export default router;
