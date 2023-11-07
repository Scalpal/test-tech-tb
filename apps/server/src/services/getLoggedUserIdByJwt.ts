import { Request } from "express"
import jsonwebtoken from "jsonwebtoken"
import config from "../../config";

type Result = number | null;

const getLoggedUserIdByJwt = (req: Request): Result  => {
  if (!req.headers.authorization) {        
    return null;
  }

  const jwt = req.headers.authorization.slice(7);
  
  const verifiedToken = jsonwebtoken.verify(jwt, config.security.jwt.secret);
  if (typeof verifiedToken === "string") {
    return null;
  }

  const userId = verifiedToken.payload.user.id;
  
  return userId;
}

export default getLoggedUserIdByJwt;