import React from "react";
import Header from "../../componentes/header/header"
import Footer from "../../componentes/footer/footer";
import Card from "../../componentes/cards/cards"
import ban from "../../assets/img/huanuco.jpg"
import './home.css'

export default function Home() {
    return (
        <main>
            <Header />
            <section className="banner">
                <button>Formulario</button>
            </section>

            <section className="intro">
                <h1>Bienvenidos</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos adipisci vero necessitatibus, porro voluptates quaerat incidunt est expedita at facere reiciendis fugiat nam laboriosam nihil labore ea unde autem quidem?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit nulla quam asperiores. Quam corporis assumenda reprehenderit, quaerat iusto necessitatibus nihil voluptatibus, velit distinctio, eveniet aliquam dignissimos fugiat ea tempore odit?</p>
            </section>

            <section className="destacados">
                <h1>Destacados</h1>
                <article className="cont-tarjetas">
                    <Card
                        imgSrc={ban}
                        title="Descubre nuestros servicios"
                        description="Ofrecemos una amplia gama de soluciones para satisfacer todas tus necesidades. Explora nuestros servicios y encuentra la mejor opción para ti."
                        link="#"
                        linkText="Más información"
                    />
                    <Card
                        imgSrc={ban}
                        title="Descubre nuestros servicios"
                        description="Ofrecemos una amplia gama de soluciones para satisfacer todas tus necesidades. Explora nuestros servicios y encuentra la mejor opción para ti."
                        link="#"
                        linkText="Más información"
                    />
                </article>
            </section>

            <section className="nosotros">
                <h1>Nosotros</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum officiis dolore quod facere, possimus aspernatur dolores id voluptate molestiae minus quibusdam assumenda quia earum aperiam delectus labore voluptatibus corrupti mollitia!</p>
            </section>

            <section className="noticias">
                <h1>Noticias</h1>
                <article className="cont-tarjetas">
                    <Card
                        imgSrc={ban}
                        title="Descubre nuestros servicios"
                        description="Ofrecemos una amplia gama de soluciones para satisfacer todas tus necesidades. Explora nuestros servicios y encuentra la mejor opción para ti."
                        link="#"
                        linkText="Más información"
                    />
                    <Card
                        imgSrc={ban}
                        title="Descubre nuestros servicios"
                        description="Ofrecemos una amplia gama de soluciones para satisfacer todas tus necesidades. Explora nuestros servicios y encuentra la mejor opción para ti."
                        link="#"
                        linkText="Más información"
                    />
                </article>

            </section>

            <Footer />
        </main>
    );
}