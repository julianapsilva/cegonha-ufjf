import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyCpf } from "../../../utils/cpfMask";
import { validationPassword } from "../validation";
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
/*function min8Password(password) {
  return this.test("min8Password", password, function (value) {
    const { path, createError } = this;
    if (value.length < 8) {
      return createError({
        path,
        message: "A senha deve ter pelo menos 8 caracteres"
      });
    }
    return true;
  });
}*/
function isValidPassword(password) {
  return this.test("isValidPassword", password, function (value) {
    const { path, createError } = this;
    var msg = validationPassword(value)
    console.log(msg)
    if (msg != "true") {
      return createError({
        path,
        message: msg
      });
    }
    return true;
  });
}
function confirmingPassword(password) {
  return this.test("confirmingPassword", (password), function (value) {
    const { path, createError } = this;
    if (value !== localStorage.getItem('password')) {
      return createError({
        path,
        message: "As senhas devem ser iguais"
      });
    }
    return true;
  });
}
yup.addMethod(yup.mixed, "isValidCpf", isValidCpf);
yup.addMethod(yup.mixed, "isValidPassword", isValidPassword);
/*yup.addMethod(yup.mixed, "min8Password", min8Password);*/
yup.addMethod(yup.mixed, "confirmingPassword", confirmingPassword);

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
    password: yup.string().isValidPassword().min(8).max(15).required(),
    passwordConfirmation: yup.string().confirmingPassword().min(8).max(15).required(),
    //admin: yup.boolean.required(),
  });
export default schema