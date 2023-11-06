import * as yup from "yup"
import { Request, Response } from 'express';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const validateLoginBody = async(req: Request, res: Response, next: () => void) => {
  try {
    await validationSchema.validate(req.body);

    next()
  } catch (error) {
    res.status(400).send({ message: "Invalid body sent" })
  }
}

export default validateLoginBody;