import React from "react";

import Button_menu from "../button/Button_menu";

export default function Header(props) {
    return (
        <div className="main-header">
            <div className="site-title">Belmarket</div>
            <Button_menu />
        </div>
    );
}
