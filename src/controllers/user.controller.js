import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service.js';
import * as ItineraryService from '../services/itinerary.service.js';

export const register = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  try {
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserService.createUser({
      name,
      email,
      password: hashedPassword,
      avatar,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await UserService.updateUser(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

export const getUserItineraries = async (req, res) => {
  const { id } = req.params;
  try {
    const itineraries = await ItineraryService.getItineraries({ author: id });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener itinerarios del usuario',
      error: error.message,
    });
  }
};
