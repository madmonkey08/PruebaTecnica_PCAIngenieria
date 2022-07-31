import React, { useEffect, useState } from 'react'
import { axiosPetition } from '../helpers/Axios';


export const TablaUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {

        const peticion = await axiosPetition("/api/usuarios");

        setUsuarios(peticion.usuarios);

    }

    return (
        <div className="w-full h-full flex justify-center items-start pt-36 text-white">

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
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
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        {usuario.cedula}
                                    </th>
                                    <td className="py-4 px-6">
                                        {usuario.nombre}
                                    </td>
                                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                        {usuario.monto}
                                    </td>
                                    <td className="py-4 px-6">

                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
