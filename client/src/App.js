import React, { useState } from 'react';
import './App.css';
import "./components/styles/reset.css";
import "./components/styles/common-styles.css"

import Header from './components/header/header';
import MainPage from './components/pages/main/main';
import MyModal from './components/modal/modal';
import Authentication from './components/authentication/authentication';


window.onclick = function (e) {

  if (!e.target.matches('.dropbtn')) {

      let dropdowns = document.querySelectorAll(".dropdown-content");

      dropdowns.forEach(it => {

          if (it.classList.contains('show')) {
              it.classList.remove('show');
          }

      });

  }

}



export default class App extends React.Component {
  // const[modalActive, setmodalActive] = useState(true)

  state = {
    openModal: false,
    auth: true
  }

  setmodalActive = () => {

    this.setState({
      openModal: !this.state.openModal
    })

  }

  setAuthActive = () => {

    this.setState({
      auth: !this.state.auth
    })

  }

  render() {

    return (

      <div className="App">

        <Authentication active={this.state.auth} setActive={this.setAuthActive}/>

        <Header onOpenModal={ this.setmodalActive}/>

        <MainPage />

        <MyModal active={this.state.openModal} setActive={this.setmodalActive} />

      </div>

    );

  }

}