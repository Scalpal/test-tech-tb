import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import config from "../../config";
import UserModel from "../db/models/UserModel";

const auth = async (req: Request, res: Response, next: () => void) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "No token provided" })
    
    return;
  }

  const jwt = req.headers.authorization.slice(7);
  if (!jwt) {
    res.status(401).send({ error: "No token provided" })
    
    return;
  }

  const decodedToken = jsonwebtoken.decode(jwt);
  if (
    typeof decodedToken === "string" ||
    decodedToken === null ||
    !decodedToken.exp
  ){
    return;
  }

  const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
  if (isTokenExpired) {
    res.status(500).send({ error: "Token expired" }); 

    return;
  }

  const verifiedToken = jsonwebtoken.verify(jwt, config.security.jwt.secret);
  if (typeof verifiedToken === "string") {
    res.status(500).send({ error: "Invalid token" })

    return;
  }

  try {
    const userId = verifiedToken.payload.user.id;
    const user = await UserModel.query().findOne({ id: userId });

    if (!user) {
      res.status(404).send({ error: "Unauthorized" })
      
      return;
    }
    
    next();
  } catch (error) {
    res.status(500).send({ error })
  }
}

export default auth;