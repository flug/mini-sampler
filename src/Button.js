import React from 'react';
import styled from 'styled-components';
import Menu from './Button/Menu';
//background-color:hsl(212,13%,15%);
const SoundButton = styled.button`
    width: 140px;
    height: 140px;
    position:relative;
    border:1px solid #404040;
    outline:none;
    background-color:hsl(212,13%,15%);
    padding: 0; 
    box-shadow: 0px 0px 3px 5px rgba(13,15,18,0.46);
    transition: .13s ease-in-out;
    cursor:pointer;
    border-radius: 5px;
    display: block; 
    &:hover, 
    &:active {
        color: #ffa502;
        box-shadow: inset 0px -4px 8px ${props => props.color}, 0px -4px 5px ${props => props.color};
        filter: drop-shadow(0 0 0.75rem ${props => props.color});
        background-color: ${props => props.color};
          }
`
SoundButton.defaultProps = {
    color: '#d35400'
}
const ContentButton = styled.div`
    position: relative;
    display: grid;
    width: 130px;
    left: 4px; 
    height: 130px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border-radius: 5px;
    transition: .13s all;
    z-index: 1;
    background: black; 
    border: 1px solid #222
 

    
`
const ViewButton = styled.div`
    margin: auto; 

`

const ShortcutButton = styled.span`
        position: absolute;
        color: #ffffff30;
        top: 0;
        z-index: 1;
        left: 0;
        font-size: 29px;
        display: block;
        width: 100%;
        text-align: center;
        height: 140px;
        line-height: 140px;
`
const sendSound = (soundPath) => {
    window.dispatchEvent(new CustomEvent('sound', {
        detail: {
            sound: soundPath
        }
    }))
}

let Button = ({ button, soundKey, onRemoveAction }) => {
    return (
        <ViewButton >
            <SoundButton color={button.color} type="button" onClick={() => { sendSound(button.path) }} >
                <ContentButton />
                <ShortcutButton>{button.shortcut}</ShortcutButton>
            </SoundButton>
            <Menu soundKey={soundKey} onRemoveAction={onRemoveAction} />
        </ViewButton>
    );
}
export default Button; 