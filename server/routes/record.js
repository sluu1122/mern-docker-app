import express from "express";
import { ObjectId } from "mongodb";

// router is an instance of the express router.
const router = express.Router();

// This file now exports a function that receives the connected database instance ('db')
export default function setupRecordRoutes(db) {

    // This section will help you get a list of all the records.
    router.get("/", async (req, res) => {
      try {
        // Use the passed-in 'db' instance to get the collection
        let collection = db.collection("records");
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving records.");
      }
    });

    // This section will help you get a single record by id
    router.get("/:id", async (req, res) => {
      try {
        let collection = db.collection("records");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching record.");
      }
    });

    // This section will help you create a new record.
    router.post("/", async (req, res) => {
      try {
        let newDocument = {
          name: req.body.name,
          position: req.body.position,
          level: req.body.level,
        };
        let collection = db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(201); // Use 201 for resource creation
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
      }
    });

    // This section will help you update a record by id.
    router.patch("/:id", async (req, res) => {
      try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
          $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
          },
        };

        let collection = db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
      }
    });

    // This section will help you delete a record
    router.delete("/:id", async (req, res) => {
      try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
      }
    });

    // Return the configured router instance
    return router;
}

// Ensure your server.js uses app.use("/record", setupRecordRoutes(db));