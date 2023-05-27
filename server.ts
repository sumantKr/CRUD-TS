import App from "./App";
import { PORT } from "./constants/constants";
import PostController from "./controllers/Post/posts.controller";
import { UserController } from "./controllers/User/user.controller";
import AuthenticationController from "./controllers/authentication/authentication.controller";

const app = new App([
    new AuthenticationController(),
    new PostController(),
    new UserController()
], PORT)

app.listen();