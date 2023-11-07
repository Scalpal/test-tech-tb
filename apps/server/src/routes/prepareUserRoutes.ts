import { Express } from "express";
import validateRegisterBody from "../middlewares/validateRegisterBody";
import UserModel from "../db/models/UserModel";
import hashPassword from "../db/hashpassword";
import { RESULT_STATUS } from "../types/ResultStatus";
import config from "../../config";
import jsonwebtoken from "jsonwebtoken";
import validateLoginBody from "../middlewares/validateLoginBody";

function prepareUserRoutes ({ app }: { app: Express }) {
  app.post(
    "/api/register",
    validateRegisterBody,
    async (req, res) => {
      const body = req.body;

      try {
        const user = await UserModel.query().findOne({ email: body.email });

        if (user) {
          res.status(409).send({ error: "Email already used." });

          return;
        }

        const [passwordhash, passwordsalt] = await hashPassword(body.password);

        await UserModel.query().insert({
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          passwordhash,
          passwordsalt
        }).returning("*")

        res
          .send({
            message: "Registered successfully",
          });
      } catch (error) {
        res.status(404).send({ error })
      }
    }
  )

  app.post(
    "/api/login",
    validateLoginBody,
    async (req, res) => {
      const body = req.body;

      try {
        const user = await UserModel.query().findOne({ email: body.email });

        if (!user) {
          res.status(401).send({ error: "Wrong email or password." });

          return;
        }

        if (!(await user.checkPassword(body.password))) {
          res.status(401).send({ error: "Wrong email or password." });

          return;
        }

        const jwt = jsonwebtoken.sign(
          {
            payload: {
              user: {
                id: user.id,
              },
            },
          },
          config.security.jwt.secret,
          { expiresIn: config.security.jwt.expiresIn }
        );

        res.send({ result: jwt });
      } catch (error) {
        res.status(404).send({ error })
      }
    }
  )
}

export default prepareUserRoutes;