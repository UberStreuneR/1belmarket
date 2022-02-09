import React from "react";

function transformMenu() {
    // Transfor menu Button
    let x = document.getElementsByClassName("menu-button")[0];
    if (x) {
        x.classList.toggle("open");
        if (x.classList[1] == "open") {
            let elem_popup_menu =
                document.getElementsByClassName("menu-popup")[0];
            let elem_swiper_slider =
                document.getElementsByClassName("main-swiper-slider")[0];
            elem_popup_menu.style.visibility = "visible";
            elem_swiper_slider.style.visibility = "hidden";
        } else {
            let elem_popup_menu =
                document.getElementsByClassName("menu-popup")[0];
            let elem_swiper_slider =
                document.getElementsByClassName("main-swiper-slider")[0];
            elem_popup_menu.style.visibility = "hidden";
            elem_swiper_slider.style.visibility = "visible";
        }
    }
}

export default function Button_menu() {
    return (
        <div className="menu-button" onClick={transformMenu}>
            <span />
        </div>
    );
}
