import { prisma } from "./prisma.js";

const userService = {
  createUser: async (data) => {

    const user = await prisma.user.create({
      data,
    });
    return user;
  },

  getUsers: async () => {
    try {
      const users = await prisma.user.findMany(); // Exemplo de busca de usuários
      return users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error; // Trate ou relance o erro conforme necessário
    }
  },

  getUserById: async (user_id) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      }); // Exemplo de busca de usuários
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error; // Trate ou relance o erro conforme necessário
    }
  },
};

export default userService;
