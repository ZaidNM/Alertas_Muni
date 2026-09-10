// FIX: Fallback de imágenes - noticias/reportes/destacados vienen sin imagen (DB solo tiene titulo/descripcion)
// Se usa placeholder local para evitar <img> roto (404) y Swiper vacío
import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from "../cards/cards.jsx";
import './swiper.css'
import fallbackImg from "../../assets/img/huanuco.jpg"; // FIX: placeholder si item.imagen es null (noticias/reportes sin foto)

const resolveImg = (item) => item.imgSrc || item.imagen || item.evidencia || fallbackImg;

const SwiperComponent = ({ data }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints={{
                450: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                800: {
                    slidesPerView: 3,
                    spaceBetween: 10
                }
            }
            }
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                speed: 10000
            }}
        >
            {/* FIX: Si data viene vacía, no renderiza swiper vacío */}
            {data.length===0 ? (
              <div className="py-8 text-center text-sm text-plomo">Sin contenido para mostrar.</div>
            ) : data.map((item, index) => (
                <SwiperSlide key={index}>
                    <Card
                        imgSrc={resolveImg(item)}
                        title={item.title || item.titulo}
                        description={item.description || item.descripcion}
                        link={item.link || item.ubicacion || '#'}
                        linkText={item.linkText || item.linkTexto || (item.estado ? `Estado: ${item.estado}` : 'Más información')}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;
