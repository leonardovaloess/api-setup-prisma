import { Router } from "express";
import userController from "./controllers/user.controller.js";
import loginController from "./controllers/login.controller.js";
import jwt from "jsonwebtoken";
import { prisma } from "./services/prisma.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ ok: true });
});

async function verifyJWT(req, res, next) {
  const token = req.headers["token-auth"];

  const tokenInBlackList = await prisma.blacklist.findUnique({
    where: {
      token: token,
    },
  });

  if (tokenInBlackList) {
    return res.status(401).json({ error: "permissão negada" });
  }
  console.log(tokenInBlackList);

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "permissão negada" });

    req.userId = decoded.userId;
    next();
  });
}

// Rotas de users

routes.post("/users", userController.createUser);

routes.get("/users", verifyJWT, userController.getUsers);

routes.get("/users/:user_id", userController.getUserById);

// Rotas de login e logout e sign up

routes.post("/sign-up", loginController.signUp);

routes.post("/login", loginController.login);

routes.post("/logout", loginController.logout);

export default routes;
