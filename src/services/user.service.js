import User from '../models/user.model.js';

export const createUser = async data => {
  try {
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

export const getUsers = async () => {
  try {
    return await User.find().lean();
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

export const getUserById = async userId => {
  try {
    return await User.findById(userId).lean();
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

export const getUserByEmail = async email => {
  try {
    return await User.findOne({ email }).lean();
  } catch (error) {
    throw new Error('Error al obtener el usuario por email: ' + error.message);
  }
};

export const updateUser = async (userId, data) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

export const deleteUser = async userId => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};
