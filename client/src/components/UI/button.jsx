import React from "react";


const MyBtn = ({props}) => {

    const {text, onClick, ...propsOt} = props;

    return(
        <button onClick={onClick} {...propsOt}>{text}</button>
    )

}

export default MyBtn;