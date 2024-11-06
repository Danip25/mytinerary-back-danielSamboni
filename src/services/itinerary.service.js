import Itinerary from '../models/intinerary.model.js';
import Activity from '../models/activity.model.js';

// Crear un nuevo itinerario
export const createItinerary = async data => {
  try {
    const itinerary = new Itinerary(data);
    await itinerary.save();
    return itinerary;
  } catch (error) {
    throw new Error('Error al crear el itinerario: ' + error.message);
  }
};

// Obtener itinerarios con opción de filtrar por usuario y ciudad
export const getItineraries = async (filters = {}) => {
  try {
    return await Itinerary.find(filters).populate('author city').lean();
  } catch (error) {
    throw new Error('Error al obtener itinerarios: ' + error.message);
  }
};

// Obtener un itinerario específico con sus actividades
export const getItineraryWithActivities = async itineraryId => {
  try {
    const itinerary = await Itinerary.findById(itineraryId)
      .populate('author city')
      .lean();
    if (!itinerary) throw new Error('Itinerario no encontrado');

    const activities = await Activity.find({ itinerary: itineraryId })
      .sort({ order: 1 })
      .lean();
    return { ...itinerary, activities };
  } catch (error) {
    throw new Error(
      'Error al obtener el itinerario con actividades: ' + error.message,
    );
  }
};

// Actualizar un itinerario
export const updateItinerary = async (itineraryId, data) => {
  try {
    return await Itinerary.findByIdAndUpdate(itineraryId, data, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el itinerario: ' + error.message);
  }
};

// Eliminar un itinerario y sus actividades asociadas
export const deleteItinerary = async itineraryId => {
  try {
    await Activity.deleteMany({ itinerary: itineraryId }); // Eliminar actividades relacionadas
    return await Itinerary.findByIdAndDelete(itineraryId);
  } catch (error) {
    throw new Error('Error al eliminar el itinerario: ' + error.message);
  }
};
