import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/Routes.js";
import fs from "fs";
import Item from "./model/Item.js";
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const CONTEXT_PATH = process.env.CONTEXT_PATH || '/api/v1';

const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yml', 'utf8'));

app.use(cors());
app.use(express.json());
app.use(CONTEXT_PATH + "/items", router);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully.");
        await seedDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        const items = await Item.find();
        if (items.length === 0) {
            const magicItems = JSON.parse(fs.readFileSync('./resources/magicItems.json', 'utf8'));
            await Item.insertMany(magicItems);
            console.log("Database seeded successfully.");
        } else {
            console.log("Database already seeded.");
        }
    } catch (error) {
        console.error("Error seeding database (might already be seeded): ", error.message);
    }
};

startServer();

export const getBackendResponse = (status, message, data) => {
    return {
        timestamp: new Date().toISOString(),
        status: status,
        message: message,
        data: data
    };
}