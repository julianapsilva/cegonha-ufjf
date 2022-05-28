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

export default function CreateDiscoveryAdress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("medical-center");
      setData(result.data);
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
    });
  };

  const submitForm = (values) => {
    api.post("discovery-address", values).then(
      (res) => {
        alert("SUCESSO!!! \n Área cadastrada com sucesso!!!");
        navigate("/discovery-adress");
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
          <header>Cadastrar nova Área Descoberta</header>
          <form onSubmit={handleSubmit(submitForm)}>
            <div>
              <p>Região</p>
              <input type="text" {...register("region")} />
              <p className="validationError">
                {" "}
                {errors?.region && "Insira uma região"}{" "}
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

            <div>
              <p>Cidade</p>
              <input type="text" {...register("city")} />
              <p className="validationError">
                {" "}
                {errors?.city && "Campo obrigatório"}{" "}
              </p>
            </div>

            <div class="drop-list">
              <div class="from">
                <p>Estado</p>
                <div class="select-box">
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
                </div>
                <p className="validationError">
                  {" "}
                  {errors?.uf && "Campo obrigatório"}{" "}
                </p>
              </div>
            </div>
            <div class="drop-list2">
              <div class="from">
                <p>local de parto</p>
                <div class="select-box">
                  <select {...register("id_addres_parto")}>
                    <option value={""}>{""} </option>
                    {data.map((i) => (
                      <option key={i.value} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="validationError">
                {" "}
                {errors?.id_addres_parto && "Campo obrigatório"}{" "}
              </p>
            </div>

            <div class="drop-list2">
              <div class="from">
                <p>local de pré-natal</p>
                <div class="select-box">
                  <select {...register("id_addres_pre_natal")}>
                    <option value={""}>{""} </option>
                    {data.map((i) => (
                      <option key={i.value} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="validationError">
                {" "}
                {errors?.id_addres_pre_natal && "Campo obrigatório"}{" "}
              </p>
            </div>

            <button>ADICIONAR ÁREA DESCOBERTA</button>
          </form>
        </div>
      </div>
    </div>
  );
}
