import React from "react";
import './podval.css'

const Podaval = () => {
  return (
    <div className='foot'>
    <h1 className="H1">Контакты:</h1>

    <div className="foot_blok">
          <div className="Ttt">
              <h2 className="tephone">Телефоны</h2>
              <ul className="tel">
                  <li>8 (800) 333-17-63</li>
                  <li>8 (495) 215-03-87</li>
              </ul>
          </div>
          <div className="eee">
              <h2 className="tephone">E-mail</h2>
              <ul className="tel">
                  <li>info@ddos-guard.net</li>
                  <li>pr@ddos-guard.net</li>
              </ul>
          </div>
          <div className="Aaa">
              <h2 className="tephone">Адрес:</h2>
              <ul className="tel">
                  <li>344019, г. Ростов-на-Дону, ул. Максима Горького, д. 276, этаж 5, офис 11</li>
              </ul>
          </div>
          <div className="Links">
          
          <ul>
                <li><a href="#" className="main-link">Instagram</a></li>
                <li><a href="#" className="main-link">Linkedin</a></li>
                <li><a href="#" className="main-link">Telegram</a></li>
                </ul>
            
          </div>
          </div>
        </div>
  );
};

export default Podaval;
