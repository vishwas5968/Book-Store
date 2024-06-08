import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true
  },
  bookImage: {
    type: String
  }
});

export default model('Book', bookSchema);
