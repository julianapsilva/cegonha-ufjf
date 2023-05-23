import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import "./style.css";


const ListDistrics = (props) => {

    const reload = () => {

        window.location.reload();
    };

    const [data, setData] = useState([])
    const [page, setPage] = React.useState(false);
    const [idAdress, setIdAdress] = React.useState(false);
    const [idUser, setIdUser] = React.useState();

    useEffect(() => {
        (async () => {
            console.log(props.idDiscoverydAdress)
            const neighborhoods = await api.get("neighborhood/" + props.idDiscoverydAdress)
            setData(neighborhoods.data)
        })()

    }, [])

    const [modalIsOpen, setIsOpen] = React.useState(false);



    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    function swichPage(page, idAdress) {
        setPage(page)
        setIdAdress(idAdress)
        openModal()

    }

    const handleDelete = (id, index) => {
        const confirm = window.confirm(`Deseja realmente deletar o usuário?`);
        if (confirm) {
            api.delete("adress/" + id + "/" + idUser).then(
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
            <table2>
                <thead>
                    <tr className='title'>
                        <th>Bairros</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({id, name},index) => (
                            <tr key={id}>
                                <td>{name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table2>
        </div>


    );
};

export default ListDistrics
