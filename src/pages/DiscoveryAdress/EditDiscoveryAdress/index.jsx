import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";

export default function EditDiscoverAdress(props) {
  const reload = () => {
    window.location.reload();
  };

  const [data, setData] = useState([]);
  const [dataCm, setDataCm] = useState([]);

  const [region, setRegion] = useState();
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();
  const [cep, setCep] = useState();
  const [id_addres_parto, setId_addres_parto] = useState();
  const [id_addres_pre_natal, setId_addres_pre_natal] = useState();

  useEffect(() => {
    (async () => {
      const result = await api.get(
        "discovery-address/" + props.idDiscoverydAdress
      );
      setData(result);

      setRegion(result.data.region);
      setDistrict(result.data.district);
      setCity(result.data.city);
      setUf(result.data.uf);
      setCep(result.data.cep);
      setId_addres_parto(result.data.id_addres_parto);
      setId_addres_pre_natal(result.data.id_addres_pre_natal);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("medical-center");
      setDataCm(result.data);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      region,
      district,
      city,
      uf,
      cep,
      id_addres_parto,
      id_addres_pre_natal,
    };
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

  return (
    <div className="create-user">
      <div class="wrapper">
        <header>Editar Área Descoberta</header>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Região</p>
            <input
              type="text"
              defaultValue={region}
              onChange={(r) => {
                setRegion(r.target.value);
              }}
            />
          </div>

          <div>
            <p>Bairro</p>
            <input
              type="text"
              defaultValue={district}
              onChange={(r) => {
                setDistrict(r.target.value);
              }}
            />
          </div>

          <div>
            <p>CEP</p>
            <input
              type="text"
              defaultValue={cep}
              onChange={(r) => {
                setCep(r.target.value);
              }}
            />
          </div>

          <div>
            <p>Cidade</p>
            <input
              type="text"
              defaultValue={city}
              onChange={(r) => {
                setCity(r.target.value);
              }}
            />
          </div>

          <div class="drop-list">
            <div class="from">
              <p>Estado</p>
              <div class="select-box">
                <select
                  onChange={(r) => {
                    setUf(r.target.value);
                  }}
                >
                  <option value={uf}>{uf} </option>
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
            </div>
          </div>

          <div class="drop-list2">
            <div class="from">
              <p>local de parto</p>
              <div class="select-box">
                <select
                  onChange={(r) => {
                    setId_addres_parto(r.target.value);
                  }}
                >
                  {dataCm.map((i) => (
                    <option key={i.value} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="drop-list2">
            <div class="from">
              <p>local de pré-natal</p>
              <div class="select-box">
                <select
                  onChange={(r) => {
                    setId_addres_pre_natal(r.target.value);
                  }}
                >
                  {dataCm.map((i) => (
                    <option key={i.value} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button>EDITAR</button>
        </form>
      </div>
    </div>
  );
}
