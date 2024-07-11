import loginService from "../services/login.service.js";
import jwt from "jsonwebtoken";

const loginController = {
  login: async (req, res) => {
    try {
      const login = await loginService.login(req.body.email);

      if (login) {
        const token = jwt.sign({ userId: login.id }, process.env.SECRET, {
          expiresIn: 5000,
        });
        return res.json({ auth: true, token });
      } else {
        return res.status(404).send("Usuário não encontrado");
      }
    } catch (error) {
      return res.status(400).send("Usuário ja existente");
    }
  },
};

export default loginController;
