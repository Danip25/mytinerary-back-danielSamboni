import { model, Schema } from 'mongoose';

const CitySchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  places_to_visit: {
    type: Array,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
});

CitySchema.index({ favorite: 1 });
CitySchema.index({ 'location.lat': 1, 'location.long': 1 });

export default model('Cities', CitySchema);
