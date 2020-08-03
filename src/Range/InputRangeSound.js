import React from 'react'
import styled from 'styled-components';

const ViewInput = styled.input`
    appearance: slider-vertical;  
    height: 60%; 
    
`


const InputRangeSound = ({ onChange, min, max }) => {
    return (
        <ViewInput type="range" orient="vertical" onChange={onChange} min={min} max={max} />
    )
}

export default InputRangeSound;