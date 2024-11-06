import express from 'express';
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserItineraries,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/itineraries', getUserItineraries);

export default router;
