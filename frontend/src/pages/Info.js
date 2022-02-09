import React from "react";
import Slider from "../components/slider/Slider";

import Header from "../components/slider/header/Header";
/*import Body from "../components/slider/body/Body";
import Footer from "../components/slider/footer/Footer";*/
import Popup_menu from "../components/slider/popup/Popup_menu";

export default function Info() {
    return (
        <React.Fragment>
            <Header />
            <Slider />
            <Popup_menu />
        </React.Fragment>
    );
}
