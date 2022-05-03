import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css"
import Modal from 'react-modal';
//import CreateUser from '../CreateUser';
import EditCoverAdress from '../EditCoverAdress';
import Sidebar from '../../../Components/Sidebar';



const ListCoverAdress = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await api.get("cover-address")
            setData(data)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [idCoverAdress, setIdCoverAdress] = React.useState(false);

    function openModal(id){
        setIdCoverAdress(id)
        setIsOpen(true);
    }

 
  
    function closeModal() {
        setIsOpen(false);
    }

    const reload = () => {

        window.location.reload();
      };
      
    const handleDelete = (id, index) => {
        const confirm = window.confirm(`Deseja realmente deletar endereço coberto?`);
        if (confirm) {
              api.delete("cover-address/" + id)
               .then(
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
        <div> 
            <Sidebar/>
            <div className='wrapper-users'>
                <h1>Endreços Cobertos</h1>
                <table>
                    <thead>
                        <tr className='title'>
                            <th>Rua</th>
                            <th>Números</th>
                            <th>CEP</th>
                            <th>Bairro</th>
                            <th>Cidade-UF</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr></thead>
                    <tbody>
                        {
                            data.map(({ id, street, number_start, number_end, district, city, uf, cep }, index) => (
                                <tr key={id}>
                                    <td>{street}</td>
                                    <td>{number_start} ao {number_end}</td>
                                    <td>{cep}</td>
                                    <td>{district}</td>
                                    <td>{city}, {uf}</td>
                                    <td>
                                        <button className='bi bi-pencil' onClick={() => openModal(id)}></button>
                                    </td>
                                    <td >
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
                    
                            <EditCoverAdress idCoverAdress={idCoverAdress}/>
                        
                        </Modal>
            </div>
        </div>

    );
};

export default ListCoverAdress
