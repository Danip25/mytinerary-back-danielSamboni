export const NotHasAllRequiredFields = (req, res, next) => {
    const { city, country, place, place_to_visit, image, description, location } = req.body;
    if (!city || !country || !place || (!place_to_visit || !place_to_visit?.length) || !image || !description || !location || !location.lat || !location.long) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    next();
};
export const CitiesLoadNotHaveAllFields = (req, res, next) => {
    const { cities } = req.body;
    if (cities && Array.isArray(cities) && cities?.length > 0) {
        const hasCorrectMode = cities.some(({ city, country, place, place_to_visit, image, description, location }) => (!city || !country || !place || (!place_to_visit || !place_to_visit?.length) || !image || !description || !location || !location.lat || !location.long))
        if (hasCorrectMode) return next()
    }
    res.status(500).json({ message: "Cities have not the correct model, every city should has city, country, place, place_to_visit, image, description, location(a json with lat and long property), all of these changes are required" })
};