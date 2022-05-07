import React, { useState, useEffect } from 'react'
import "./style.css"
import api from "../../../services/api"

export default function EditCenterMedical(props) {

    const reload = () => {

        window.location.reload();
      };
   

    const [data, setData] = useState([])

    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState('')



    useEffect(() => {
        (async () => {
            const  result  = await api.get("medical-center/" + props.idCenterMedical);
            setData(result)
            
            setImage(result.data.image)
            setName(result.data.name)
            setPhone(result.data.phone)
            setLatitude(result.data.latitude)
            setLongitude(result.data.longitude)
            setStreet(result.data.street)
            setNumber(result.data.number)
            setDistrict(result.data.district)
            setCity(result.data.city)
            setUf(result.data.uf)
            setCep(result.data.cep)
        })()

    }, [])




    const handleSubmit = e => {
        e.preventDefault();
    
        const values = {
          image,
          name,
          phone,
          latitude,
          longitude,
          street,
          number,
          district,
          cep, 
          city,
          uf
        };
        api.put("medical-center/" + props.idCenterMedical, values) 
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
                <header>Editar Centro Médico</header>
                <form onSubmit={handleSubmit}>
                <div>
                        <p>Imagem</p>
                        <input type="text" defaultValue={image} onChange={(r) => { setImage(r.target.value) }} />
                    </div>

                    <div>
                        <p>Nome</p>
                        <input type="text" defaultValue={name} onChange={(r) => { setName(r.target.value) }} />
                    </div>
                    
                    <div>
                        <p>Telefone</p>
                        <input type="text" defaultValue={phone} onChange={(r) => { setPhone(r.target.value) }} />
                    </div>

                    <div>
                        <p>Latitude</p>
                        <input type="text" defaultValue={latitude} onChange={(r) => { setLatitude(r.target.value) }} />
                    </div>

                    <div>
                        <p>Longitude</p>
                        <input type="text" defaultValue={longitude} onChange={(r) => { setLongitude(r.target.value) }} />
                    </div>

                    <div>
                        <p>Rua</p>
                        <input type="text" defaultValue={street} onChange={(r) => { setStreet(r.target.value) }}  />
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
