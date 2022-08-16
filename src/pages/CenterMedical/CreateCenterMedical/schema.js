import * as yup from "yup";

function checkNumber(number) {
  return this.test("checkNumber", (number), function (value) {
    const { path, createError } = this;
    if (isNaN(value) == false) {
      if(parseInt(value) > 0){
        return true;
      }
    }else{
      if(value == 's/n')
        return true;
    }
    return createError({
      path,
      message: "Digite apenas números positivos ou s/n para endereço sem número"
    });
    
  });
}
yup.addMethod(yup.mixed, "checkNumber", checkNumber);

const schema = yup.object().shape({
  name: yup.string().required(),
  street: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  uf: yup.string().required(),
  cep: yup.string().required(),
  number: yup.string().checkNumber().required(),
  image: yup.string().required(),
  phone: yup.string().required(),
  latitude: yup.string().required(),
  longitude: yup.string().required(),
});
export default schema;
