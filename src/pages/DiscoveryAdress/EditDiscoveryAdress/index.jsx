import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../CreateDiscoveryAdress/schema";
import CreatableSelect from "react-select/creatable";
import getCities from "../../../utils/getCities";

export default function EditDiscoverAdress(props) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const reload = () => {
    window.location.reload();
  };

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValues] = useState([]);
  const [option, setOptions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const c = await getCities("mg");
      setCities(c);
      const ops = [];
      let { data } = await api.get("neighborhood");
      data = data.sort();
      data.forEach((d) => ops.push(createOption(d)));
      setOptions(ops);
      const result1 = await api.get("medical-center");
      setData(result1.data);

      const result = await api.get(
        "discovery-address/" + props.idDiscoverydAdress
      );
      setDataResult(result);
      const {
        region,
        district,
        city,
        uf,
        id_addres_parto,
        id_addres_pre_natal,
      } = result.data;

      setValue("city", city);
      setValue("uf", uf);
      setValue("region", region);
      setValue("id_addres_parto", id_addres_parto);
      setValue("id_addres_pre_natal", id_addres_pre_natal);
      setValue("district", district);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValue(
      "district",
      value.map(({ value }) => value)
    );
    console.log(getValues());
  }, [value]);

  const [dataCm, setDataCm] = useState([]);
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("medical-center");
      setDataCm(result.data);
    };
    fetchData();
  }, []);

  const submitForm = (values) => {
    api.put("discovery-address/" + props.idDiscoverydAdress, values).then(
      (res) => {
        alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
        reload();
      },
      (err) => {
        alert("Erro!!! \n A edição não foi realizado!!!", err);
      }
    );
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleChange2 = async () => {
    if (!inputValue) return;
    setInputValue("");
    const newOption = createOption(inputValue);
    await api.post("neighborhood", { name: newOption.value });
    setValues([...value, newOption]);
    setOptions([...option, newOption]);
  };

  return (
    <div className="create-user">
      <div class="wrapper">
        <header>Editar Área Descoberta</header>
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
            <p>Bairro(s)</p>
            <CreatableSelect
              inputValue={inputValue}
              isClearable
              isMulti
              onChange={(v) => {
                setValues(v);
              }}
              onInputChange={(input) => setInputValue(input)}
              onCreateOption={handleChange2}
              placeholder="Selecione o(s) bairro(s)"
              value={value}
              options={option}
            />
            <p className="validationError">
              {" "}
              {errors?.district && errors?.district.message}{" "}
            </p>
          </div>

          <div
            className="drop-select"
            onChange={async () => {
              const c = await getCities(getValues("uf"));
              setCities(c);
            }}
          >
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
                <option value={"MG"} selected>
                  Minas Gerais (MG){" "}
                </option>
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

          <button>EDITAR ÁREA DESCOBERTA</button>
        </form>
      </div>
    </div>
  );
}
