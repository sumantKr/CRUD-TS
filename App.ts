import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { API_ENDPOINT, PORT } from "./constants/constants";
import errorMiddleware from "./middleware/ErrorHandler.middleware";
import IController from "./types/Controller.type";

class App {
    public app: Application;
    public port: string | undefined;
    constructor(controllers: IController[], port: string | undefined) {
        this.app = express();
        this.port = PORT;

        this.connectToTheDatabase();
        this.initializeMiddleWares();
        this.initializeControllers(controllers)
        this.initializeErrorHandler();
    }
    initializeErrorHandler() {
        this.app.use(errorMiddleware);
    }
    public connectToTheDatabase() {

        mongoose.connect(`${process.env.MONGO_PATH}`).then((res) => {
            console.log(`MONGODB Connected On ${process.env.MONGO_PATH}`);
        }).catch(err => {
            console.log(`🌋 | file: App.ts:28 | App | mongoose.connect | err`, err)
        });
    }
    private initializeMiddleWares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser(["Authorization","AccessToken"]));
        this.app.use(morgan("dev"));
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Credentials',"true")
            // set the CORS policy
            res.header('Access-Control-Allow-Origin', 'include');
            // set the CORS headers
            res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
            // set the CORS method headers
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
                return res.status(200).json({});
            }
            next();
        });
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller: IController) => {
            this.app.use(`${API_ENDPOINT}`, controller.router);
        });
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🌋 | App listening on the port ${this.port}`)
        });
    }
}

export default App;