import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyCpf } from "../../../utils/cpfMask";

function isValidCpf(cpf) {
  return this.test("isValidCpf", cpf, function (value) {
    const { path, createError } = this;

    if (!verifyCpf(value)) {
      return createError({
        path,
        message: "CPF inválido"
      });
    }
    return true;
  });
}
yup.addMethod(yup.mixed, "isValidCpf", isValidCpf);

const schema = yup.object().shape({
    username: yup.string().required(),
    name: yup.string().required(),
    street: yup.string().required(),
    district: yup.string().required(),
    city: yup.string().required(),
    uf: yup.string().required(),
    cep: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().isValidCpf().required(),
    number: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(15).required(),
    passwordConfirmation: yup.string().min(4).max(15).required(),
    //admin: yup.boolean.required(),
  });
export default schema