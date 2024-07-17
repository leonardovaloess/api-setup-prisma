import { Router } from "express";
import userController from "./controllers/user.controller.js";
import loginController from "./controllers/login.controller.js";
import verifyJWT from "./services/auth.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ ok: true });
});

// Rotas de users

routes.post("/users", userController.createUser);

routes.get("/users", verifyJWT, userController.getUsers);

routes.get("/users/:user_id", verifyJWT, userController.getUserById);

// Rotas de login e logout e sign up

routes.post("/sign-up", loginController.signUp);

routes.post("/login", loginController.login);

routes.post("/logout", loginController.logout);

export default routes;
