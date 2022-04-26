import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css"
import Modal from 'react-modal';
import EditCenterMedical from '../EditCenterMedical';



const ListCenterMedical = () => {
    
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await api.get('medical-center')
            setData(data)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [idCenterMedical, setIdCenterMedical] = React.useState(false);


    function openModal(id) {
        setIdCenterMedical(id)
        setIsOpen(true);
    }
    
  
    function closeModal() {
        setIsOpen(false);
    }

    const reload = () => {

        window.location.reload();
      };
      
    const handleDelete = (id, index) => {
        const confirm = window.confirm(`Deseja realmente deletar o Centro Médico?`);
        if (confirm) {
               api.delete("medical-center/" + id)
               .then(
                data.splice(index, 1),
                setData([...data]),
                alert(
                  "Centro Médico deletado com sucesso!"
                 )
               )
               reload()    
        }
    }

    return (
        <div className='wrapper-users'>
            <h1>Centros Médicos</h1>
            <table>
                <thead>
                    <tr className='title'>
                        <th>Image</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr></thead>
                <tbody>
                    {
                        data.map(({ id, image, street, number, phone, cep }, index) => (
                            <tr key={id}>
                                <td> <img src={image} style={{  width: "200px", height:"auto"}} /> </td>
                                <td>{street}, {number}</td>
                                <td>{phone}</td>
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
                <EditCenterMedical idCenterMedical={idCenterMedical}/>
                   
            </Modal>
        </div>


    );
};

export default ListCenterMedical