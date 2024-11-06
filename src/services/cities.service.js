import citiesModel from '../models/cities.model.js';

export default {
  getAllCities: async () => citiesModel.find(),
  getCityById: async id => citiesModel.findById(id),
  createCity: async city => citiesModel.create(city),
  updateCity: async (id, city) => citiesModel.findByIdAndUpdate(id, city),
  deleteCity: async id => citiesModel.findByIdAndDelete(id),
  searchCities: async search =>
    citiesModel.find({ city: { $regex: `\\b${search}`, $options: 'i' } }),
  getAllCitiesWithFilter: async (search, getFavorites, sortByName) => {
    const matchStage = {};
    const pipeline = [];

    if (getFavorites) {
      matchStage.favorite = true;
    }

    if (search) {
      matchStage.city = { $regex: new RegExp(`\\b${search}`, 'i') };
    }

    pipeline.push({ $match: matchStage });

    if (sortByName) {
      const sortStage = sortByName
        ? { city: sortByName > 0 ? 1 : -1 }
        : { city: 0 };
      pipeline.push({ $sort: sortStage });
    }

    pipeline.push(
      {
        $lookup: {
          from: 'itineraries',
          localField: '_id',
          foreignField: 'city',
          as: 'itineraries',
        },
      },
      {
        $unwind: {
          path: '$itineraries',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'itineraries.author',
          foreignField: '_id',
          as: 'itineraries.author',
        },
      },
      {
        $unwind: {
          path: '$itineraries.author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          city: { $first: '$city' },
          country: { $first: '$country' },
          place: { $first: '$place' },
          favorite: { $first: '$favorite' },
          image: { $first: '$image' },
          description: { $first: '$description' },
          places_to_visit: { $first: '$places_to_visit' },
          location: { $first: '$location' },
          itineraries: {
            $push: {
              $cond: [
                { $ifNull: ['$itineraries._id', false] },
                '$itineraries',
                '$$REMOVE',
              ],
            },
          },
          itineraryCount: {
            $sum: { $cond: [{ $ifNull: ['$itineraries._id', false] }, 1, 0] },
          },
        },
      },
    );

    const citiesWithItineraries = await citiesModel.aggregate(pipeline);

    return citiesWithItineraries;
  },
  createCities: async cities => citiesModel.insertMany(cities),
};
