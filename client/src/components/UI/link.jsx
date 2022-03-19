import React from "react";

const MyLink = ({props}) => {

    const [text, ...propsOt] = props;

    return (
        <a {...propsOt}>{text}</a>
    )

}

export default MyLink;