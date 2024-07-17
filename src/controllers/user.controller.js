import userService from "../services/user.service.js";

const userController = {
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);

      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send("Erro ao criar usuario");
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await userService.getUsers();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send("Não foi possivel carregar os usuários");
    }
  },

  getUserById: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const user = await userService.getUserById(user_id);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(404).send("Usuário não encontrado");
    }
  },
};

export default userController;
