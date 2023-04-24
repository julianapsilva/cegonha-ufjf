import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../../services/api";
import Sidebar from "../../../Components/Sidebar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { cepMask } from "../../../utils/cepMask";
import axios from "axios";
import getCities from '../../../utils/getCities'

export default function CreateCoverAdress(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("medical-center");
      setData(result.data);
      const c = await getCities("mg")
      setCities(c)
    };
    fetchData();
  }, []);

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

  const submitForm = (values) => {
    api.post("cover-address", values).then(
      (res) => {
        alert("SUCESSO!!! \n Endereço cadastrado com sucesso!!!");
        navigate("/cover-adress");
      },
      (err) => {
        alert("Erro!!! \n O cadastro não foi realizado!!!", err);
      }
    );
  };

  return (
    <div>
      <Sidebar />
      <div className="create-user">
        <div class="wrapper">
          <header>Cadastrar novo Endereço Coberto</header>
          <form onSubmit={handleSubmit(submitForm)}>
            <div>
              <p>Rua</p>
              <input type="text" {...register("street")} />
              <p className="validationError">
                {" "}
                {errors?.street && "Campo obrigatório"}{" "}
              </p>
            </div>

            <div>
              <p>Numero inicial</p>
              <input type="text" {...register("number_start")} />
              <p className="validationError">
                {" "}
                {errors?.number_start &&
                  "Campo obrigatório, insira apenas números."}{" "}
              </p>
            </div>

            <div>
              <p>Número final</p>
              <input type="text" {...register("number_end")} />
              <p className="validationError">
                {" "}
                {errors?.number_end &&
                  "Campo obrigatório, insira apenas números."}{" "}
              </p>
            </div>

            <div>
              <p>CEP</p>
              <input
                type="text"
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
              <p>Bairro</p>
              <input type="text" {...register("district")} />
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
                    cities?.map(city => <option key={city.id} value={city.nome}>{city.nome}</option>
                    )
                  }
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
            <div class="drop-select">
              <p>Local de parto</p>
              <div>
                <select {...register("id_addres_parto")}>
                  <option value={""}>{""} </option>
                  {data.map((i) => (
                    <option key={i.value} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="validationError">
                {" "}
                {errors?.id_addres_parto && "Campo obrigatório"}{" "}
              </p>
            </div>

            <div class="drop-select">
              <p>Local de pré-natal</p>
              <div>
                <select {...register("id_addres_pre_natal")}>
                  <option value={""}>{""} </option>
                  {data.map((i) => (
                    <option key={i.value} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="validationError">
                {" "}
                {errors?.id_addres_pre_natal && "Campo obrigatório"}{" "}
              </p>
            </div>

            <button>ADICIONAR ENDEREÇO COBERTO</button>
          </form>
        </div>
      </div>
    </div>
  );
}
