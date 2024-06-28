import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../componentes/header/header"
import Footer from "../../../componentes/footer/footer";
import SwiperComponent from "../../../componentes/swiper/swiper";
import Data_destacados from "../../../componentes/dataS/dataDestacados";
import Data_news from "../../../componentes/dataS/dataNoticias";
import './home.css'
import { Button } from "../../../componentes/ui";


export default function Home() {
    return (
        <main>
            <Header />

            <section className="banner pb-5">
                <Link to='/formulario'><Button className="bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596]">Formulario</Button></Link>
            </section>

            <section className="intro">
                <h1>Bienvenidos</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos adipisci vero necessitatibus, porro voluptates quaerat incidunt est expedita at facere reiciendis fugiat nam laboriosam nihil labore ea unde autem quidem?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit nulla quam asperiores. Quam corporis assumenda reprehenderit, quaerat iusto necessitatibus nihil voluptatibus, velit distinctio, eveniet aliquam dignissimos fugiat ea tempore odit?</p>
            </section>

            <section className="destacados">

                <h1>Destacados</h1>
                <article className="cont-tarjetas">
                    <SwiperComponent data={Data_destacados} />
                </article>
            </section>

            <section className="nosotros">
                <h1>Nosotros</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum officiis dolore quod facere, possimus aspernatur dolores id voluptate molestiae minus quibusdam assumenda quia earum aperiam delectus labore voluptatibus corrupti mollitia!</p>
            </section>

            <section className="noticias">
                <h1>Noticias</h1>
                <article className="cont-tarjetas">
                    <SwiperComponent data={Data_news} />
                </article>

            </section>

            <Footer />

        </main>
    );
}