import React, { useState } from 'react'
import "./style.css"
import api from "../../../services/api"

export default function EditAdress() {

    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState('')

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
        api.put("/user", values)
          .then(res => {
            alert("SUCESSO!!! \n Cadastro realizado com sucesso!!!");
          }, 
          (err) => {alert("Erro!!! \n O cadastro não foi realizado!!!", err);
        });
          
      }

    return (
        <div className='create-user'>


            <div class="wrapper">
                <header>Editar endreço</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Rua</p>
                        <input type="text" onChange={(r) => { setStreet(r.target.value) }} />
                    </div>

                    <div>
                        <p>Número</p>
                        <input type="text" onChange={(r) => { setNumber(r.target.value) }} />
                    </div>

                    <div>
                        <p>Bairro</p>
                        <input type="email" onChange={(r) => { setDistrict(r.target.value) }} />
                    </div>

                    <div>
                        <p>CEP</p>
                        <input type="email" onChange={(r) => { setCep(r.target.value) }} />
                    </div>

                    <div>
                        <p>Cidade</p>
                        <input type="password" onChange={(r) => { setCity(r.target.value) }} />
                    </div>

                    <div>
                        <p>Estado</p>
                        <input type="text" onChange={(r) => { setUf(r.target.value) }} />
                    </div>

                    <button>EDITAR</button>
                </form>
            </div>
        </div>
    )
}
