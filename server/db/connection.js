import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || ""; 

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Await the connection
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Return the database instance
    return client.db("employees");
    
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    // Explicitly exit on failure
    process.exit(1); 
  }
}

export default connectToDatabase;