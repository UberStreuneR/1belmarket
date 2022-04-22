import React from "react";

import Button_menu from "../button/Button_menu";
import Slider from "../Slider";

function change_to_first_slide_click_event() {
    // Function for change slide when pagination button clicked
    window.swiperInstance.slideTo(0, 2500);
}

export default function Header(props) {
    return (
        <div className="main-header">
            <div
                className="site-title"
                id="site-title_1"
                onClick={change_to_first_slide_click_event}
            >
                Market
            </div>
            <Button_menu />
        </div>
    );
}
