import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  bookName: {
    type: String
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  discountPrice: {
    type: Number
  },
  quantity: {
    type: Number
  },
  admin_user_id: {
    type: String
  },
  bookImage: {
    type: String
  }
});

export default model('Book', bookSchema);
