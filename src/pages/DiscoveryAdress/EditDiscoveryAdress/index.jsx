import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema"
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
  const [discoveryAddress, setDdiscoveryAddress] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValues] = useState([]);
  const [option, setOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [controler, setControler] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [size, setSize] = useState(0);
  let control = [];

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
      setDdiscoveryAddress(result.data);
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
    const fetchData = async () => {
      const neighborhoods = await api.get(
        "neighborhood/" + props.idDiscoverydAdress
      );
      let temp = {};
      //let temp2 = [];
      let anotherNeighborhoods = [];
      for (let i = 0; i < neighborhoods.data.length; i++) {
        control = [...control, neighborhoods.data[i].name];
        temp = { label: neighborhoods.data[i].name, value: neighborhoods.data[i].name };
        anotherNeighborhoods = [...anotherNeighborhoods, temp];
      }
      setSize(anotherNeighborhoods.length)
      setValues(anotherNeighborhoods);
      setControler(control);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValue(
      "district",
      value.map(({ value }) => value)
    );
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
    let on = [];
    let off = [];
    controler.forEach(element => {
      let found = false;
      for (let i = 0; i < values.district.length; i++) {
        if (element === values.district[i]) {
          found = true;
          break;
        }
      }
      if (found == false) {
        off = [...off, element]
      }
    });

    values.district.forEach(element => {
      let found = false;
      for (let i = 0; i < controler.length; i++) {
        if (element === controler[i]) {
          found = true;
          break;
        }
      }
      if (found == false) {
        on = [...on, element]
      }
    });
    values = { ...values, on };
    values = { ...values, off };
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
    const newOption = createOption(inputValue);
    await api.post("neighborhood", { name: newOption.value });
    setValues([...value, newOption]);
    setOptions([...option, newOption]);
  };

  const checkRepeated = async (x) => {
    const val = await api.get("neighborhood-name/" + x[x.length - 1].value);
    if (val.data) {
      if (val.data.discoveyAddressId === null) {
        setValues(x);
        setSize(x.length);
      } else {
        setErrorMessage(x[x.length - 1].value +' já pertence a uma região da cidade');
      }
    }
  };

  return (
    <div className="create-user">
      <div class="wrapper">
        <header>Editar Área Descoberta de:</header>
        <header>{discoveryAddress.region} de {discoveryAddress.city}, {discoveryAddress.uf} </header>
        <form onSubmit={handleSubmit(submitForm)}>
          {/*<div>
            <p>{discoveryAddress.region}</p>
            <input type="text" {...register("region")} />
            <p className="validationError">
              {" "}
              {errors?.region && "Insira uma região"}{" "}
            </p>
          </div>*/}

          <div>
            <p>Bairro(s)</p>
            <CreatableSelect
              inputValue={inputValue}
              isClearable
              isMulti
              onChange={(v) => {
                if (v.length < size){
                  setValues(v);
                  setSize(v.length)
                }else{
                  checkRepeated(v);
                }
                
              }}
              onInputChange={(input) => {setErrorMessage(""); setInputValue(input)}}
              onCreateOption={handleChange2}
              on
              placeholder="Selecione o(s) bairro(s)"
              value={value}
              options={option}

            />
            <p className="validationError">
              {" "}
              {errors?.district && errors?.district.message}{" "}
            </p>
            <p className="validationError">
              {errorMessage}
            </p>
          </div>

          {/*<div
            className="drop-select"
            onChange={async () => {
              const c = await getCities(getValues("uf"));
              setCities(c);
            }}
          >
            <p>{discoveryAddress.uf}</p>
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
          <p>{discoveryAddress.city}</p>
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
          </div>*/}

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
