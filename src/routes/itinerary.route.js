import express from 'express';
import {
  getAllItineraries,
  getItinerariesByCity,
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} from '../controllers/itinerary.controller.js';

const router = express.Router();

router.get('/', getAllItineraries);
router.get('/city/:cityId', getItinerariesByCity);
router.get('/:id', getItineraryById);
router.post('/', createItinerary);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

export default router;
