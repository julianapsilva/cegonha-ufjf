import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import schema from "./schema";
import { cpfMask } from "../../../utils/cpfMask";
import { cepMask } from "../../../utils/cepMask";
import Sidebar from "../../../Components/Sidebar";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    data.cpf = data.cpf.match(/\d/g).join("");
    data.cep = data.cep.match(/\d/g).join("");
    api.post("/user", data).then(
      (res) => {
        alert("SUCESSO!!! \n Cadastro realizado com sucesso!!!");
        navigate("/users");
      },
      (err) => {
        alert("Erro!!! \n O cadastro não foi realizado!!!", err);
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

  return (
    <div className="create-user">
      <Sidebar />

      <div className="wrapper">
        <header>Cadastrar novo usuário</header>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <p>Nome</p>
            <input type="text" name="name" {...register("name")} />
            <p className="validationError">
              {" "}
              {errors?.name && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Nome de usuário</p>
            <input type="text" name="username" {...register("username")} />
            <p className="validationError">
              {" "}
              {errors?.username && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Email</p>
            <input type="email" name="email" {...register("email")} />
            <p className="validationError">
              {" "}
              {errors?.email && "Email inválido, campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Senha</p>
            <input type="password" name="password" {...register("password")} />
            <p className="validationError">
              {" "}
              {errors?.password &&
                "A senha deve ter pelo menos 4 caracteres"}{" "}
            </p>
          </div>

          <div>
            <p>CPF</p>
            <input
              type="text"
              name="cpf"
              {...register("cpf")}
              onChange={(event) => {
                cpfMask(event);
              }}
            />
            <p className="validationError">
              {" "}
              {errors?.cpf && errors?.cpf.message}
            </p>
          </div>

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

          <button>ADICIONAR USUÁRIO</button>
        </form>
      </div>
    </div>
  );
}
