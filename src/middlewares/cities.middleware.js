export const NotHasAllRequiredFields = (req, res, next) => {
    const { city, country, place, place_to_visit, image, description, location } = req.body;
    if (!city || !country || !place || (!place_to_visit || !place_to_visit?.length) || !image || !description || !location || !location.lat || !location.long) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    next();
};