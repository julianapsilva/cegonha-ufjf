import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../CreateCoverAdress/schema";
import { cepMask } from "../../../utils/cepMask";

export default function EditCoverAdress(props) {
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

  const [data, setData] = useState([]);
  const [dataCm, setDataCm] = useState([]);

  const [street, setStreet] = useState("");
  const [number_start, setNumber_start] = useState("");
  const [number_end, setNumber_end] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [id_addres_parto, setId_addres_parto] = useState("");
  const [id_addres_pre_natal, setId_addres_pre_natal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("medical-center");
      setDataCm(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await api.get("cover-address/" + props.idCoverAdress);
      setData(result);
      console.log(data)
      setValue("street", result.data.street);
      setValue("number_start", result.data.number_start);
      setValue("number_end", result.data.number_end);
      setValue("district", result.data.district);
      setValue("city", result.data.city);
      setValue("uf", result.data.uf);
      setValue("cep", result.data.cep);
      setValue("data.id_addres_parto", result.data.id_addres_parto);
      setValue("data.id_addres_pre_natal", result.data.id_addres_pre_natal);
     

      {/*setStreet(result.data.street);
      setNumber_start(result.data.number_start);
      setNumber_end(result.data.number_end);
      setDistrict(result.data.district);
      setCity(result.data.city);
      setUf(result.data.uf);
      setCep(result.data.cep);
      setId_addres_parto(result.data.id_addres_parto);
    setId_addres_pre_natal(result.data.id_addres_pre_natal);*/}
    })();
  }, []);

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

  const submitForm = (values) => {
    api.put("cover-address/" + props.idCoverAdress, values).then(
      (res) => {
        alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
        reload();
      },
      (err) => {
        alert("Erro!!! \n A edição não foi realizado!!!", err);
      }
    );
  };

{/*const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      street,
      number_start,
      number_end,
      district,
      city,
      uf,
      cep,
      id_addres_parto,
      id_addres_pre_natal,
    };
    api.put("cover-address/" + props.idCoverAdress, values).then(
      (res) => {
        alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
        reload();
      },
      (err) => {
        alert("Erro!!! \n A edição não foi realizado!!!", err);
      }
    );
  };*/}

  return (
    <div className="create-user">
      <div class="wrapper">
        <header>Editar Endereço Coberto</header>
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

            <div>
              <p>Cidade</p>
              <input type="text" {...register("city")} />
              <p className="validationError">
                {" "}
                {errors?.city && "Campo obrigatório"}{" "}
              </p>
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
                  {dataCm.map((i) => (
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
                  {dataCm.map((i) => (
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

            <button>EDITAR</button>
          </form>
      </div>
    </div>
  );
}
