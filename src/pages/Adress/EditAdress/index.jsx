import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../../services/api";

export default function EditAdress(props) {
  const reload = () => {
    window.location.reload();
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
      setStreet(result.data[0].street);
      setNumber(result.data[0].number);
      setDistrict(result.data[0].district);
      setCity(result.data[0].city);
      setUf(result.data[0].uf);
      setCep(result.data[0].cep);
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      street,
      number,
      district,
      cep,
      city,
      uf,
    };
    api.put("adress/" + props.idAdress + "/" + props.idUser, values).then(
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
        <form onSubmit={handleSubmit}>
          <div>
            <p>Rua</p>
            <input
              type="text"
              fullWidth
              defaultValue={street}
              onChange={(r) => {
                setStreet(r.target.value);
              }}
            />
          </div>

          <div>
            <p>Número</p>
            <input
              type="text"
              defaultValue={number}
              onChange={(r) => {
                setNumber(r.target.value);
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
              {/*<input type="text" onChange={(r) => { setUf(r.target.value) }} />*/}
              <div class="select-box">
                <select
                  onChange={(r) => {
                    setUf(r.target.value);
                  }}
                >
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

          <button>EDITAR</button>
        </form>
      </div>
    </div>
  );
}
