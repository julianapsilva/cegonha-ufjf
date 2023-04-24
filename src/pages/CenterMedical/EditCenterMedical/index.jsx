import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";
import schema from "../CreateCenterMedical/schema";
import { cepMask } from "../../../utils/cepMask";
import { phoneMask } from "../../../utils/phoneMask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getCities from "../../../utils/getCities";

export default function EditCenterMedical(props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const reload = () => {
    window.location.reload();
  };
  const [cities, setCities] = useState([]);

  const submitForm = (data) => {
    api.put("medical-center/" + props.idCenterMedical, data).then(
      (res) => {
        alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
        reload();
      },
      (err) => {
        alert("Erro!!! \n A edição não foi realizado!!!", err);
      }
    );
  };

  const navigate = useNavigate();

  const verifyCEP = ({ target }) => {
    const cep = target.value.replace(/\D/g, "");
    axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(({ data }) => {
      setValue("street", data.logradouro);
      setValue("district", data.bairro);
      setValue("city", data.localidade);
      setValue("uf", data.uf);
      setValue("cep", target.value);
      setFocus("number");
    });
  };



  useEffect(() => {
    (async () => {
      const result = await api.get("medical-center-id/" + props.idCenterMedical);
      const c = await getCities("mg");
      setCities(c);
      setValue("image", result.data.image);
      setValue("name", result.data.name);
      setValue("phone", result.data.phone);
      setValue("latitude", result.data.latitude);
      setValue("longitude", result.data.longitude);
      setValue("street", result.data.street);
      setValue("number", result.data.number);
      setValue("district", result.data.district);
      setValue("city", result.data.city);
      setValue("uf", result.data.uf);
      setValue("cep", result.data.cep);

    })();
  }, []);


  return (
    <div className="create-user">
      <div class="wrapper">
        <header>Editar Centro Médico</header>

        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <p>Nome</p>
            <input type="text" name="name"  {...register("name")} />
            <p className="validationError">
              {" "}
              {errors?.name && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Imagem</p>
            <input type="text"  {...register("image")} />
            <p className="validationError">
              {" "}
              {errors?.image && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Telefone</p>
            <input type="text"
              {...register("phone")}
              onClick={(event) => phoneMask(event)}
              onChange={(event) => phoneMask(event)}
            />
            <p className="validationError">
              {" "}
              {errors?.phone && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Latitude</p>
            <input type="text" {...register("latitude")} />
            <p className="validationError">
              {" "}
              {errors?.latitude && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Longitude</p>
            <input type="text" {...register("longitude")} />
            <p className="validationError">
              {" "}
              {errors?.longitude && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>CEP</p>
            <input
              type="text"
              name="cep"
              {...register("cep")}
              onBlur={verifyCEP}
              onClick={(event) => cepMask(event)}
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
              {errors?.number && errors?.number.message}{" "}
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

          <div className="drop-select">
            <p>Cidade</p>
            <div>
              <select {...register("city")}>
                {cities?.length > 0 &&
                  cities?.map((city) => (
                    <option key={city.id} value={city.nome}>
                      {city.nome}
                    </option>
                  ))}
              </select>
              <p className="validationError">
                {" "}
                {errors?.city && "Campo obrigatório"}{" "}
              </p>
            </div>
          </div>

          <div className="drop-select">
            <p>Estado</p>
            <div>
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
          <button>EDITAR</button>
        </form>
      </div>
    </div>
  );
}
