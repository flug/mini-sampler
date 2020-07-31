import React, { useState } from 'react';
import styled from 'styled-components';
import usePopin from './PopinEditingSound/usePopin';
import { SliderPicker } from 'react-color';
import File from './Input/File';
import keyCodes from './KeyCode';

const ContentPopin = styled.div`
    position : relative; 
    height: 95vh ; 
    top: 15px; 
    background: #181924; 
    width: 40%; 
    left: 30%;
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
    grid-template-columns: 84% 10%;
    border-bottom: 1px solid #20202a; 
`
const Content = styled.div`
    clear: both; 
    width: 100%; 
    margin: auto; 
    padding: 55px 15px; 
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
const getSound = (index) => {
    return JSON.parse(localStorage.getItem('config'))['buttons'][index];
}

const getCountButtons = () => {
    return JSON.parse(localStorage.getItem('config'))['buttons'].length
}

const unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const PopinEditingSound = ({ soundKey }) => {

    const [sound, setSound] = useState(soundKey !== null ? getSound(soundKey) : {});
    const dispatch = usePopin()[1];
    const handleChangeColor = (color) => setSound({ ...sound, color: color.hex });
    const submitSound = (e) => {
        e.preventDefault();
        if (soundKey === null) {
            soundKey = getCountButtons();
        }

        window.ipcRenderer.send('updateSound', { index: soundKey, sound: sound });
        window.ipcRenderer.on('updateSound', (event, data) => { // IPC event listener
            if (data.error === "Ok") {
                dispatch({ type: 'toggle' })
            }
        });
    }
    let keys = [];
    const handleKey = (e) => {
        e.preventDefault();

        setTimeout(() => {

            let shortcut = keys.sort().map((key) => {
                return keyCodes[key]
            }).filter(unique).join('+')

            if (shortcut !== '') {
                setSound({ ...sound, shortcut: shortcut });
            }

            keys = [];
        }, 200)
    }

    const onKeyDown = (e) => {
        e.preventDefault();
        keys.push(e.keyCode);
    }

    return (
        <BackgroundPopin>
            <ContentPopin>
                <Header>
                    <Title>
                        {soundKey !== null ? "Edition du son" : "Ajouter un son"}
                    </Title>

                    <CloseButton onClick={() => dispatch({ type: 'toggle' })} > X</CloseButton>
                </Header>
                <Content>
                    <form onSubmit={submitSound} >
                        <Input type="text" readOnly defaultValue={sound.path} key={sound.path} />
                        <File text="Ajouter un nouveau son" iconClass="icon-upload-cloud" onChange={(e) => { setSound({ ...sound, path: e.target.files[0].path }) }} />

                        <Input type="text" defaultValue={sound.shortcut} key={sound.shortcut} onKeyDown={onKeyDown} onKeyUp={handleKey} />
                        <div>
                            <Label> Couleur :</Label>
                            <SliderPicker color={sound.color} onChangeComplete={handleChangeColor} />
                        </div>
                        <SubmitButton>Enregistrer</SubmitButton>
                    </form>
                </Content>
            </ContentPopin>
        </BackgroundPopin>
    );
}

export default PopinEditingSound; 