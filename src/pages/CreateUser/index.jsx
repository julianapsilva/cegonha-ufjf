import React from 'react'
import "./style.css"

export default function CreateUser() {
    return (
        <div className='create-user'>


            <div class="wrapper">
                <header>Cadastrar novo usuário</header>
                <form action="#">
                    <div>
                        <p>Nome</p>
                        <input type="text" />
                    </div>

                    <div>
                        <p>Nome de usuário</p>
                        <input type="text" />
                    </div>

                    <div>
                        <p>Email</p>
                        <input type="email" />
                    </div>

                    <div>
                        <p>Senha</p>
                        <input type="password" />
                    </div>

                    <div>
                        <p>CPF</p>
                        <input type="text" />
                    </div>


                    <div>
                        <p>Rua</p>
                        <input type="text" />
                    </div>

                    <div>
                        <p>Número</p>
                        <input type="text" />
                    </div>

                    <div>
                        <p>Bairro</p>
                        <input type="text" />
                    </div>

                    <div>
                        <p>CEP</p>
                        <input type="text" />
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
                        <input type="text" />
                    </div>

                    <button>ADICIONAR USUÁRIO</button>
                </form>
            </div>
        </div>
    )
}
