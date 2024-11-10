import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import router from "./routes/route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/public", express.static(path.join(__dirname, "..", "uploads")));
// app.use("/static", express.static(path.join(__dirname, "..", "public")));

// Enable CORS
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "You server is running" });
});
// cookie parser
app.use(cookieParser());

// Mount the router
app.use(router);

export default app;
