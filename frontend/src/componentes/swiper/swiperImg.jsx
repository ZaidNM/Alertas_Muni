// FIX: Slider grande también tenía imágenes rotas (/img/slider/... no existe en public) + flechas grandes
import React from "react";
import { Navigation, Pagination, A11y, Autoplay, EffectFade} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './swiperImg.css'
import fallbackBanner from "../../assets/img/banner.png"; // FIX: fallback si item.imagen es 404

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
            {/* FIX: Fallback visual si no hay imágenes o la URL da 404 */}
            {data.length===0 ? (
              <div className="flex h-[220px] items-center justify-center bg-plomo-lighter text-plomo text-sm">Sin imágenes</div>
            ) : data.map((item, index) => (
                <SwiperSlide key={index}>
                    <img
                      src={item.imgSrc || item.imagen || fallbackBanner}
                      alt={item.title || item.titulo || "slide"}
                      className="swiper-image"
                      onError={(e)=>{ e.currentTarget.src = fallbackBanner; }} // FIX: si /img/slider/... no existe, usa banner.png
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperImg;
