import * as yup from "yup";

const schema = yup.object().shape({
  city: yup.string().required(),
  uf: yup.string().required(),
  region: yup.string().required(),
  id_addres_parto: yup.number().positive().integer().required(),
  id_addres_pre_natal: yup.number().positive().integer().required(),
  district: yup.array().min(1, "Campo obrigatório").required("Campo obrigatório").nullable(),
});
export default schema;
