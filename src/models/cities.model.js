import { model, Schema } from "mongoose";

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

export default model("Cities", CitySchema);
