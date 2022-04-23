import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import "./style.css"
import api from "../../services/api"
import { login } from "../../services/auth";

export default function Login() {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(""); 

    const handleSignIn = async e => {
        e.preventDefault();
        if (!username || !password) {
          setError( "Preencha e-mail e senha para continuar!");
        } else {
          try {
            const response = await api.post("/login", { username, password });
            login(response.data.token);
            navigate("/users");
          } catch (err) {
            setError( "Houve um problema com o login, verifique suas credenciais. T.T");
          }
        }
      };
      
    return (
        <div className='create-user'>


            <div class="wrapper">
                <header>Login</header>
                <form onSubmit={handleSignIn}>
                    <div>
                        <p>Nome de usuário</p>
                        <input type="text" onChange={(r) => { setUsername(r.target.value) }} />
                    </div>


                    <div>
                        <p>Senha</p>
                        <input type="password" onChange={(r) => { setPassword(r.target.value) }} />
                    </div>


                    <button>ENTRAR</button>
                </form>
            </div>
        </div>
    )
}