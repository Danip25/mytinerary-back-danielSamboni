import * as ItineraryService from '../services/itinerary.service.js';

// Consultar todos los itinerarios
export const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await ItineraryService.getItineraries();
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los itinerarios',
      error: error.message,
    });
  }
};

// Consultar itinerarios de una ciudad específica
export const getItinerariesByCity = async (req, res) => {
  const { cityId } = req.params;
  try {
    const itineraries = await ItineraryService.getItineraries({ city: cityId });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los itinerarios de la ciudad',
      error: error.message,
    });
  }
};

// Consultar un itinerario por su ID
export const getItineraryById = async (req, res) => {
  const { id } = req.params;
  try {
    const itinerary = await ItineraryService.getItineraryWithActivities(id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el itinerario',
      error: error.message,
    });
  }
};

// Crear un nuevo itinerario
export const createItinerary = async (req, res) => {
  try {
    const itinerary = await ItineraryService.createItinerary(req.body);
    res.status(201).json(itinerary);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear el itinerario', error: error.message });
  }
};

// Modificar un itinerario
export const updateItinerary = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItinerary = await ItineraryService.updateItinerary(
      id,
      req.body,
    );
    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' });
    }
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el itinerario',
      error: error.message,
    });
  }
};

// Borrar un itinerario
export const deleteItinerary = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItinerary = await ItineraryService.deleteItinerary(id);
    if (!deletedItinerary) {
      return res.status(404).json({ message: 'Itinerario no encontrado' });
    }
    res.status(200).json({ message: 'Itinerario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el itinerario',
      error: error.message,
    });
  }
};
