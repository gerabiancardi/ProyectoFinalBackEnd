import { body } from "express-validator";
import { mappingValidateMdw } from "../middleware/mappingValidateMdw.js";


export const createProductDTO = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número"),
  body("thumbnail").optional(),
  body("code")
    .notEmpty()
    .withMessage("El código es obligatorio")
    .isInt()
    .withMessage("El código debe ser un número entero"),
  body("stock")
    .notEmpty()
    .withMessage("El stock es obligatorio")
    .isInt()
    .withMessage("El stock debe ser un número entero"),
  body("category").notEmpty().withMessage("La categoría es obligatoria"),
  mappingValidateMdw,
];
