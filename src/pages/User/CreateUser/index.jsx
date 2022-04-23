import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import "./style.css"
import api from "../../../services/api"

export default function CreateUser() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [district, setDistrict] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState('')

    
   

    const handleSubmit = e => {
        e.preventDefault();
    
        const values = {
          name,
          username,
          email,
          password, 
          cpf, 
          street,
          number, 
          district, 
          city,
          uf, 
          cep
        };
        if(
            name &&
            username &&
            email &&
            password &&
            cpf &&
            street &&
            number &&
            district &&
            city &&
            uf &&
            cep
          ){
        api.post("/user", values)
          .then(res => {
            alert("SUCESSO!!! \n Cadastro realizado com sucesso!!!");
            navigate("/users");
          }, 
          (err) => {alert("Erro!!! \n O cadastro não foi realizado!!!", err);
         })} else {
            alert('Preencha todos os campos de dados!');
        };
        
          
}

    return (
        <div className='create-user'>


            <div class="wrapper">
                <header>Cadastrar novo usuário</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Nome</p>
                        <input type="text" onChange={(r) => { setName(r.target.value) }} />
                    </div>

                    <div>
                        <p>Nome de usuário</p>
                        <input type="text" onChange={(r) => { setUsername(r.target.value) }} />
                    </div>

                    <div>
                        <p>Email</p>
                        <input type="email" onChange={(r) => { setEmail(r.target.value) }} />
                    </div>

                    <div>
                        <p>Senha</p>
                        <input type="password" onChange={(r) => { setPassword(r.target.value) }} />
                    </div>

                    <div>
                        <p>CPF</p>
                        <input type="text" onChange={(r) => { setCpf(r.target.value) }} />
                    </div>


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
                        <input type="text" onChange={(r) => { setDistrict(r.target.value) }} />
                    </div>

                    <div>
                        <p>CEP</p>
                        <input type="text" onChange={(r) => { setCep(r.target.value) }} />
                    </div>

                    <div>
                        <p>Cidade</p>
                        <input type="text" onChange={(r) => { setCity(r.target.value) }} />
                    </div>

                    <div class="drop-list">
                        <div class="from">
                            <p>Estado</p>
                            {/*<input type="text" onChange={(r) => { setUf(r.target.value) }} />*/}
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
                    

                    <button>ADICIONAR USUÁRIO</button>
                </form>
            </div>
        </div>
    )
}
