import React, { useState, useEffect } from 'react'
import "./style.css"
import api from "../../../services/api"

export default function EditDiscoverAdress(props) {

    const reload = () => {

        window.location.reload();
    };
   

    const [data, setData] = useState([])
    const [dataCm, setDataCm,] = useState([])

    const [region, setRegion] = useState();
    const [district, setDistrict] = useState();
    const [city, setCity] = useState();
    const [uf, setUf] = useState();
    const [cep, setCep] = useState();
    const [id_addres_parto, setId_addres_parto] = useState();
    const [id_addres_pre_natal, setId_addres_pre_natal] = useState();

    useEffect(() => {
        (async () => {
            const  result  = await api.get("discovery-address/" + props.idDiscoverydAdress);
            setData(result)
            
            setRegion(result.data.region)
            setDistrict(result.data.district)
            setCity(result.data.city)
            setUf(result.data.uf)
            setCep(result.data.cep)
            setId_addres_parto(result.data.id_addres_parto)
            setId_addres_pre_natal(result.data.id_addres_pre_natal)
        })()

    }, [])

    useEffect(() => {
        const fetchData = async () => {
          const result = await api.get("medical-center");
          setDataCm(result.data);
        };
        fetchData();
      }, []);




    const handleSubmit = e => {
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
        api.put("discovery-address/" + props.idDiscoverydAdress, values) 
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
                <header>Editar Área Descoberta</header>
                <form onSubmit={handleSubmit}>
                <div>
                        <p>Região</p>
                        <input type="text" defaultValue={region} onChange={(r) => { setRegion(r.target.value) }} />
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

                    <div class="drop-list2">
                        <div class="from">
                            <p>local de parto</p>
                            <div class="select-box">
                                <select onChange={(r) => { setId_addres_parto(r.target.value) }}>
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
                                <select onChange={(r) => { setId_addres_pre_natal(r.target.value) }}>
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
    )
}
