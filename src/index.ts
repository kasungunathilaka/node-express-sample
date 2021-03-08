import express, { Express } from "express";
import cors from "cors";
import router from "./routes/routes";

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Otrium application." });
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});