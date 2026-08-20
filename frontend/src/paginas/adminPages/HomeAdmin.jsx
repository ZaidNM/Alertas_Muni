import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmi from "../../componentes/header/HeaderAdmi"
import Footer from "../../componentes/footer/footer";
import SwiperComponent from "../../componentes/swiper/swiper";
import { Button } from "../../componentes/ui";
import img from '../../assets/img/huanuco.jpg';
import { captDestacadosRequest, captNoticiasRequest } from "../../api/capt.api";


export default function HomeAdmin() {
    const [destacados, setDestacados] = useState([])
    const [news, setNews] = useState([])

    useEffect(() => {
        Promise.all([captDestacadosRequest(), captNoticiasRequest()])
            .then(([destacadosResponse, newsResponse]) => {
                setDestacados(destacadosResponse.data)
                setNews(newsResponse.data)
            })
            .catch(console.error)
    }, [])

    return (
        <main>
            <HeaderAdmi />

            <section className="banner pb-5">
                {/* <Link to='/formulario'><Button className="bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596]">Formulario</Button></Link> */}
            </section>

            <section className="destacados">
                <h1 className="text-3xl font-bold mb-8">Gestión de Destacados</h1>
                <article className="cont-tarjetas">
                    <SwiperComponent data={destacados} />
                </article>
                <Button className="bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596] flex ml-auto mr-8">Editar</Button>
            </section>

            <section className="gestion bg-[#ECF4D6] py-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Usuarios y Personal</h1>
                <div className="flex justify-center space-x-8 mt-8">
                    <Link to="/admin/all-user" className="flex flex-col items-center">
                        <img src={img} alt="Usuarios" className="h-32 w-32 rounded-full shadow-lg bg-[#ECF4D6]" />
                        <p className="mt-4 text-lg font-semibold text-center">Usuarios</p>
                    </Link>
                    <Link to="/admin/all-admin" className="flex flex-col items-center">
                        <img src={img} alt="Adminis" className="h-32 w-32 rounded-full shadow-lg bg-[#ECF4D6]" />
                        <p className="mt-4 text-lg font-semibold text-center">Administradores</p>
                    </Link>
                </div>
            </section>

            <section className="noticias">
                <h1 className="text-3xl font-bold mb-8">Gestión de Noticias</h1>
                <article className="cont-tarjetas">
                    <SwiperComponent data={news} />
                    <Button className="bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596] flex ml-auto mr-8">Editar</Button>
                </article>
            </section>

            <Footer />

        </main>
    );
}