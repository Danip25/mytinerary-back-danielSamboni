import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/services/mongo.service.js";

import citiesRoute from "./src/routes/cities.route.js";
import { ErrorHandler, NotFoundPath } from "./src/middlewares/errors.middleware.js";

import { PORT } from "./src/config/env.config.js";

dotenv.config();

const app = express();


const initApp = async () => {
    try {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cors());
      
      await connectDB()

      
      app.use("/api/v1/cities", citiesRoute);
      
      app.use(ErrorHandler);
      app.use(NotFoundPath);
      
      app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
      });

  } catch (error) {
    console.error(error);
  }
}

initApp();

export default app;
