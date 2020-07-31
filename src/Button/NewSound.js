import React from 'react'
import styled from 'styled-components'
import usePopin from '../PopinEditingSound/usePopin';


const ContentButton = styled.div`
    position: absolute; 
    bottom : 15px;
    right : 15px; 
    box-shadow: 17px 18px 11px -17px rgba(0,0,0,0.75);
`
const ButtonIcon = styled.i`
    color: white; 
    font-size : 25px; 
`
const Button = styled.button`
background: #143156;
border: none;
height: 60px;
width: 60px;
border-radius: 20px;
`

const NewSound = ({ soundKey }) => {
    const dispatch = usePopin()[1];
    const handleClick = () => {
        soundKey(null);
        dispatch({ type: 'toggle' });
    }
    return (
        <ContentButton>
            <Button onClick={handleClick}>
                <ButtonIcon className="icon-music" />
            </Button>
        </ContentButton >
    );



}
export default NewSound; 