import { Request, Response } from 'express';
import * as yup from "yup";
import valid from "card-validator";

const validationSchema = yup.object().shape({
  cardNumber: yup.string().test({
    name: 'test-credit-card-number',
    message: 'Veuillez rentrer un numéro de carte de crédit valide.',
    test: (value) => {
      const cardInfo = valid.number(value);
      return cardInfo.isValid;
    },
  }).required('Veuillez rentrer un numéro de carte de crédit'),
  cardValidity: yup.string().test({
    name: 'test-credit-card-expirationDate',
    message: 'Veuillez rentrer une date d"expiration valide.',
    test: (value) => (valid.expirationDate(value).isValid),
  }).required('Veuillez rentrer une date d"expiration.'),
  cardCryptogram: yup.string().test({
    name: 'test-credit-card-cvv',
    message: 'Veuillez rentrer un cryptogramme valide.',
    test: (value) => (valid.cvv(value).isValid),
  }).required('Veuillez rentrer un cryptogramme.'),
  cardHolder: yup.string().min(3).required('Veuillez rentrer le nom du détenteur de la carte'),
});

const validateCard = async (req: Request, res: Response, next: () => void) => {
  try {
    await validationSchema.validate(req.body.card);

    next()
  } catch (error) {
    res.status(400).send({ message: "Invalid card" })
  }
}

export default validateCard;