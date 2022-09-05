import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cepMask } from "../../../utils/cepMask";
import schema from "../CreateAdress/schema";

export default function EditAdress(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const reload = () => {
    window.location.reload();
  };

  const verifyCEP = ({ target }) => {
    const cep = target.value.replace(/\D/g, "");
    api.get(`https://viacep.com.br/ws/${cep}/json/`).then(({ data }) => {
      setValue("street", data.logradouro);
      setValue("district", data.bairro);
      setValue("city", data.localidade);
      setValue("uf", data.uf);
      setValue("cep", target.value);
      setFocus("number");
    });
  };

  const [data, setData] = useState([]);

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    (async () => {
      const result = await api.get("adress/" + props.idAdress);
      setData(result);
      setValue("street", result.data[0].street);
      setValue("number", result.data[0].number);
      setValue("district", result.data[0].district);
      setValue("city", result.data[0].city);
      setValue("uf", result.data[0].uf);
      setValue("cep", result.data[0].cep);
    })();
  }, []);

  const submitForm = (data) => {
    api.put("adress/" + props.idAdress + "/" + props.idUser, data).then(
      (res) => {
        alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
        reload();
      },
      (err) => {
        alert("Erro!!! \n A edição não foi realizado!!!", err);
      }
    );
  };


  return (
    <div className="create-user">
      <div class="wrapper">
        <header>Editar endreço</header>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <p>CEP</p>
            <input
              type="text"
              name="cep"
              {...register("cep")}
              onBlur={verifyCEP}
              onChange={(event) => cepMask(event)}
            />
            <p className="validationError">
              {" "}
              {errors?.cep && "Insira um CEP válido"}{" "}
            </p>
          </div>

          <div>
            <p>Rua</p>
            <input type="text" name="street" {...register("street")} />
            <p className="validationError">
              {" "}
              {errors?.street && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Número</p>
            <input type="text" name="number" {...register("number")} />
            <p className="validationError">
              {" "}
              {errors?.number &&
                "Campo obrigatório, insira apenas números."}{" "}
            </p>
          </div>

          <div>
            <p>Bairro</p>
            <input type="text" name="district" {...register("district")} />
            <p className="validationError">
              {" "}
              {errors?.district && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Cidade</p>
            <input type="text" name="city" {...register("city")} />
            <p className="validationError">
              {" "}
              {errors?.city && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div className="drop-list">
            <div className="from">
              <p>Estado</p>
              <div className="select-box">
                <select {...register("uf")}>
                <option value={"AC"}>Acre (AC) </option>
                  <option value={"AL"}>Alagoas (AL)</option>
                  <option value={"AM"}>Amazonas (AM)</option>
                  <option value={"BA"}> Bahia (BA)</option>
                  <option value={"CE"}> Ceará (CE)</option>
                  <option value={"DF"}>Distrito Federal (DF)</option>
                  <option value={"ES"}>Espírito Santo (ES)</option>
                  <option value={"GO"}>Goiás (GO)</option>
                  <option value={"MA"}>Maranhão (MA) </option>
                  <option value={"MT"}> Mato Grosso (MT)</option>
                  <option value={"MS"}>Mato Grosso do Sul (MS)</option>
                  <option value={"MG"}>Minas Gerais (MG) </option>
                  <option value={"PA"}>Pará (PA) </option>
                  <option value={"PB"}> Paraíba (PB) </option>
                  <option value={"PR"}>Paraná (PR)</option>
                  <option value={"PE"}> Pernambuco (PE)</option>
                  <option value={"PI"}> Piauí (PI)</option>
                  <option value={"RJ"}>Rio de Janeiro (RJ)</option>
                  <option value={"RN"}>Rio Grande do Norte (RN) </option>
                  <option value={"RS"}>Rio Grande do Sul (RS) </option>
                  <option value={"RO"}>Rondônia (RO) </option>
                  <option value={"RR"}> Roraima (RR)</option>
                  <option value={"SC"}>Santa Catarina (SC)</option>
                  <option value={"SP"}> São Paulo (SP)</option>
                  <option value={"SE"}> Sergipe (SE)</option>
                  <option value={"TO"}>Tocantins (TO)</option>
                </select>
                <p className="validationError">
                  {" "}
                  {errors?.uf && "Campo obrigatório"}{" "}
                </p>
              </div>
            </div>
          </div>

          <button>EDITAR</button>
        </form>
      </div>
    </div>
  );
}
