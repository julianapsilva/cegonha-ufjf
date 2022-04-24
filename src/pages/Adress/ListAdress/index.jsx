import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css";
import Modal from 'react-modal';
import EditAdress from '../EditAdress';
import CreateAdress from '../CreateAdress';



const ListAdress = (props) => {

    const reload = () => {

        window.location.reload();
      };
    
    const [data, setData] = useState([])
    const [page, setPage] = React.useState(false);
    const [idAdress, setIdAdress] = React.useState(false);
    const [idUser, setIdUser] = React.useState();

    useEffect(() => {
        (async () => {
            const { data } = await api.get("user/" + props.cpfUser )
            setData(data)
            setIdUser(data[0].id)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);



    function openModal() {
        setIsOpen(true);
    }

  
    function closeModal() {
        setIsOpen(false);
    }

    function swichPage(page,idAdress) {
        setPage(page)
        setIdAdress(idAdress)
        openModal()
        
    }

    const handleDelete = (id, index) => {
        const confirm = window.confirm(`Deseja realmente deletar o usuário?`);
        if (confirm) {
                api.delete("adress/" + id + "/" + idUser ).then(
                data.splice(index, 1),
                 setData([...data]),
                alert(
                   "Endereço deletado com sucesso!"
                 )
               )
               reload() 
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
                <button onClick={() => swichPage('CreateAdress',)}>ADICIONAR ENDEREÇO</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>close</button>
                    { page === "EditAdress" ?(
                        <EditAdress idAdress={idAdress} idUser ={idUser}/>
                    ):page === "CreateAdress" ?(
                        <CreateAdress cpfUser={props.cpfUser}/>
                    ):null}
            </Modal>
        </div>


    );
};

export default ListAdress
