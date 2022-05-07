import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css"
import Modal from 'react-modal';
import EditDiscoverAdress from '../EditDiscoveryAdress';
import Sidebar from '../../../Components/Sidebar';




const ListDiscoveryAdress = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await api.get("discovery-address")
            setData(data)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [idDiscoverydAdress, setIdDiscoveryAdress] = React.useState(false);

    function openModal(id){
        setIdDiscoveryAdress(id)
        setIsOpen(true);
    }

 
  
    function closeModal() {
        setIsOpen(false);
    }

    const reload = () => {

        window.location.reload();
      };
      
    const handleDelete = (id, index) => {
        const confirm = window.confirm(`Deseja realmente deletar a área descoberta?`);
        if (confirm) {
            api.delete("discovery-address/" + id)
               .then(
                data.splice(index, 1),
                setData([...data]),
                alert(
                  "Área deletado com sucesso!"
                 )
               )
               reload()    
        }
    }

    return (
        <div> 
            <Sidebar/>
            <div className='wrapper-users'>
                <h1>Áreas descobertas</h1>
                <table>
                    <thead>
                        <tr className='title'>
                            <th>Bairro</th>
                            <th>Região</th>
                            <th>Cidade-UF</th>
                            <th>CEP</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr></thead>
                    <tbody>
                        {
                            data.map(({ id, district, region, city, uf, cep}, index) => (
                                <tr key={id}>
                                    <td>{district}</td>
                                    <td>{region}</td>
                                    <td>{city}, {uf}</td>
                                    <td>{cep}</td>
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
                    
                            <EditDiscoverAdress idDiscoverydAdress={idDiscoverydAdress}/>
                        
                        </Modal>
            </div>
        </div>


    );
};

export default ListDiscoveryAdress
