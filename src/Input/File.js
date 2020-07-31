import React from 'react';
import styled from 'styled-components';


const Label = styled.label`
    border: 1px solid #4c4f54;
    background-color: #4c4f54;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    color: white;
    margin: 8px 0;

`
const Input = styled.input`
    display: none;
`



const File = ({ text, iconClass, onChange }) => {

    return (
        <Label>
            <Input type="file" onChange={onChange} />
            <i className={iconClass} /> {text}
        </Label>


    )
        ;
}


export default File; 