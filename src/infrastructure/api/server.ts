import { app } from "./express"
import dotenv from "dotenv";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen("Server is running", () => {
    console.log(`Server is listening on port ${port}`);
});
