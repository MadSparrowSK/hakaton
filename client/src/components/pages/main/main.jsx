import React from "react";

import "./main.css";



const MainPage = () => {

    return(
        <div className="main">

            <p className="main__topSubTitle">НАДЁЖНЫЙ ПРОВАЙДЕР БЕЗОПАСНОСТИ</p>

            <h1 className="main__title">Защита и ускорение вашего сайта</h1>

            <p className="main__text">Оптимизируем работу вашего сайта и обеспечим его максимальную доступность. Подключите услугу, и мы возьмем безопасность ресурса на себя. </p>

            <div className="main__btns">
                <button className="btnBg">Подключить</button>
                <button className="btn main--btn">Связаться</button>
            </div>

            <div className="main__links">
                <a href="#" className="main--link">Instagram</a>
                <a href="#" className="main--link">Linkedin</a>
                <a href="#" className="main--link">Telegram</a>
            </div>

        </div>
    )

}


export default MainPage;