import express from "express";
import cors from "cors";
import setupRecordRoutes from "./routes/record.js";
// Import the async connection function
import connectToDatabase from "./db/connection.js"; 

const PORT = process.env.PORT || 5050;
const app = express();
let db; // Placeholder for the database instance

async function initializeApp() {
    try {
        // 1. Await the database connection before proceeding
        db = await connectToDatabase();
        
        // 2. Pass the 'db' instance to your router if needed
        // (You may not need to change the 'records' import if it fetches 'db' from connection.js)
        
        // 3. Setup Middleware and Routes
        app.use(cors());
        app.use(express.json());
        app.use("/record", setupRecordRoutes(db)); 
        
        // 4. Start the Express server ONLY after the DB is ready
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to initialize server:", error);
        process.exit(1);
    }
}

initializeApp(); // Call the async function to start the application