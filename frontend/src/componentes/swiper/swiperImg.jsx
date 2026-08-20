import React from "react";
import { Navigation, Pagination, A11y, Autoplay, EffectFade} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './swiperImg.css'

const SwiperImg = ({ data }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            effect="fade"
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            autoplay={{
                delay: 5000,
                speed: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }}
        >
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <img src={item.imgSrc || item.imagen} alt={item.title || item.titulo} className="swiper-image" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperImg;
