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
