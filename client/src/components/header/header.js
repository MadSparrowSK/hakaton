import React, { useState } from "react";
import "./header.css";

//imgs
import logo from "../img/logo.svg";
import imgRotate from "../img/img-rotate.svg";
import line from "../img/img-line.svg";

//components
import MyBtn from "../UI/button";





export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        openMenu: false
    }

    opneHideMenu = (e) => {
        e.preventDefault();

        document.querySelector(".hedaer__imgRotate").classList.toggle("rotateEl");

        this.setState({
            openMenu: !this.state.openMenu
        })
    }

    changeOpenModal = () => {

        this.setState({
            openModal: !this.props.openModal
        })

        return this.props.openModal;
    }

    exitToModal = () => {

        localStorage.removeItem("email");

        let tab__twoFactorka = document.querySelector('#tab__twoFactorka');
        tab__twoFactorka.classList.add("hide");

        let enterIn = document.querySelector('#enterIn');
        enterIn.classList.remove("hide");


        let arrIn = document.querySelectorAll('.inp__delete');
        arrIn.forEach(it => it.value = '')


        this.props.setActive(true);
    }

    render() {

        let classMenu = this.state.openMenu === true ?
            "dropdown-content show"
            :
            "dropdown-content";



        return (
            <header className="header">

                <div className="header__logo">
                    <img className="header__img" src={logo} alt="logo" />

                    <p className="header__text">DDOS-GUARD</p>
                </div>

                <div className="hedaer__client">

                    <button type="button" onClick={this.opneHideMenu} className="dropbtn">
                        USER
                        <img className="hedaer__imgRotate" src={imgRotate} alt="img" />
                    </button>

                    <div id="myDropdown" className={classMenu}>

                        <div className="content__item">
                            <button onClick={this.props.onOpenModal} key="btn-2" className="dropwodwn__btn two">Двухфакторная аутентинфикация</button>

                            <img key="2" className="dropdown__img" src={line} alt="line" />
                        </div>

                        <div className="content__item">
                            <button id="dropwodwn__btn" key="btn-3" className="dropwodwn__btn" onClick={this.exitToModal}>Выход</button>
                        </div>

                    </div>

                </div>

            </header>
        )

    }

}