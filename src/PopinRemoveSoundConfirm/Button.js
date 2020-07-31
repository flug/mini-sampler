import React from 'react';
import styled from 'styled-components';

const ViewButton = styled.button`
  
    background-color: ${props => props.color};
    border-color:${props => props.color};
    color: white; 
    color: white;
    font-size: 20px;
    padding: 10px;
    border-radius: ${props => props.inverse ? "13px 0 0 13px" : "0 13px 13px 0"};
}
`
ViewButton.defaultProps = {
    color: 'white',
    inverse: false,
}

const Button = ({ text, color, inverse, onClick }) => {

    return (
        <ViewButton color={color} inverse={inverse} onClick={onClick} >
            {text}
        </ViewButton>
    )
}

export default Button; 