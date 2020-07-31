import React from 'react';
import styled from 'styled-components';
import Button from './PopinRemoveSoundConfirm/Button'

const ContentPopin = styled.div`
    position : relative; 
    top: 30%; 
    background: #181924; 
    width: 65%; 
    left: 20%;
    border: 1px solid #242424; 
	transition: all 0.3s ease-in-out;
`

const BackgroundPopin = styled.div`
    background-color: hsla(4, 0%, 0%, .15);
    position : absolute; 
    z-index: 1000;
    width: 100%; 
    height: 100vh;  
    top: 0; 
    left: 0; 
`
const CloseButton = styled.div`
    float: right; 
    border: none; 
    background: transparent;
    padding: 15px; 
    cursor: pointer; 
    color: #4c4f54; 
`
const Header = styled.div`
    width: 100%; 
    display: grid; 
    grid-template-columns: 92% 10%;
    border-bottom: 1px solid #20202a; 
`
const Content = styled.div`
    clear: both; 
    width: 100%; 
    margin: auto; 
    padding: 10px 15px; 
    text-align: center;
`
const Title = styled.span`
    text-align: center;
    display: block;
    color: white;
    font-size: 23px; 
    line-height: 45px; 
    margin-left: 2em;
`
const Input = styled.input`
    border: 1px solid hsla(0,0%,100%,.15);
    background: hsla(0,0%,100%,.1);
    height: 30px;
    border-radius: 6px;
    display: block; 
    width: 100%; 
    margin-bottom: 10px; 
    color: #cecece; 
    font-weight: bold; 
    padding: 3px 10px; 
`
const SubmitButton = styled.button`
    display: block;
    color: #cecece;
    background-color: #4c4f54;
    border-color: #4c4f54;
    width: 15em; 
    height: 3em; 
    border: none; 
    margin: auto; 
    font-weight: bold; 
    margin-top: 15px; 
`
const Label = styled.span`
    text-align: center;
    color: white;
    font-size: 13px; 
    margin-bottom: 10px; 
    display: block; 

`

const PopinRemoveSoundConfirm = ({ onRemoveAction, soundKey }) => {

    
    const handleConfirm = (e) => {
        e.preventDefault();
        window.ipcRenderer.send('removeSound', { index: soundKey });
        window.ipcRenderer.on('removeSound', (event, data) => { // IPC event listener
            if (data.error === "Ok") {
                onRemoveAction()
            }
        });
    }


    return (

        <BackgroundPopin>
            <ContentPopin>
                <Header>
                    <Title>
                        Voulez-vous réellement supprimer se son ?
                    </Title>

                    <CloseButton onClick={() => onRemoveAction()} > X</CloseButton>
                </Header>
                <Content>
                    <Button text="Non" color="#45a164" inverse={true} onClick={() => onRemoveAction()} />
                    <Button text="Oui" color="#d16767" inverse={false} onClick={handleConfirm} />
                </Content>
            </ContentPopin>
        </BackgroundPopin>

    )
}

export default PopinRemoveSoundConfirm; 