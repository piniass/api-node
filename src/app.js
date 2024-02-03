import express from 'express';
import morgan  from "morgan";
import zapatillasRoutes from "./routes/zapatillas.routes";

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use("/api/zapatillas",zapatillasRoutes);

export default app;