import React, { useState, useEffect } from 'react'
import "./style.css"
import api from "../../../services/api"
import { render } from '@testing-library/react'


export default function EditUser(props) {
    
    
    const [data, setData] = useState([])

    const [dataUsername, setDataUsername] = useState('')
    const [dataName, setDataName] = useState('')
    const [dataCpf, setDataCpf] = useState('')
    const [dataEmail, setDataEmail] = useState('')


    useEffect(() => {
        (async () => {
            const { data } = await api.get("user/" + props.cpfUser)
            setData(data)
            setDataName(data[0].name)
            setDataUsername(data[0].username)
            setDataCpf(data[0].cpf)
            setDataEmail(data[0].email)
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
        console.log('dados: ' , data[0].id, values)
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
                        <input type="text" onChange={(r) => { setName(r.target.value) }} defaultValue={dataName} />
                    </div>

                    <div>
                        <p>Nome de usuário</p>
                        <input type="text" onChange={(r) => { setUsername(r.target.value) }} defaultValue={dataUsername} />
                    </div>

                    <div>
                        <p>Email</p>
                        <input type="email" onChange={(r) => { setEmail(r.target.value) }} defaultValue={dataEmail} />
                    </div>

                    <div>
                        <p>CPF</p>
                        <input type="text" onChange={(r) => { setCpf(r.target.value) }} defaultValue={dataCpf} />
                    </div>

                    <button>EDITAR</button>
                </form>
            </div>
        </div>
       
    )
}
