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
              <p>Numero final</p>
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
                    <option value={"Acre (AC)"}>Acre (AC) </option>
                    <option value={"Alagoas (AL)"}>Alagoas (AL)</option>
                    <option value={"Amazonas (AM)"}>Amazonas (AM)</option>
                    <option value={"Bahia (BA)"}> Bahia (BA)</option>
                    <option value={"Ceará (CE)"}> Ceará (CE)</option>
                    <option value={"Distrito Federal (DF)"}>
                      Distrito Federal (DF)
                    </option>
                    <option value={"Espírito Santo (ES)"}>
                      Espírito Santo (ES)
                    </option>
                    <option value={"Goiás	(GO)"}>Goiás (GO)</option>
                    <option value={"Maranhão	(MA)"}>Maranhão (MA) </option>
                    <option value={"Mato Grosso	(MT)"}> Mato Grosso (MT)</option>
                    <option value={" Mato Grosso do Sul	(MS)"}>
                      {" "}
                      Mato Grosso do Sul (MS)
                    </option>
                    <option value={"Minas Gerais	(MG)"}>
                      Minas Gerais (MG){" "}
                    </option>
                    <option value={"Pará	(PA)"}>Pará (PA) </option>
                    <option value={" Paraíba (PB)"}> Paraíba (PB) </option>
                    <option value={"Paraná (PR)"}>Paraná (PR)</option>
                    <option value={"Pernambuco	(PE)"}> Pernambuco (PE)</option>
                    <option value={"Piauí	(PI)"}> Piauí (PI)</option>
                    <option value={"Rio de Janeiro (RJ)"}>
                      {" "}
                      Rio de Janeiro (RJ)
                    </option>
                    <option value={"Rio Grande do Norte	(RN)"}>
                      Rio Grande do Norte (RN){" "}
                    </option>
                    <option value={" Rio Grande do Sul 	(RS)"}>
                      {" "}
                      Rio Grande do Sul (RS){" "}
                    </option>
                    <option value={"Rondônia	(RO)"}>Rondônia (RO) </option>
                    <option value={"Roraima	(RR)"}> Roraima (RR)</option>
                    <option value={"Santa Catarina (SC)"}>
                      {" "}
                      Santa Catarina (SC)
                    </option>
                    <option value={"São Paulo (SP)"}> São Paulo (SP)</option>
                    <option value={"Sergipe	(SE)"}> Sergipe (SE)</option>
                    <option value={"Tocantins	(TO)"}>Tocantins (TO)</option>
                  </select>
                  <p className="validationError">
                    {" "}
                    {errors?.uf && "Campo obrigatório"}{" "}
                  </p>
                </div>
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

            <button>ADICIONAR ENDEREÇO COBERTO</button>
          </form>
        </div>
      </div>
    </div>
  );
}
