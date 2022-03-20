import React from "react";
import "./authentication.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";



export default class Authentication extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        activeBtn: false,
        textSend: null,
        typeKey: null,
        resData: null
    }

    componentDidMount = () => {
        localStorage.removeItem('saveUser');
    }

    onActiveBtn = (e) => {
        e.preventDefault();

        let sendEmail = document.querySelector('#tab__sendEmail').value;

        if (!this.state.activeBtn) {
            localStorage.setItem('email', sendEmail);
        } else {
            localStorage.setItem('email', null);
        }

        this.setState({
            activeBtn: !this.state.activeBtn
        })

    }

    //войти
    checkUser = async () => {

        let email = document.querySelector('#tab__sendEmail');
        let emailVal = email.value;

        let pass = document.querySelector('#tab__sendPass');
        let passVal = pass.value;

        localStorage.setItem("email", emailVal);


        try {

            const res = await axios.post("http://localhost:5000/login", {
                email: emailVal,
                password: passVal
            });

            if (res.status === 201) {

                this.props.setActive(false);

            } else if (res.status === 200) {

                const data = await res.data.data;
                const type = await data.type;

                let enterIn = document.querySelector('#enterIn');
                enterIn.classList.add("hide");

                let twoFactorka = document.querySelector('#tab__twoFactorka');
                twoFactorka.classList.remove("hide");

                if (type === "email") {

                    let temp = document.querySelector('.authentication__content');
                    temp.style.backgroundImage = "url('../img-passIn.png)";

                    this.setState({
                        textSend: `Сообщение отправлено на ${localStorage.getItem("email")}`,
                        typeKey: "email"
                    })


                    


                } else if (type === "dynamic") {

                    this.setState({
                        textSend: `Сообщение отправлено на телефон`,
                        typeKey: "dynamic"
                    })





                }

            }

        } catch {

        }

    }

    showForgotTab = (e) => {
        e.preventDefault();

        let arr = document.querySelectorAll('.tab__panel');
        arr.forEach(it => it.classList.add("hide"));

        let tabForgotPass = document.querySelector('#tab__forgotPass');
        let enterIn = document.querySelector('#enterIn');

        enterIn.classList.add("hide");
        tabForgotPass.classList.remove("hide");


    }

    showEnterBlock = (e) => {
        e.preventDefault();

        let tabАorgotPass = document.querySelector('#tab__forgotPass');
        let enterIn = document.querySelector('#enterIn');

        tabАorgotPass.classList.add("hide");
        enterIn.classList.remove("hide");

    }

    sendRegistr = async (e) => {
        e.preventDefault();

        let emailC = document.querySelector('#tab__sendEmailRegistration').value;
        let passC = document.querySelector('#tab__sendPassRegistration').value;

        try {

            const responce = await axios.post("http://localhost:5000/reg", {
                email: emailC,
                password: passC.toString()
            });

            const data = await responce.data;

            //тут вывести инфу о запросе
            this.setState({
                resData: data
            })

            //дальше чёл подтверждает и потом входит в акк
            //подтвердить

        } catch {



        }


    }

    //отправляем динамический код
    sendDynamicCode = async () => {

        let codeValue = document.querySelector('#inpt__Code').value;

        //чтоыб он мог код вводить n-ое кол-во раз


        if (this.state.typeKey === "email") {

            try {

                const resT = await axios.post("http://localhost:5000/login/verify", {
                    email: localStorage.getItem("email"),
                    code: codeValue.toString()
                })

                if (resT.status === 200) {
                    this.props.setActive(false)
                }

            } catch {

                alert("Введите код ещё раз")
            }

        } else if (this.state.typeKey === "dynamic") {

            try {

                const res = await axios.post("http://localhost:5000/hot-key/key", {
                    email: localStorage.getItem("email"),
                    code: codeValue
                });

                if (res.status === 200) {
                    this.props.setActive(false);
                }
                // else {
                //     //по новой вводит
                // }



            } catch {
               alert("ощибка")
            }

        }
    }


    render() {

        const { active } = this.props;
        const { activeBtn, textSend, resData } = this.state;

        const activeBtnL = activeBtn === true ?
            "label label--on"
            :
            "label label--off";


        return (
            <div className={active ? "authentication active" : "authentication"}>
                <div className={active ? "authentication__content active" : "authentication__content"} onClick={e => e.stopPropagation()}>

                    <Tabs>
                        <TabList className="tabList">
                            <Tab className="tab">вход</Tab>
                            <Tab className="tab">регистрация</Tab>
                        </TabList>


                        <TabPanel className="tab__panel">

                            <form id="enterIn" className="form">

                                <div className="tab__send">
                                    <input id="tab__sendEmail" type="email" className="tab__input" placeholder="E-mail"></input>
                                </div>

                                <div className="tab__send">
                                    <input id="tab__sendPass" type="password" className="tab__input" placeholder="Пароль"></input>
                                </div>

                                <div className="tab__bottom">

                                    <div className="tab__bottom--top">
                                        <label onClick={this.onActiveBtn} className={activeBtnL}>
                                            <input type="checkbox" className="label__input" />

                                            <div className="label__circle"></div>
                                        </label>

                                        <p className="tab__text">Запомнить меня</p>
                                    </div>

                                    <button type="button" id="rePass" onClick={this.showForgotTab}>Забыли пароль?</button>

                                </div>

                                <button type="button" onClick={this.checkUser} id="btnEnterIn" className="btnEnter">Войти</button>

                                <p id="enterText" className="tab__text">{resData}</p>

                            </form>

                        </TabPanel>

                        {/*  id="tab__registration" */}
                        <TabPanel className="tab__panel">

                            <form id="tab__registration" className="form">

                                <div className="tab__send">
                                    <input id="tab__sendEmailRegistration" type="email" className="tab__input" placeholder="E-mail"></input>
                                </div>

                                <div className="tab__send">
                                    <input id="tab__sendPassRegistration" type="password" className="tab__input" placeholder="Пароль"></input>
                                </div>

                                <div className="tab__send">
                                    <input id="tab__sendPassRegistration2" type="password" className="tab__input" placeholder="Повторите пароль"></input>
                                </div>

                                <button id="btnEnterRegistration" className="btnEnter" onClick={this.sendRegistr}>Зарегистрироваться</button>

                            </form>

                        </TabPanel>


                        <div id="tab__twoFactorka" className="tab__panel hide">

                            <form className="form tab__twoFactorka">

                                <p className="tab__text">Пройдите двуфакторную аутентификацию</p>

                                <p className="tab__text">{textSend}</p>

                                <img className="img__mail" src="https://www.shareicon.net/data/128x128/2016/07/19/798338_security_512x512.png" alt="img" />

                                <p className="tab__text">Введите код подтверждения</p>

                                <div className="input__code">
                                    <input id="inpt__Code" className="tab__input" type="text" />
                                </div>

                                <button type="button" id="enterCode" className="btnEnter" onClick={this.sendDynamicCode}>Ввести</button>

                            </form>

                        </div>


                        <div id="tab__forgotPass" className="tab__panel hide">

                            <form className="form">

                                <p id="text__forgotPass">Восстановление пароля</p>

                                <div className="tab__send">
                                    <input id="tab__sendforgotPass" type="password" className="tab__input" placeholder="Пароль"></input>
                                </div>


                                <div className="tab__send">
                                    <input id="tab__sendforgotPass2" type="password" className="tab__input" placeholder="Подтвердите пароль"></input>
                                </div>

                                <button type="button" id="btnForgotPass" className="btnEnter" onClick={this.showEnterBlock}>Восстановить</button>

                            </form>

                        </div>


                    </Tabs>

                </div>

            </div>
        );

    }

}