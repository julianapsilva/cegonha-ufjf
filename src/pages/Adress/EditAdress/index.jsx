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


    const [dataStreet, setDataStreet] = useState('')
    const [dataNumber, setDataNumber] = useState('')
    const [dataDistrict, setDataDistrict] = useState('')
    const [dataCity, setDataCity] = useState('')
    const [dataUf, setDataUf] = useState('')
    const [dataCep, setDataCep] = useState('')


    useEffect(() => {
        (async () => {
            const  result  = await api.get("adress/" + props.idAdress);
            setData(result)
            console.log('tangerine', result.data[0])
            setDataStreet(result.data[0].street)
            setDataNumber(result.data[0].number)
            setDataDistrict(result.data[0].district)
            setDataCity(result.data[0].city)
            setDataUf(result.data[0].uf)
            setDataCep(result.data[0].cep)
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
        console.log('location', values)
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
                        <input type="text" defaultValue={dataStreet} onChange={(r) => { setStreet(r.target.value) }}  />
                    </div>

                    <div>
                        <p>Número</p>
                        <input type="text" defaultValue={dataNumber} onChange={(r) => { setNumber(r.target.value) }} />
                    </div>

                    <div>
                        <p>Bairro</p>
                        <input type="text" defaultValue={dataDistrict} onChange={(r) => { setDistrict(r.target.value) }} />
                    </div>

                    <div>
                        <p>CEP</p>
                        <input type="text" defaultValue={dataCep} onChange={(r) => { setCep(r.target.value) }} />
                    </div>

                    <div>
                        <p>Cidade</p>
                        <input type="text" defaultValue={dataCity} onChange={(r) => { setCity(r.target.value) }} />
                    </div>

                    <div>
                        <p>Estado</p>
                        <input type="text" defaultValue={dataUf} onChange={(r) => { setUf(r.target.value) }} />
                    </div>

                    <button>EDITAR</button>
                </form>
            </div>
        </div>
    )
}
