import express from 'express';
import citiesRoutes from './cities.route.js';
import usersRoutes from './users.route.js';
import itinerariesRoutes from './itinerary.route.js';

const router = express.Router();

router.use('/cities', citiesRoutes);
router.use('/users', usersRoutes);
router.use('/itineraries', itinerariesRoutes);

export default router;
