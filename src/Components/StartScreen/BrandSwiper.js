import React from 'react';
import { NavLink } from "react-router-dom";
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.min.css'

const BrandSwiper = (props) => {
    let slidesPerView = 2;
    const windowWidth = window.innerWidth
    console.log(window.innerWidth)
    switch (true) {
        case windowWidth < 576:
            slidesPerView = 2
            break;
        case windowWidth >= 576:
            slidesPerView = 4
            break;
        default:
            slidesPerView = 4
    }
    const { brandList } = props
    // const [swiper, updateSwiper] = useState(null);
    const params = {
        slidesPerView,
        spaceBetween: 10,
        freeMode: true,
        autoplay: {
            delay: 2000,
        },
        speed: 300,
    }
    // console.log(swiper)
    return (
        <div>
            <Swiper {...params}
            //  getSwiper={updateSwiper}
            >
                {Array.from(new Set(brandList)).map((el) => {
                    return (
                        <NavLink key={el} exact className="menu-brand-item" to={`/${el}`}>
                            {el}
                        </NavLink>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default BrandSwiper