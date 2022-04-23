import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css";
import Modal from 'react-modal';
import EditAdress from '../EditAdress';
import CreateAdress from '../CreateAdress';



const ListAdress = (props) => {
    
    const [data, setData] = useState([])
    const [page, setPage] = React.useState(false);
    const [idAdress, setIdAdress] = React.useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await api.get("user/" + props.cpfUser )
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

    function swichPage(page,id) {
        setPage(page)
        openModal()
        setIdAdress(id)
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
            <h1>Endereços</h1>
            <div>
                {data.map((item, id) => (
                    <table key={id}>
                        <thead>
                            <tr className='title'>
                                <th>Rua</th>
                                <th>Bairro</th>
                                <th>cidade</th>
                                <th>Estado</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr></thead>
                        <tbody>
                            {
                                item.adresses.map(({ id, street, number, district, city, uf }, index) => (
                                    <tr key={id}>
                                        <td>{street}, {number}</td>
                                        <td>{district}</td>
                                        <td>{city}</td>
                                        <td>{uf}</td>
                                        <td>
                                            <button className='bi bi-pencil' onClick={() => swichPage('EditAdress',id)}></button>
                                        </td>
                                        <td >
                                            <button className='bi bi-trash' onClick={() => handleDelete(id, index)}></button>
                                        </td>
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ))}
                <button onClick={() => swichPage('CreateAdress')}>ADICIONAR ENDEREÇO</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>close</button>
                    { page === "EditAdress" ?(
                        <EditAdress idAdress={idAdress}/>
                    ):page === "CreateAdress" ?(
                        <CreateAdress/>
                    ):null}
            </Modal>
        </div>


    );
};

export default ListAdress
