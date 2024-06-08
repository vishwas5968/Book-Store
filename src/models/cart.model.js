import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
  cartOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  books: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      },
      bookName: {
        type: String
      },
      description: {
        type: String
      },
      author: {
        type: String
      },
      bookImage: {
        type: String,
        default: null
      },
      price: {
        type: Number
      },
      discountPrice: {
        type: Number
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ],
  cartTotal: {
    type: Number
  },
  isPurchased: {
    type: Boolean,
    default: false
  }
});

export default model('Cart', cartSchema);
