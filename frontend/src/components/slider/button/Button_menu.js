import React from "react";

function transformMenu() {
    // Transfor menu Button
    let x = document.getElementsByClassName("menu-button")[0];
    if (x) {
        x.classList.toggle("open");
        let elem_popup_menu = document.getElementsByClassName("menu-popup")[0];
        elem_popup_menu.classList.toggle("open");
    }
}

export default function Button_menu() {
    return (
        <div className="menu-button" onClick={transformMenu}>
            <span />
        </div>
    );
}
