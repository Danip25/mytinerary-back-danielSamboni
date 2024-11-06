import City from '../models/cities.model.js';
import cities from '../data/cities.json' assert { type: 'json' };

export const intializateCityModel = async () => {
  try {
    try {
      const citiesLenght = await City.countDocuments();
      if (citiesLenght === 0) {
        await City.insertMany(cities);
      }
      console.log('City collection created successfully');
    } catch (error) {
      console.error(error);
    }
  } catch (ErrorToInitDummyData) {
    console.error({
      message: ErrorToInitDummyData.message,
      ErrorToInitDummyData,
    });
  }
};
