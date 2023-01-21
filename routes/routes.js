import express from 'express';
import {
  addBook,
  editBookById,
  getAllBooks,
  getBookById,
  deleteBookById,
} from '../controllers/BookController.js';

const router = express.Router();

router.post('/books', addBook);
router.get('/books', getAllBooks);
router.get('/books/:bookId', getBookById);
router.put('/books/:bookId', editBookById);
router.delete('/books/:bookId', deleteBookById);

export default router;
