import React, { useState } from 'react'
import "./style.css"

export default function CreateUser() {
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
    return (
        <div className='create-user'>


            <div class="wrapper">
                <header>Cadastrar novo usuário</header>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    console.log(username, email)
                }}>
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


                    <div class="drop-list">
                        <div class="from">
                            <p>Estado</p>
                            <div class="select-box">
                                <select>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Cidade</p>
                        <input type="text" onChange={(r) => { setCity(r.target.value) }} />
                    </div>

                    <button>ADICIONAR USUÁRIO</button>
                </form>
            </div>
        </div>
    )
}
