import { model, Schema } from 'mongoose';

const ItinerarySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  duration: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  hashtags: {
    type: Array,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

/*
Example

{
  "name": "Beach Sunset Party",
  "price": 4,
  "duration": 5,
  "likes": 0,
  "hashtags": ["#beach", "#sunset", "#party"],
  "author": "60f7e7f0f9c4a60015e3e7c5",
  "city": "60f7e7f0f9c4a60015e3e7c6",
}
*/

ItinerarySchema.index({ city: 1, author: 1 });

export default model('Itinerary', ItinerarySchema);
