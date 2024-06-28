import React from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import banPr from '../../../assets/img/preguntas.png'
import dataPrFre from '../../../componentes/dataS/dataPrFre'


const Pregunta = ({ pregunta, respuesta }) => (
    <div className='row md:w-2/3 lg:w-1/2 mx-auto'>
        <h3 className='text-3xl font-bold py-5'>{pregunta}</h3>
        <p className='text-lg text-justify pb-8'>{respuesta}</p>
    </div>
);

export default function PrFrecuentes() {
    return (
        <main>
            <Header />

            <div className='container flex flex-col items-center'>
                <img src={banPr} alt='banner' className='w-full max-w-screen-sm' />

                <h1 className='text-5xl font-medium py-20'>Preguntas Frecuentes</h1>

                {dataPrFre.map((faq, index) => (
                    <Pregunta key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} />
                ))}
            </div>


            <Footer />
        </main>
    )
}
