import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required(),
    name: yup.string().required(),
    street: yup.string().required(),
    district: yup.string().required(),
    city: yup.string().required(),
    uf: yup.string().required(),
    cep: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.number().positive().integer().required(),
    number: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(15).required(),
  });
export default schema