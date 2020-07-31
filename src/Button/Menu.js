import React, { useState } from 'react';
import '../fontello.css'
import usePopin from '../PopinEditingSound/usePopin';
import styled from 'styled-components';


const IconEdit = styled.span`
    height: 2em;
    width: 2em;
    position: relative;
    display: block;
    font-size: 13px;
    line-height: 25px ; 
    fill: #181818;
    filter: drop-shadow(0 1px 1px rgba(255,255,255,0.15)) url("#inset-shadow");
    text-align: center;
`
const ButtonsGroup = styled.div`
    position relative;
    z-index 2;
    display flex;
    background-color #000;
    border-radius 7px;
    padding 1px;
    margin-top: 5px; 
`
const Button = styled.div`
  cursor pointer;
  flex 1;
  background-image: linear-gradient(to top, #242424 0%, #303030 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
  transition: .2s;
  font-size: 2.5em;
  box-shadow: inset 0 20px 4px -21px rgba(#fff,.4), 0 19px 13px 0 rgba(0,0,0,.3);
  color: #181818;
  position: relative;
  z-index: 2;
  &:before {
    content: "";
    display: block;
    width: .8em;
    height: .8em;
    transition: .1s;
    background-image: radial-gradient(circle 30px at center, #ebf7ff 0%, #b3e1ff 47%, #b3e1ff 100%);
    position: absolute;
    filter: blur(15px);
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    }
    &:after {
        display: block;
        height: 70px;
        width: 1px;
        position: absolute;
        border-radius: 50%;
        z-index: -1;
        opacity: 0;
        transition: .2s;
        filter: blur(0px);
        box-shadow: -75px 0 0px 0px rgba(#b3e1ff, 0.3),74px 0 0px 0px rgba(#b3e1ff, 0.35); 
     }
    &:first-of-type {
        border-radius: 4px 0 0 4px
       
    }
    &:last-of-type {
        border-radius: 0 4px 4px 0
       
    }
    &first-of-type:after {
        box-shadow: -85px 0 18px 1px transparent, 83px 0 12px 1px #b3e1ff;
    }
    &:last-of-type:after {
        box-shadow: -85px 0 18px 1px #b3e1ff, 83px 0 12px 1px transparent;
    }
    &.active{
    background-image: linear-gradient(to top, #151515 0%, #1d1d1d 100%);
    box-shadow: inset 0 16px 14px -21px transparent, 0 0px 13px 0 rgba(0,0,0,0.3),inset 0 0 7px 2px rgba(0,0,0,0.4)
        z-index: 0
        
    }
    &.active:before{
        width: 1em
        height: 1em
        opacity: .8
    }
        
    &.active:after {
        opacity: 0
    }
        
    &.active:after span {

            fill: url(#active)
            filter: drop-shadow(0 1px 1px  rgba(#fff, 0))
    }
        
    
`
const MenuList = styled.ul`
    position: absolute;
    top: 23px;
    background: #29282d;
    margin: 0;
    padding: 0; 
    list-style: none;
    line-height: 19px;
    left: 13px;
    border-radius: 0px 0px 3px 5px rgba(13,15,18,0.46); 
    border: 1px solid #353535
`
const MenuItem = styled.li`
    color: white;
    font-size: 13px;
    padding: 2px 8px;
`



const Menu = ({ soundKey, onRemoveAction }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [, dispatch] = usePopin();
    const handleClickPopin = () => {
        const func = soundKey[0];
        const index = soundKey[1];
        func(index);
        dispatch({ type: 'toggle' });

    }
    const handleRemoveSound = (e) => {
        const func = soundKey[0];
        const index = soundKey[1];
        func(index);
        onRemoveAction();
    }
    return (
        <ButtonsGroup>
            <Button >
                <IconEdit className="icon-record" />
            </Button>
            <Button onClick={() => setShowMenu(!showMenu)}>
                <IconEdit className="icon-music" />
                {
                    showMenu ?

                        <MenuList>
                            <MenuItem onClick={handleClickPopin} >Modifier</MenuItem>
                            <MenuItem onClick={handleRemoveSound}>Supprimer</MenuItem>
                        </MenuList> : null
                }
            </Button>
        </ButtonsGroup >
    );
}


export default Menu; 