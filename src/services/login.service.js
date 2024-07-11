import { prisma } from "./prisma.js";

const loginService = {
  signUp: async (data) => {
    const user = await prisma.user.create({
      data,
    });
    return user;
  },
  login: async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  },

  logout: async (data) => {
    await prisma.blacklist.create({
      data: {
        token: data,
      },
    });
  },
};

export default loginService;
