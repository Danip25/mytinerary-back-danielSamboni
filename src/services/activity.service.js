import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Itinerary from '../models/itinerary.model.js';

// Crear un nuevo usuario
export const createUser = async data => {
  try {
    const { name, email, password } = data;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con la contraseña encriptada
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    return await User.find().lean();
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

// Obtener un usuario por ID
export const getUserById = async userId => {
  try {
    return await User.findById(userId).lean();
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

// Obtener un usuario por email (para autenticación)
export const getUserByEmail = async email => {
  try {
    return await User.findOne({ email }).lean();
  } catch (error) {
    throw new Error('Error al obtener el usuario por email: ' + error.message);
  }
};

// Actualizar un usuario
export const updateUser = async (userId, data) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

// Eliminar un usuario
export const deleteUser = async userId => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

// Registro de usuario con encriptación de contraseña
export const register = async data => {
  try {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Crear el usuario
    const user = await createUser(data);
    return user;
  } catch (error) {
    throw new Error('Error en el registro del usuario: ' + error.message);
  }
};

// Inicio de sesión del usuario
export const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales incorrectas');
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { token, user };
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
};

// Obtener los itinerarios creados por un usuario
export const getUserItineraries = async userId => {
  try {
    return await Itinerary.find({ author: userId }).populate('city').lean();
  } catch (error) {
    throw new Error(
      'Error al obtener los itinerarios del usuario: ' + error.message,
    );
  }
};
