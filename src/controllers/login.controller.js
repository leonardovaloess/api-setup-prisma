import loginService from "../services/login.service.js";
import jwt from "jsonwebtoken";

const loginController = {
  signUp: async (req, res) => {
    try {
      const user = await loginService.signUp(req.body);
      
      const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: 5000,
      });

      return res.status(200).json({ user, token: token });
    } catch (error) {
      return res.status(400).send("Erro ao criar conta");
    }
  },
  login: async (req, res) => {
    try {
      const login = await loginService.login(req.body);
      if (login) {
        const token = jwt.sign({ userId: login.id }, process.env.SECRET, {
          expiresIn: 5000,
        });
        return res.json({ auth: true, token, user_id: login.id });
      } else {
        return res.status(404).send("Usuário ou senha incorretos");
      }
    } catch (error) {
      return res.status(400).send("Usuário ou senha incorretos");
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers["token-auth"];

      if (token) {
        await loginService.logout(token);
        return res.send("deslogado");
      }
    } catch (error) {
      return res.status(400).send("Erro ao deslogar");
    }
  },
};

export default loginController;
