import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import "./style.css";
import Modal from "react-modal";
import CreateUser from "../CreateUser";
import EditiUser from "../EditUser";
import Adress from "../../Adress/ListAdress";
import Sidebar from "../../../Components/Sidebar";

const ListUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/user");
      setData(data);
    })();
  }, []);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(false);
  const [cpfUser, setCpfUser] = React.useState(false);

  function swichPage(page, cpf) {
    setPage(page);
    openModal();
    setCpfUser(cpf);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const reload = () => {
    window.location.reload();
  };

  const handleDelete = (id, index) => {
    const confirm = window.confirm(`Deseja realmente deletar o usuário?`);
    if (confirm) {
      api.delete(`user/` + `${id}`).then(
        //data.splice(index, 1),
        setData([...data]),
        alert("Usuário deletado com sucesso!")
      );
      reload();
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="wrapper-users">
        <h1>Usuários cadastrados</h1>
        <table>
          <thead>
            <tr className="title">
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Editar</th>
              <th>Eendereços</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, email, cpf }, index) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{cpf}</td>
                <td>
                  <button
                    className="bi bi-pencil"
                    onClick={() => swichPage("EditUser", cpf)}
                  ></button>
                </td>
                <td>
                  <button
                    className="bi bi-pin-map-fill"
                    onClick={() => swichPage("Adress", cpf)}
                  ></button>
                </td>
                <td>
                  <button
                    className="bi bi-trash"
                    onClick={() => handleDelete(id, index)}
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <button onClick={closeModal}>close</button>
          {page === "EditUser" ? (
            <EditiUser cpfUser={cpfUser} />
          ) : page === "Adress" ? (
            <Adress cpfUser={cpfUser} />
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

export default ListUsers;
