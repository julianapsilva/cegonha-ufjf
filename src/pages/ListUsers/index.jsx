import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./style.css"
import Modal from 'react-modal';
import CreateUser from '../CreateUser';


const ListUsers = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await api.get('/user')
            setData(data)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const handleDelete = (id, index) => {
        const confirm = window.confirm(`Deseja realmente deletar o usuário?`);
        if (confirm) {
            //   api.delete(`/users/${id}`).then(
            //     data.splice(index, 1),
            //     setData([...data]),
            //     alert(
            //       "Usuário deletado com sucesso!"
            //     )
            //   )
        }
    }

    return (
        <div className='wrapper-users'>
            <h1>Usuários cadastrados</h1>
            <table>
                <thead>
                    <tr className='title'>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr></thead>
                <tbody>
                    {
                        data.map(({ id, name, email, cpf }, index) => (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{cpf}</td>
                                <td className='actions'>
                                    <button className='bi bi-pencil' onClick={openModal}></button>
                                    <button className='bi bi-pin-map-fill'></button>
                                    <button className='bi bi-trash' onClick={() => handleDelete(id, index)}></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>close</button>
                <CreateUser />
            </Modal>
        </div>


    );
};

export default ListUsers
