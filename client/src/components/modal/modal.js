import React from "react";
import "./modal.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';




export default class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        activeBtn: true
    }

    onActiveBtn = (e) => {
        e.preventDefault();

        this.setState({
            activeBtn: !this.state.activeBtn
        })
    }


    render() {

        const { active, setActive } = this.props;
        const { activeBtn } = this.state;

        const activeBtnL = activeBtn === true ? 
        "label label--on"
        :
        "label label--off";

      

        return (
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
    
                    <Tabs>
                        <TabList className="tabListM">
                            <Tab className="tab">E-MAIL</Tab>
                            <Tab className="tab">YANDEX</Tab>
                            <Tab className="tab">GOOGLE</Tab>
                        </TabList>
    
                        <TabPanel className="tab__panelM">
    
                            <form className="formM">
                                <h1 className="tab__title">Двухфакторная аутентификация с помощью E-mail</h1>
    
                                <p className="tab__textM">После подключения двухфакторной аутентификации мы будем запрашивать
                                    не только пароль, но и код для входа.</p>
    
                                <div className="tab__sendM">
                                    <label htmlFor="tab__sendEmail" className="tab__textM">E-mail:</label>
                                    <input id="tab__sendEmailM" type="email" className="tab__inputM" placeholder="main@mail.ru"></input>
                                </div>
    
                                <div className="tab__bottom">
                                    <p className="tab__textM">Активировать двухфакторную аутентификацию </p>
    
                                    <label onClick={this.onActiveBtn} className={activeBtnL}>
                                        <input type="checkbox" className="label__input" />
    
                                        <div className="label__circle"></div>
                                    </label>
                                </div>
                            </form>
    
                        </TabPanel>
    
                        <TabPanel className="tab__panelM">
    
                            <form className="formM">
                                <h1 className="tab__title">Двухфакторная аутентификация с помощью qweeqwe</h1>
    
                                <p className="tab__textM">После подключения двухфакторной аутентификации мы будем запрашивать
                                    не только пароль, но и код для входа.</p>
    
                                <div className="tab__sendM">
                                    <label className="tab__textM">text</label>
                                    <input type="email" className="tab__inputM" placeholder="main@mail.ru"></input>
                                </div>
    
                                <div className="tab__bottom">
                                    <p className="tab__textM">Активировать двухфакторную аутентификацию </p>
    
                                    <label onClick={this.onActiveBtn} className={activeBtnL}>
                                        <input type="checkbox" className="label__input" />
    
                                        <div className="label__circle"></div>
                                    </label>
                                </div>
                            </form>
    
                        </TabPanel>
    
                        <TabPanel className="tab__panelM">
    
                            <form className="formM">
                                <h1 className="tab__title">Двухфакторная аутентификация с помощью13123 </h1>
    
                                <p className="tab__textM">После подключения двухфакторной аутентификации мы будем запрашивать
                                    не только пароль, но и код для входа.</p>
    
                                <div className="tab__sendM">
                                    <label className="tab__textM">text</label>
                                    <input type="email" className="tab__inputM" placeholder="main@mail.ru"></input>
                                </div>
    
                                <div className="tab__bottom">
                                    <p className="tab__textM">Активировать двухфакторную аутентификацию </p>
    
                                    <label onClick={this.onActiveBtn} className={activeBtnL}>
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