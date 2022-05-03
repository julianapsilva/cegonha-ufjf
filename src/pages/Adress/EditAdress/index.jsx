import React, { useState, useEffect } from 'react'
import "./style.css"
import api from "../../../services/api"

export default function EditAdress(props) {

    const reload = () => {

        window.location.reload();
      };
   

    const [data, setData] = useState([])

    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState('')



    useEffect(() => {
        (async () => {
            const  result  = await api.get("adress/" + props.idAdress);
            setData(result)
            setStreet(result.data[0].street)
            setNumber(result.data[0].number)
            setDistrict(result.data[0].district)
            setCity(result.data[0].city)
            setUf(result.data[0].uf)
            setCep(result.data[0].cep)
        })()

    }, [])




    const handleSubmit = e => {
        e.preventDefault();
    
        const values = {
          street,
          number,
          district,
          cep, 
          city,
          uf
        };
        api.put("adress/" + props.idAdress + "/" + props.idUser, values) 
          .then(res => {
            alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
            reload()
          }, 
          (err) => {alert("Erro!!! \n A edição não foi realizado!!!", err);
        });
          
      }

    return (
        <div className='create-user'>


            <div class="wrapper">
                <header>Editar endreço</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Rua</p>
                        <input type="text" fullWidth defaultValue={street} onChange={(r) => { setStreet(r.target.value) }}  />
                    </div>

                    <div>
                        <p>Número</p>
                        <input type="text" defaultValue={number} onChange={(r) => { setNumber(r.target.value) }} />
                    </div>

                    <div>
                        <p>Bairro</p>
                        <input type="text" defaultValue={district} onChange={(r) => { setDistrict(r.target.value) }} />
                    </div>

                    <div>
                        <p>CEP</p>
                        <input type="text" defaultValue={cep} onChange={(r) => { setCep(r.target.value) }} />
                    </div>

                    <div>
                        <p>Cidade</p>
                        <input type="text" defaultValue={city} onChange={(r) => { setCity(r.target.value) }} />
                    </div>

                    <div class="drop-list">
                        <div class="from">
                            <p>Estado</p>
                            {/*<input type="text" onChange={(r) => { setUf(r.target.value) }} />*/}
                            <div class="select-box">
                                <select onChange={(r) => { setUf(r.target.value) }}>
                                    <option value={uf}>{uf} </option>
                                    <option value={"Acre (AC)"}>Acre (AC) </option>
                                    <option value={"Alagoas (AL)"}>Alagoas (AL)</option>
                                    <option value={"Amazonas (AM)"}>Amazonas (AM)</option>
                                    <option value={"Bahia (BA)"}> Bahia (BA)</option>
                                    <option value={"Ceará (CE)"}> Ceará	(CE)</option>
                                    <option value={"Distrito Federal (DF)"}>Distrito Federal (DF)</option>
                                    <option value={"Espírito Santo (ES)"}>Espírito Santo	(ES)</option>
                                    <option value={"Goiás	(GO)"}>Goiás (GO)</option>
                                    <option value={"Maranhão	(MA)"}>Maranhão	(MA) </option>
                                    <option value={"Mato Grosso	(MT)"}> Mato Grosso	(MT)</option>
                                    <option value={" Mato Grosso do Sul	(MS)"}> Mato Grosso do Sul	(MS)</option>
                                    <option value={"Minas Gerais	(MG)"}>Minas Gerais	(MG) </option>
                                    <option value={"Pará	(PA)"}>Pará	(PA) </option>
                                    <option value={" Paraíba (PB)"}> Paraíba (PB) </option>
                                    <option value={"Paraná (PR)"}>Paraná	(PR)</option>
                                    <option value={"Pernambuco	(PE)"}> Pernambuco (PE)</option>
                                    <option value={"Piauí	(PI)"}> Piauí	(PI)</option>
                                    <option value={"Rio de Janeiro (RJ)"}> Rio de Janeiro	(RJ)</option>
                                    <option value={"Rio Grande do Norte	(RN)"}>Rio Grande do Norte	(RN) </option>
                                    <option value={" Rio Grande do Sul 	(RS)"}> Rio Grande do Sul (RS) </option>
                                    <option value={"Rondônia	(RO)"}>Rondônia	(RO) </option>
                                    <option value={"Roraima	(RR)"}> Roraima	(RR)</option>
                                    <option value={"Santa Catarina (SC)"}> Santa Catarina (SC)</option>
                                    <option value={"São Paulo (SP)"}> São Paulo (SP)</option>
                                    <option value={"Sergipe	(SE)"}> Sergipe	(SE)</option>
                                    <option value={"Tocantins	(TO)"}>Tocantins (TO)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button>EDITAR</button>
                </form>
            </div>
        </div>
    )
}
