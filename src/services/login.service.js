import { prisma } from "./prisma.js";

const loginService = {
  signUp: async (data) => {
    const user = await prisma.user.create({
      data,
    });

    return user;
  },

  login: async (body) => {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      if(user.password !== body.password){
        return 
      } else {
        return user
      }

    } else {
      console.log("nao existe");
    }
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
