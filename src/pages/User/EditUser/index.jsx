import React, { useState, useEffect } from 'react'
import "./style.css"
import api from "../../../services/api"
import { render } from '@testing-library/react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from './schema';
import { cpfMask } from "../../../utils/cpfMask";
import { cepMask } from "../../../utils/cepMask";


export default function EditUser(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setFocus,
      } = useForm({
        resolver: yupResolver(schema),
      });
    
    const [data, setData] = useState([])



    useEffect(() => {
        (async () => {
            const { data } = await api.get("userCpf/" + props.cpfUser)
            setData(data)
            setValue("name", data[0].name);
            setValue("username", data[0].username);
            setValue("cpf", data[0].cpf);
            setValue("email", data[0].email);

        })()

    }, [])

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')

    const reload = () => {

        window.location.reload();
      };
    
    const submitForm = (values) => {
        console.log(values)
        api.put(`user2/` + `${data[0].id}`, values)
        .then(res => {
            alert("SUCESSO!!! \n Edição realizada com sucesso!!!");
            reload()
          }, 
          (err) => {alert("Erro!!! \n Erro na edição!!!", err);
        });
    };


    return (
       
      <div className='create-user'>


        <div class="wrapper">
                <header>Editar usuário</header>
               
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <p>Nome</p>
            <input type="text" name="name"  {...register("name")} />
            <p className="validationError">
              {" "}
              {errors?.name && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Nome de usuário</p>
            <input type="text" name="username" {...register("username")} />
            <p className="validationError">
              {" "}
              {errors?.username && "Campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>Email</p>
            <input type="email" name="email" {...register("email")} />
            <p className="validationError">
              {" "}
              {errors?.email && "Email inválido, campo obrigatório"}{" "}
            </p>
          </div>

          <div>
            <p>CPF</p>
            <input
              type="text"
              name="cpf"
              {...register("cpf")}
              onClick={(event) => {
                cpfMask(event);
              }}
              onChange={(event) => {
                cpfMask(event);
              }}
            />
            <p className="validationError">
              {" "}
              {errors?.cpf && errors?.cpf.message}
            </p>
          </div>
          <button>EDITAR</button>
        </form>
         </div>
    </div>
       
    )
}
