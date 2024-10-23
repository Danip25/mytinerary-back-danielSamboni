import citiesModel from "../models/cities.model.js";

export default {
  getAllCities: async () => citiesModel.find(),
  getCityById: async (id) => citiesModel.findById(id),
  createCity: async (city) => citiesModel.create(city),
  updateCity: async (id, city) => citiesModel.findByIdAndUpdate(id, city),
  deleteCity: async (id) => citiesModel.findByIdAndDelete(id),
  searchCities: async (search) =>
    citiesModel.find({ city: { $regex: `\\b${search}`, $options: "i" } }),
  getAllCitiesWithFilter: async (search, getFavorites, sortByName) => {
    const filter = {};
    if (getFavorites) {
      filter.favorite = getFavorites;
    }
    if (search) {
      filter.city = { $regex: `\\b${search}`, $options: "i" };
    }
    return citiesModel
      .find(filter)
      .sort(sortByName ? { city: Number(sortByName)  } : {});
  },
  createCities: async (cities) => citiesModel.insertMany(cities),
};
