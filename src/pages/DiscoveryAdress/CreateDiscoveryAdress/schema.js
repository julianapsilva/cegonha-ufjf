import * as yup from "yup";

const schema = yup.object().shape({
  street: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  uf: yup.string().required(),
  cep: yup.string().required(),
  region: yup.string().required(),
  id_addres_parto: yup.number().positive().integer().required(),
  id_addres_pre_natal: yup.number().positive().integer().required(),
});
export default schema;
