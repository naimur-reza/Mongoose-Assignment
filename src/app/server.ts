import mongoose from "mongoose";
import { app } from "./app";

const port = 5000;

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/assignment");
    console.log("Database connected!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main().catch(err => console.log(err));
