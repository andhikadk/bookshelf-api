import Book from '../models/BookModel.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      data: {
        books,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const addBook = async (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  const book = new Book(newBook);

  try {
    const insertedBook = await book.save();
    res.status(201).json({
      status: 'success',
      data: {
        insertedBook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const editBookById = async (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };

  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      { $set: newBook }
    );
    res.status(200).json({
      status: 'success',
      data: {
        newBook,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const deletedBook = await Book.deleteOne({ _id: req.params.id });
    if (!book) {
      res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// export const addBook = (req, res) => {
//   const {
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     reading,
//   } = req.body;

//   const id = nanoid(16);
//   const finished = pageCount === readPage;
//   const insertedAt = new Date().toISOString();
//   const updatedAt = insertedAt;

//   const newBook = {
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     reading,
//     id,
//     finished,
//     insertedAt,
//     updatedAt,
//   };

//   books.push(newBook);

//   if (name === undefined) {
//     books.pop();
//     res.status(400).json({
//       status: 'fail',
//       message: 'Gagal menambahkan buku. Mohon isi nama buku',
//     });
//   }

//   if (readPage > pageCount) {
//     books.pop();
//     res.status(400).json({
//       status: 'fail',
//       message:
//         'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
//     });
//   }

//   const isSuccess = books.filter((book) => book.id === id).length > 0;

//   if (isSuccess) {
//     res.status(201).json({
//       status: 'success',
//       message: 'Buku berhasil ditambahkan',
//       data: {
//         bookId: id,
//       },
//     });
//   }

//   res.status(500).json({
//     status: 'error',
//     message: 'Buku gagal ditambahkan',
//   });
// };

// export const getAllBooks = (req, res) => {
//   if (req.query.name !== undefined) {
//     const filteredBooks = books.filter((book) => {
//       const regex = new RegExp(req.query.name, 'gi');
//       return book.name.match(regex);
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         books: filteredBooks.map(({ id, name, publisher }) => ({
//           id,
//           name,
//           publisher,
//         })),
//       },
//     });
//   }

//   if (req.query.reading === '1') {
//     const filteredBooks = books.filter((book) => book.reading === true);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         books: filteredBooks.map(({ id, name, publisher }) => ({
//           id,
//           name,
//           publisher,
//         })),
//       },
//     });
//   }

//   if (req.query.reading === '0') {
//     const filteredBooks = books.filter((book) => book.reading === false);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         books: filteredBooks.map(({ id, name, publisher }) => ({
//           id,
//           name,
//           publisher,
//         })),
//       },
//     });
//   }

//   if (req.query.finished === '1') {
//     const filteredBooks = books.filter((book) => book.finished === true);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         books: filteredBooks.map(({ id, name, publisher }) => ({
//           id,
//           name,
//           publisher,
//         })),
//       },
//     });
//   }

//   if (req.query.finished === '0') {
//     const filteredBooks = books.filter((book) => book.finished === false);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         books: filteredBooks.map(({ id, name, publisher }) => ({
//           id,
//           name,
//           publisher,
//         })),
//       },
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       books: books.map(({ id, name, publisher }) => ({
//         id,
//         name,
//         publisher,
//       })),
//     },
//   });
// };

// export const getBookById = (req, res) => {
//   const { bookId } = req.params;

//   const book = books.filter((b) => b.id === bookId)[0];

//   if (book !== undefined) {
//     res.status(200).json({
//       status: 'success',
//       data: {
//         book,
//       },
//     });
//   }

//   res.status(404).json({
//     status: 'fail',
//     message: 'Buku tidak ditemukan',
//   });
// };

// export const editBookById = (req, res) => {
//   const { bookId } = req.params;

//   const {
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     reading,
//   } = req.body;

//   const updatedAt = new Date().toISOString();

//   const index = books.findIndex((book) => book.id === bookId);

//   if (index !== -1) {
//     if (name === undefined) {
//       res.status(400).json({
//         status: 'fail',
//         message: 'Gagal memperbarui buku. Mohon isi nama buku',
//       });
//     }

//     if (readPage > pageCount) {
//       res.status(400).json({
//         status: 'fail',
//         message:
//           'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
//       });
//     }

//     books[index] = {
//       ...books[index],
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading,
//       updatedAt,
//     };

//     res.status(200).json({
//       status: 'success',
//       message: 'Buku berhasil diperbarui',
//     });
//   }

//   res.status(404).json({
//     status: 'fail',
//     message: 'Gagal memperbarui buku. Id tidak ditemukan',
//   });
// };

// export const deleteBookById = (req, res) => {
//   const { bookId } = req.params;

//   const index = books.findIndex((book) => book.id === bookId);

//   if (index !== -1) {
//     books.splice(index, 1);
//     res.status(200).json({
//       status: 'success',
//       message: 'Buku berhasil dihapus',
//     });
//   }

//   res.status(404).json({
//     status: 'fail',
//     message: 'Buku gagal dihapus. Id tidak ditemukan',
//   });
// };
