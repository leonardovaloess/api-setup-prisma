import { prisma } from "./prisma.js";

const loginService = {
  login: async (email) => {
    console.log("aqui", email);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  },
};

export default loginService;
