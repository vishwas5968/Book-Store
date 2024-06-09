import { model, Schema } from 'mongoose';

const wishlistSchema = new Schema({
  wishlistOwner: {
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
      }
    }
  ]
});

export default model('Wishlist', wishlistSchema);
