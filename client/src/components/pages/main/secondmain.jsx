import React from "react";
import "./secondmain.css";
import pc from "./Icons/Pc.png";
import ic1 from "./Icons/ic1.png";
import ic2 from "./Icons/ic2.png";
import ic3 from "./Icons/ic3.png";
import ic4 from "./Icons/ic4.png";

const Secondmain = () => {
  return (
    <div className="secondmain">
      <img src={pc} className="IMG" />
      <div className="main1">

        <div className="Text22">
          <h1 className="secondmain_title">DDoS-Guard Copy</h1>
          <p className="Tag2">
            Защита. Скорость. Контроль.
          </p>
          <p className="Tag3">
            <b>DDoS-Guard</b>— провайдер безопасности, который предоставляет услуги
            по обеспечению защиты от DDoS-атак, доставке контента и веб-хостинга.
          </p>
          <p className="Tag4">
            Основана в 2011 году Евгением Марченко и Дмитрием Сабитовым.{" "}
          </p>
          <p className="Tag4">
            Для обработки трафика компания использует собственные разработки,
            созданные экспертами в области больших данных и ИИ. Компания обладает
            собственной геораспределенной сетью фильтрации, канальная емкость
            которой более 1,5 Tbps. Центры очистки трафика находятся в России,
            Гонконге, США, Нидерландах, Казахстане.
          </p>
        </div>
      </div>
      <div className="dow">
        <h1 className="secondmain_title">Почему мы?</h1>
        <p className="Tag2">НАШИ ПРЕИМУЩЕСТВА</p>
      </div>

      <div className="zal">
        <div className="container">
          <div className="icon1">
            <img src={ic1} className="icon" />

            <h1 className="form_text1">Универсальность</h1>
            <p className="form_text2">
              Полная совместимость с разными сайтами на любых платформах
            </p>
          </div>
        </div>

        <div className="container1">
          <div className="icon1">
            <img src={ic2} className="icon" />

            <h1 className="form_text1">Масштабируемость</h1>
            <p className="form_text2">
              Возможность развития вашего бизнеса без капитальных вложений        </p>
          </div>
        </div>

        <div className="container2">
          <div className="icon1">
            <img src={ic3} className="icon" />

            <h1 className="form_text1">Оптимизация</h1>
            <p className="form_text2">
              Понижение издержек на аренду и обслуживание инфраструктуры        </p>
          </div>
        </div>
        <div className="container3">
          <div className="icon1">
            <img src={ic4} className="icon" />

            <h1 className="form_text1">Функциональность</h1>
            <p className="form_text2">
              Широкий выбор опций для ускорения доступа к сайту        </p>
          </div>
        </div>
      </div>

    </div>
  );
};


export default Secondmain;
