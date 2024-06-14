import React from "react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from "../cards/cards.jsx";
import './swiper.css'

const SwiperComponent = ({ data }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
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
        >
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <Card
                        imgSrc={item.imgSrc}
                        title={item.title}
                        description={item.description}
                        link={item.link}
                        linkText={item.linkText}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;
