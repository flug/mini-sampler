import React, { useEffect } from 'react';




const Player = (props) => {


    useEffect(() => {
        window.addEventListener('sound', (e) => {
            const audio = new Audio(e.detail.sound)
            audio.play();
        })
    }, []);
    return (
        <span>

        </span>
    );
}

export default Player; 
