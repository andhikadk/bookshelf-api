import mongoose from 'mongoose';

const Book = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model('Books', Book);
