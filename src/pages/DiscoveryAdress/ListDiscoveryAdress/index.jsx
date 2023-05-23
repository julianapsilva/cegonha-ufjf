import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css"
import Modal from 'react-modal';
import EditDiscoverAdress from '../EditDiscoveryAdress';
import Sidebar from '../../../Components/Sidebar';
import ListDistricts from '../ListDistricts'


const ListDiscoveryAdress = () => {
    const [data, setData] = useState([])
    const [page, setPage] = React.useState('');

    useEffect(() => {
        (async () => {
            const { data } = await api.get("discovery-address")
            console.log(data)
            setData(data)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [idDiscoverydAdress, setIdDiscoveryAdress] = React.useState(false);

    function openModal(id) {
        setIdDiscoveryAdress(id)
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const reload = () => {

        window.location.reload();
    };

    function swichPage(page, id) {
        setPage(page);
        openModal();
        setIdDiscoveryAdress(id);
    }

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
            //reload()
        }
    }

    return (
        <div>
            <Sidebar />
            <div className='wrapper-users'>
                <h1>Áreas descobertas</h1>
                <table>
                    <thead>
                        <tr className='title'>
                            <th>Região</th>
                            <th>Cidade-UF</th>
                            <th>Bairros</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr></thead>
                    <tbody>
                        {
                            data.map(({ id, region, city, uf, neighborhoods }, index) => (
                                <tr key={id}>
                                    <td>{region}</td>
                                    <td>{city}, {uf}</td>
                                    <td>
                                       
                                            {
                                                neighborhoods.map(({ name }, i) => (
                                                    <div>
                                                    <text>{name}</text>
                                                    </div>
                                                ))
                                            }
                                        
                                    </td>
                                    <td>
                                        <button className='bi bi-pencil' onClick={() => swichPage("EditDiscoverAdress", id)}></button>
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
                    {page === "EditDiscoverAdress" ? (
                        <EditDiscoverAdress idDiscoverydAdress={idDiscoverydAdress} />
                    ) : page === "District" ? (
                        <ListDistricts idDiscoverydAdress={idDiscoverydAdress} />
                    ) : null}

                </Modal>
            </div>
        </div>


    );
};

export default ListDiscoveryAdress
