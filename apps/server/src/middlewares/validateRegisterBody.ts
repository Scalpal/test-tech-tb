import * as yup from "yup"
import { Request, Response } from 'express';

const validationSchema = yup.object().shape({
  lastname: yup.string().min(3).required(),
  firstname: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const validateRegisterBody = async(req: Request, res: Response, next: () => void) => {
  try {
    await validationSchema.validate(req.body);

    next()
  } catch (error) {
    res.status(400).send({ message: "Invalid body sent" })
  }
}

export default validateRegisterBody;