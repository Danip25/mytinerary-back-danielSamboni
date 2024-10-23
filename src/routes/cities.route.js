import express from 'express';
import controller from '../controllers/cities.controller.js';
import { CitiesLoadNotHaveAllFields } from '../middlewares/cities.middleware.js';

const router = express.Router();

router.get('/', controller.getAllCities);
router.get('/:id', controller.getCityById);
router.post('/', controller.createCity);
router.post('/load', CitiesLoadNotHaveAllFields, controller.createCities);
router.put('/:id', controller.updateCity);
router.delete('/:id', controller.deleteCity);



export default router;