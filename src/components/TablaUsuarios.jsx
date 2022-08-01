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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                        Cédula
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Nombre
                    </th>
                    <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                        Monto
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios?.map((usuario, index) => {
                        return <tr className="border-b border-gray-200 dark:border-gray-700" key={index}>
                            <th scope="row" class="py-4 px-6 font-medium pr-24 text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {usuario.cedula}
                            </th>
                            <td className="py-4 px-6 pr-24">
                                {usuario.nombre}
                            </td>
                            <td className="py-4 px-6 pr-24 bg-gray-50 dark:bg-gray-800">
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
