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

                    <div>
                        <p>Estado</p>
                        <input type="text" defaultValue={uf} onChange={(r) => { setUf(r.target.value) }} />
                    </div>

                    <button>EDITAR</button>
                </form>
            </div>
        </div>
    )
}
