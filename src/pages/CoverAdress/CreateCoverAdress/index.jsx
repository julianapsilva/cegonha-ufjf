import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';
import "./style.css"
import api from "../../../services/api"
import Sidebar from '../../../Components/Sidebar';

export default function CreateCoverAdress(props) {

    const navigate = useNavigate();
    
    const [street, setStreet] = useState('')
    const [number_start, setNumber_start] = useState('')
    const [number_end, setNumber_end] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState('')
    const [id_addres_parto, setId_addres_parto] = useState('')
    const [id_addres_pre_natal, setId_addres_pre_natal] = useState('')


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await api.get("medical-center");
          setData(result.data);
        };
        fetchData();
      }, []);


    const handleSubmit = e => {
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
        if(
            street && 
            number_start &&
            number_end &&
            district &&
            city &&
            uf &&
            cep &&
            id_addres_parto &&
            id_addres_pre_natal
          ){
        api.post("cover-address", values)
          .then(res => {
            alert("SUCESSO!!! \n Endereço cadastrado com sucesso!!!");
            navigate("/cover-adress") 
          }, 
          (err) => {alert("Erro!!! \n O cadastro não foi realizado!!!", err);
         })} else {
            alert('Preencha todos os campos de dados!');
        };
        
          
}

    return (
        <div> 
            <Sidebar/>
            <div className='create-user'>


                <div class="wrapper">
                    <header>Cadastrar novo Endereço Coberto</header>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <p>Rua</p>
                            <input type="text"  onChange={(r) => { setStreet(r.target.value) }} />
                        </div>

                        <div>
                            <p>Numero inicial</p>
                            <input type="text"  onChange={(r) => { setNumber_start(r.target.value) }} />
                        </div>
                        
                        <div>
                            <p>Numero final</p>
                            <input type="text"  onChange={(r) => { setNumber_end(r.target.value) }} />
                        </div>

                        <div>
                            <p>CEP</p>
                            <input type="text" onChange={(r) => { setCep(r.target.value) }} />
                        </div>

                        <div>
                            <p>Bairro</p>
                            <input type="text"  onChange={(r) => { setDistrict(r.target.value) }} />
                        </div>

                        <div>
                            <p>Cidade</p>
                            <input type="text" onChange={(r) => { setCity(r.target.value) }} />
                        </div>


                        <div class="drop-list">
                            <div class="from">
                                <p>Estado</p>
                                <div class="select-box">
                                    <select onChange={(r) => { setUf(r.target.value) }}>
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
                                        <option value={''}>{''} </option>
                                        {data.map((i) => (
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
                                        <option value={''}>{''} </option>
                                        {data.map((i) => (
                                        <option key={i.value} value={i.id}>
                                        {i.name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button>ADICIONAR ENDEREÇO COBERTO</button>
                    </form>
                </div>
            </div>
        </div>
    )
}