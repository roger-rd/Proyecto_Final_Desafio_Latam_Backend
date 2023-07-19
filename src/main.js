import * as dotenv from "dotenv";
dotenv.config();

import express  from "express";
import cors from 'cors'
import userRouter  from "./user/user.route.js";


const app = express () ;

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter)


const PORT = process.env.PORT || 3000;
app. listen (PORT, () => {
    console.log(`Server listening on port ${PORT} ...`);
});