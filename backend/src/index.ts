import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { app } from "./app";

dotenv.config({
  path: path.join(__dirname, "../", ".env"),
});

const PORT = process.env.PORT || 8080;
const DB_HOST = process.env.MONGO_URL;

(async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_HOST);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
})();
