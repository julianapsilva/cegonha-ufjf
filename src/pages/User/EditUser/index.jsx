import React, { useState, useEffect } from 'react'
import "./style.css"
import api from "../../../services/api"
import { render } from '@testing-library/react'


export default function EditUser(props) {
    
    
    const [data, setData] = useState([])



    useEffect(() => {
        (async () => {
            const { data } = await api.get("userCpf/" + props.cpfUser)
            setData(data)
            setName(data[0].name)
            setUsername(data[0].username)
            setCpf(data[0].cpf)
            setEmail(data[0].email)
        })()

    }, [])

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')

    const reload = () => {

        window.location.reload();
      };


    const handleSubmit = e => {
        e.preventDefault();
    
        const values = {
          name,
          username,
          email,
          cpf
        };
        api.put(`user2/` + `${data[0].id}`, values)
        .then(res => {
            alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
            reload()
          }, 
          (err) => {alert("Erro!!! \n Erro na edição!!!", err);
        });
          
      }


    return (
       
        <div className='create-user'>


            <div class="wrapper">
                <header>Editar usuário</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Nome</p>
                        <input type="text"  onChange={(r) => { setUsername(r.target.value) }} defaultValue={name} />
                    </div>

                    <div>
                        <p>Nome de usuário</p>
                        <input type="text"  onChange={(r) => {setName(r.target.value) }} defaultValue={username} />
                    </div>

                    <div>
                        <p>Email</p>
                        <input type="email"  onChange={(r) => { setEmail(r.target.value) }} defaultValue={email} />
                    </div>

                    <div>
                        <p>CPF</p>
                        <input type="text"  onChange={(r) => { setCpf(r.target.value) }} defaultValue={cpf} />
                    </div>

                    <button>EDITAR</button>
                </form>
            </div>
        </div>
       
    )
}
