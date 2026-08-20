import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardAdmin from './CardAdmin.jsx';
import { useCap } from '../../context/CapContext.jsx';
import Button from '../ui/Button.tsx';
import {useAdmins} from '../../context/AdminContext.jsx';

export default function AllCardsAdmin() {
    const { caps, capLoadAdmin } = useCap();
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const cardsPerPage = 6; // 3 cards por fila, 2 filas = 6 cards por página

    // Calcula el índice inicial y final de las tarjetas a mostrar en la página actual
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = caps.slice(indexOfFirstCard, indexOfLastCard);

    useEffect(() => {
        capLoadAdmin();
    }, [capLoadAdmin]);

    // Total de páginas
    const totalPages = Math.ceil(caps.length / cardsPerPage);

    // Función para cambiar de página
    const paginate = pageNumber => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const { login, deleteAdmin, updateAdmin } = useAdmins();
    const navigate = useNavigate();

    //Eliminar admin
    const handleDelete = (idAdmin) => {
        deleteAdmin(idAdmin);
    };

    return (
        <main className="container mx-auto py-8">
            <section className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    {currentCards.map((cap, index) => (
                        <div key={index} className=" justify-center text-center text-2xl text-[#2D9596] uppercase font-medium bg-[#ECF4D6] rounded-lg shadow-md p-5 max-w-full w-[45vh] h-auto mb-20">
                            <CardAdmin
                                nombre={cap.nomAdmin}
                                apellido={cap.apeAdmin}
                                dni={cap.dniAdmin}
                                correo={cap.correoAdmin}
                                nacimiento={cap.bornAdmin}
                                celular={cap.celAdmin}
                                tipo={cap.typeAdmin}
                            />
                            <Button className="mx-2 bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596]" onClick={() => navigate(`/admin/edit-admin/${cap.idAdmin}`)}>Editar</Button>
                            <Button className="bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596]" onClick={() => handleDelete(cap.idAdmin)}>Eliminar</Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Botón de paginación */}
            <nav className="mt-8 flex justify-center">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight bg-[#2D9596] text-[#ECF4D6] border border-[#2D9596] rounded-l-lg hover:bg-[#ECF4D6] hover:text-[#2D9596] focus:outline-none focus:bg-[#ECF4D6] focus:text-[#2D9596]`}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages).keys()].map((number) => (
                        <li key={number}>
                            <button
                                onClick={() => paginate(number + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === number + 1
                                    ? 'bg-[#ECF4D6] text-[#2D9596] border border-[#2D9596]'
                                    : 'bg-[#2D9596] text-[#ECF4D6] border border-[#2D9596]'
                                    } hover:bg-[#ECF4D6] hover:text-[#2D9596] focus:outline-none focus:bg-[#ECF4D6] focus:text-[#2D9596]`}
                            >
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight bg-[#2D9596] text-[#ECF4D6] border border-[#2D9596] rounded-r-lg hover:bg-[#ECF4D6] hover:text-[#2D9596] focus:outline-none focus:bg-[#ECF4D6] focus:text-[#2D9596]`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </main>
    );
}
