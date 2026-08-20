import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from "../cards/cards.jsx";
import './swiper.css'

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
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <Card
                        imgSrc={item.imgSrc || item.imagen}
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
