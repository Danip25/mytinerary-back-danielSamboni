import { model, Schema } from 'mongoose';

const ActivitySchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  itinerary: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true,
  },
});

export default model('Activity', ActivitySchema);
