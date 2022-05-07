import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  street: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  uf: yup.string().required(),
  cep: yup.string().required(),
  number: yup.number().positive().integer().required(),
  image: yup.string().required(),
  phone: yup.string().required(),
  latitude: yup.string().required(),
  longitude: yup.string().required(),
});
export default schema;
