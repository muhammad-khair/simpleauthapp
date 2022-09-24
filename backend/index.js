import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes.js';
import { createServer } from 'http';
dotenv.config();

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_SERVER,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
}));
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello World from simpleauthapp');
});
app.use("/api", router);

const port = process.env.PORT;
const httpServer = createServer(app);
httpServer.listen(port);
console.log(`App simpleauthapp listening on port ${port}`);
