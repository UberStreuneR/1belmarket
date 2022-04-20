import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import swiper library
import SwiperCore, { Keyboard, Mousewheel, Pagination } from "swiper"; // Import other swiper libraries for settings

import Slide_0 from "./slides/Slide_0";
import Slide_1 from "./slides/Slide_1";
import Slide_2 from "./slides/Slide_2";
import Slide_3 from "./slides/Slide_3";
import Slide_4 from "./slides/Slide_4";

SwiperCore.use([Keyboard, Mousewheel, Pagination]); // Activate swiper libraries

function change_slide_click_event(number, swiperInstance) {
    // Function for change slide when pagination button clicked
    let next_number = number.target.id.match(/\d+/)[0];
    swiperInstance.slideTo(next_number, 2500);
}

function change_pagination_elem(last, next) {
    // This event changes the class name of the current and previous pagination elements when the swiper changes the slide
    let pagination_elem_next = document.getElementById("pagination_" + next);
    let pagination_elem_last = document.getElementById("pagination_" + last);
    pagination_elem_last.classList = "main-swiper-pagination-element";
    pagination_elem_next.classList =
        "main-swiper-pagination-element main-swiper-pagination-element-selected";
}

export default function Slider() {
    const [swiperInstance, setSwiperInstance] = useState(); // Use hook for swiper
    window.swiperInstance = swiperInstance;

    const data_of_slides_content = [
        <SwiperSlide
            id={"slide_0"}
            className="slide-on-main-swiper-slider main_slide swiper-slide"
        >
            <Slide_0 />
        </SwiperSlide>,
        <SwiperSlide
            id={"slide_1"}
            className="slide-on-main-swiper-slider main_slide swiper-slide"
        >
            <Slide_1 />
        </SwiperSlide>,
        <SwiperSlide
            id={"slide_2"}
            className="slide-on-main-swiper-slider main_slide swiper-slide"
        >
            <Slide_2 />
        </SwiperSlide>,
        <SwiperSlide
            id={"slide_3"}
            className="slide-on-main-swiper-slider main_slide swiper-slide"
        >
            <Slide_3 />
        </SwiperSlide>,
        <SwiperSlide
            id={"slide_4"}
            className="slide-on-main-swiper-slider main_slide swiper-slide"
        >
            <Slide_4 />
        </SwiperSlide>,
    ]; // Generation slides for slider

    // This is a module on swiper library. SwiperSlide - generate construction of basic slide

    const pagination_menu = []; // Generation pagination menu for slider

    const name_for_pagination_element = [
        "О нас",
        "Компания",
        "Магазин",
        "Товары",
        "Контакты",
    ];

    for (let i = 0; i < 5; i += 1) {
        let class_name = "main-swiper-pagination-element";
        if (i == 0) {
            class_name += " main-swiper-pagination-element-selected";
        }

        pagination_menu.push(
            <div className={class_name} id={"pagination_" + i}>
                <span
                    className="main-swiper-pagination-element-circle"
                    id={"circle_" + i}
                    onClick={(e) => {
                        change_slide_click_event(e, swiperInstance);
                    }}
                ></span>
                <span
                    className="main-swiper-pagination-element-name"
                    id={"name_" + i}
                    onClick={(e) => {
                        change_slide_click_event(e, swiperInstance);
                    }}
                >
                    {name_for_pagination_element[i]}
                </span>
            </div>
        );
    }

    return (
        // Return code on the react module
        <Swiper
            // This is a module on swiper library. It generate main container for swiper and swiper-wrapper for slide storage.
            // Activate functions on swiper libraries
            onSwiper={setSwiperInstance}
            initialSlide={0}
            spaceBetween={0}
            slidesPerView={1}
            slidesPerGroup={1}
            direction="vertical"
            mousewheel
            allowTouchMove={false}
            pagination={{
                el: ".main-pagination",
                clickable: true,
                type: "custom",
            }}
            keyboard={{ enabled: true }}
            className="main-swiper-slider"
            onSlideChange={(e) => {
                change_pagination_elem(e.previousIndex, e.activeIndex);
            }}
        >
            {
                data_of_slides_content /* Return array of slides into swiper-wrapper */
            }
            <div className="main-swiper-pagination">
                {pagination_menu /* Return array of paginations into swiper */}
            </div>
        </Swiper>
    );
}
