export const NotFoundPath = (_, res, __) => {
  res.status(404).json({ message: 'Path not found' });
};

export const ErrorHandler = (error, _, res, __) => {
  res.status(500).json({ message: error.message });
};
