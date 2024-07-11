import jwt from "jsonwebtoken";
import { prisma } from "./prisma.js";

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

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "permissão negada" });

    req.userId = decoded.userId;
    next();
  });
}

export default verifyJWT;
