import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  function dropDown() {
    // document.querySelector("#submenu").classList.toggle("hidden");
    // document.querySelector("#arrow").classList.toggle("rotate-0");
  }

  function Openbar() {
    document.querySelector(".sidebar").classList.toggle("left-[-300px]");
  }

  return (
    <div>
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={() => Openbar()}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      <div
        className="sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] duration-1000
        p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen"
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center rounded-md ">
            <p className="text-[15px]  ml-3 text-xl text-gray-200 font-bold text-center">
              Rede Cegonha
            </p>
            <i
              class="bi bi-x ml-20 cursor-pointer lg:hidden"
              onClick={() => Openbar()}
            ></i>
          </div>
          <hr className="my-2 text-gray-600" />

          <div>
            <div
              className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer 
                             hover:bg-blue-600"
            >
              <i className="bi bi-people-fill"></i>
              <div
                className="flex justify-between w-full items-center"
                onClick={() => dropDown()}
              >
                <span className="text-[15px] ml-4 text-gray-200">Usuários</span>
                <span className="text-sm rotate-180" id="arrow">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </div>
            </div>
            <div
              className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
              id="submenu"
            >
              <Link to="/users">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Listar usuários cadastrados
                </p>
              </Link>
              <Link to="/create-user">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Adicionar novo usuário
                </p>
              </Link>
            </div>

            <div
              className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer 
                             hover:bg-blue-600"
            >
              <i className="bi bi-building"></i>
              <div
                className="flex justify-between w-full items-center"
                onClick={dropDown()}
              >
                <span className="text-[15px] ml-4 text-gray-200">
                  Centros médicos
                </span>
                <span className="text-sm rotate-180" id="arrow">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </div>
            </div>
            <div
              className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
              id="submenu"
            >
              <Link to="/center-medical">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Listar centros médicos
                </p>
              </Link>
              <Link to="/create-center-medical">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Adicionar novo centro médico
                </p>
              </Link>
            </div>

            <div
              className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer 
                             hover:bg-blue-600"
            >
              <i className="bi bi-pin-map-fill"></i>
              <div
                className="flex justify-between w-full items-center"
                onClick={dropDown()}
              >
                <span className="text-[15px] ml-4 text-gray-200">
                  Endereços cobertos
                </span>
                <span className="text-sm rotate-180" id="arrow">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </div>
            </div>
            <div
              className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
              id="submenu"
            >
              <Link to="/cover-adress">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Listar endereços
                </p>
              </Link>
              <Link to="/create-cover-adress">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Adicionar novo endereço
                </p>
              </Link>
            </div>

            <div
              className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer 
                             hover:bg-blue-600"
            >
              <i className="bi bi-map"></i>
              <div
                className="flex justify-between w-full items-center"
                onClick={dropDown()}
              >
                <span className="text-[15px] ml-4 text-gray-200">
                  Áreas descobertas
                </span>
                <span className="text-sm rotate-180" id="arrow">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </div>
            </div>
            <div
              className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
              id="submenu"
            >
              <Link to="/discovery-adress">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Listar áreas descobertas
                </p>
              </Link>
              <Link to="/create-discovery-adress">
                <p className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Adicionar nova área
                </p>
              </Link>
            </div>

            <div
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer 
                             hover:bg-blue-600"
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <Link to="/login">
                <span className="text-[15px] ml-4 text-gray-200">Sair</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
