import React from "react";
import "./modal.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";


export default class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        activeBtnEmail: false,
        activeBtDynamic: false
    }
    //в инпунт почты пихаем почту и лок хоста

    componentDidMount = async () => {


        try {

            //     //из лока передавй email
            //     const res = await axios.post("http://localhost:5000/many-factor-check", {
            //         email:

            //     });

            //    const dataC = await res.data.data;

            //    //какая она
            //    const code = dataC.code;

            //    //подключена двуфакторка или нет(true/false)
            //    const auth = dataC.dualAuth;

            //     //проверяем code. Если вкл , то вкл и прочее
            //     //ток одна может быть двуфакторка

        } catch {

        }

    }

    onActiveBtnEmail = async (e) => {
        e.preventDefault();

        this.setState({
            activeBtnEmail: !this.state.activeBtnEmail
        })

        try {

            const res = await axios.post("http://localhost:5000/many-factor-activate", {
                email: localStorage.getItem("email"),
                code: "email",
                status: this.state.activeBtnEmail
            });

        } catch {

        }


    }

    onActiveBtnDynamic = async (e) => {
        e.preventDefault();

        console.log(this.state.activeBtDynamic)

        this.setState({
            activeBtDynamic: !this.state.activeBtDynamic
        })

        try {

            const res = await axios.post("http://localhost:5000/many-factor-activate", {
                email: "falconhelicopter@mail.ru",
                code: "dynamic",
                status: this.state.activeBtDynamic
            });

        } catch {

        }


    }


    render() {

        const { active, setActive } = this.props;
        const { activeBtnEmail, activeBtDynamic } = this.state;

        const activeBtnEm = activeBtnEmail === true ?
            "label label--on"
            :
            "label label--off";

        const activeBtnDyn = activeBtDynamic === true ?
            "label label--on"
            :
            "label label--off";



        return (
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>

                    <Tabs>
                        <TabList className="tabListM">
                            <Tab className="tab">E-MAIL</Tab>
                            <Tab className="tab">Telephone</Tab>
                        </TabList>

                        <TabPanel className="tab__panelM">

                            <form className="formM">
                                <h1 className="tab__title">Двухфакторная аутентификация с помощью E-mail</h1>

                                <p className="tab__textM">После подключения двухфакторной аутентификации мы будем запрашивать
                                    не только пароль, но и код для входа.</p>

                                <div className="tab__sendM">
                                    <label htmlFor="tab__sendEmail" className="tab__textM">E-mail:</label>
                                    <input id="tab__sendEmailM" value={localStorage.getItem("email")} type="email" className="tab__inputM" placeholder="main@mail.ru"></input>
                                </div>

                                <div className="tab__bottom">
                                    <p className="tab__textM">Активировать двухфакторную аутентификацию </p>

                                    <label onClick={this.onActiveBtnEmail} className={activeBtnEm}>
                                        <input type="checkbox" className="label__input" />

                                        <div className="label__circle"></div>
                                    </label>
                                </div>
                            </form>

                        </TabPanel>

                        <TabPanel className="tab__panelM">

                            <form className="formM">
                                <h1 className="tab__title">Двухфакторная аутентификация с помощью телефона</h1>

                                <p className="tab__textM">После подключения двухфакторной аутентификации мы будем запрашивать
                                    не только пароль, но и код для входа.</p>

                                <div className="tab__sendM">
                                    <label className="tab__textM">Тел: </label>
                                    <input id="int__tel" type="text" className="tab__inputM" placeholder="8-800-555-35-35"></input>
                                </div>

                                <div className="tab__bottom">
                                    <p className="tab__textM">Активировать двухфакторную аутентификацию </p>

                                    <label onClick={this.onActiveBtnDynamic} className={activeBtnDyn}>
                                        <input type="checkbox" className="label__input" />

                                        <div className="label__circle"></div>
                                    </label>
                                </div>
                            </form>

                        </TabPanel>

                    </Tabs>

                </div>

            </div>
        );

    }

}