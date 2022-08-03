import React, { useState, useEffect } from 'react';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosPetition } from '../helpers/Axios';
import Swal from 'sweetalert2';

export const TablaUsuarios = ({ bandera, setFormulario, setData }) => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        obtenerUsuarios();
    }, [bandera]);

    const obtenerUsuarios = async () => {

        const peticion = await axiosPetition("/api/usuarios");

        setUsuarios(peticion.usuarios);
    }

    const eliminarUsuario = (cedula) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no tiene vuelta atrás!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Sí, eliminalo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const peticion = await axiosPetition(`/api/usuarios/${cedula}`, {}, "DELETE");
                if (!peticion.ok) {
                    Swal.fire({
                        title: 'Uy!',
                        text: peticion.msg,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                } else {
                    Swal.fire(
                        'Eliminado correctamente!',
                        'El usuario ha sido eliminado correctamente.',
                        'success'
                    );
                    obtenerUsuarios();
                }
            }
        });
    }

    return (
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs  uppercasetext-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6 bg-gray-800">
                        CÉDULA
                    </th>
                    <th scope="col" className="py-3 px-6">
                        NOMBRE
                    </th>
                    <th scope="col" className="py-3 px-6 bg-gray-800">
                        MONTO
                    </th>
                    <th scope="col" className="py-3 px-6">
                        ACCIONES
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios?.map((usuario, index) => {
                        return <tr className="border-b border-gray-700" key={index}>
                            <th scope="row" className="py-4 px-6 font-medium pr-24 text-white whitespace-nowrap bg-gray-800">
                                {usuario.cedula}
                            </th>
                            <td className="py-4 px-6 pr-24">
                                {usuario.nombre}
                            </td>
                            <td className="py-4 px-6 pr-24 bg-gray-800">
                                {usuario.monto}
                            </td>
                            <td className="py-4 px-6 pr-24">
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className={`text-xl cursor-pointer mr-2 text-red-500 ${usuario.rol === "admin" ? 'hidden' : ""}`}
                                    title="Eliminar usuario"
                                    onClick={() => {
                                        eliminarUsuario(usuario.cedula);
                                    }} />
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-xl cursor-pointer text-white"
                                    title="Editar usuario"
                                    onClick={() => {
                                        setData({
                                            cedula: usuario.cedula,
                                            nombre: usuario.nombre,
                                            monto: usuario.monto
                                        });
                                        setFormulario("actualizar");
                                    }}
                                />
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
}
