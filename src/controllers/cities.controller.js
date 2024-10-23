import citiesService from "../services/cities.service.js";

export default {
  getAllCities: async (req, res) => {
    try {
      let cities = [];
      const { search, getFavorites, sortByName } = req.query;
      cities = await citiesService.getAllCitiesWithFilter(search, getFavorites, sortByName);
      res.status(200).json({ message: "All Cities", data: cities });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
    getCityById: async (req, res) => {
        try {
        const city = await citiesService.getCityById(req.params.id);
        res.status(200).json({ message: city.name, data: city });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    createCity: async (req, res) => {
        try {
        const city = await citiesService.createCity(req.body);
        res.status(201).json({ message: city.name, data: city });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    createCities: async (req, res) => {
        try {
        const cities = await citiesService.createCities(req.body.cities);
        res.status(201).json({ message: "Cities created", data: cities });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    updateCity: async (req, res) => {
        try {
        const city = await citiesService.updateCity(req.params.id, req.body);
        res.status(200).json({ message: city.name, data: city });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    deleteCity: async (req, res) => {
        try {
        const city = await citiesService.deleteCity(req.params.id);
        res.status(200).json({ message: city.name, data: city });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
};
