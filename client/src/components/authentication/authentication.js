import React from "react";
import "./authentication.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



export default class Authentication extends React.Component {

    constructor(props) {
        super(props);
    }

    _email = "123";
    _pas = "123";
    state = {
        activeBtn: false,
        displayMidal: true
    }

    componentDidMount = () => {

    }

    onActiveBtn = (e) => {
        e.preventDefault();

        if (!this.state.activeBtn) {
            localStorage.setItem('saveUser', true);
        } else {
            localStorage.removeItem('saveUser');
        }

        this.setState({
            activeBtn: !this.state.activeBtn
        })

    }

    checkUser = () => {

        let email = document.querySelector('#tab__sendEmail');
        let emailVal = email.value;

        let pass = document.querySelector('#tab__sendPass');
        let passVal = pass.value;

        if (pass !== this._pas) {

            pass.classList.add("errorInput");

            setTimeout(() => {
                pass.classList.remove("errorInput");
            }, 1000, "Привет", "Джон");

        }

        if (emailVal === this._email && passVal === this._pas) {

            this.props.setActive(false)

        } else {

        }

    }

    showForgotTab = (e) => {
        e.preventDefault();

        let tabForgotPass = document.querySelector('#tab__forgotPass');
        let enterIn = document.querySelector('#enterIn');

        enterIn.classList.add("hide");
        tabForgotPass.classList.remove("hide");

        console.log()


    }

    showEnterBlock = (e) => {
        e.preventDefault();

        let tabАorgotPass = document.querySelector('#tab__forgotPass');
        let enterIn = document.querySelector('#enterIn');

        tabАorgotPass.classList.add("hide");
        enterIn.classList.remove("hide");

    }


    render() {

        const { active } = this.props;
        const { activeBtn } = this.state;

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

                        {/*  id="enterIn" */}
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
                                            <input type="checkbox" className="label__input"/>

                                            <div className="label__circle"></div>
                                        </label>

                                        <p className="tab__text">Запомнить меня</p>
                                    </div>

                                    <button type="button" id="rePass" onClick={this.showForgotTab}>Забыли пароль?</button>

                                </div>

                                <button type="button" onClick={this.checkUser} id="btnEnterIn" className="btnEnter">Войти</button>

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

                                <button id="btnEnterRegistration" className="btnEnter">Зарегистрироваться</button>

                            </form>

                        </TabPanel>

                        <div id="tab__twoFactorka" className="tab__panel hide">

                            <form className="form">

                                <p>Пройдите двуфакторную аутентификацию</p>

                                <img className="img__mail" src="../" alt="img" />

                                <p>Введите код подтверждения</p>

                                <div className="input__code">
                                    <input className="number_input" type="number" />
                                </div>

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