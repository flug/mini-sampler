import React, { useEffect, useContext, useState } from 'react';
import WebAudioContext from './WebAudioContext';
const fs = window.remote.require('fs');
const soundDirectory = window.remote.app.getPath('userData');


const contextAudio = () => {
    const contextAudio = new (window.AudioContext || window.webkitAudioContext)();

    return contextAudio;
}
const toArrayBuffer = (buffer) => {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}




const Player = (props) => {

    const audioContext = useContext(WebAudioContext).contextAudio;
    const { distortion, gain } = audioContext.contextAudio;
    const [soundPath, setSoundPath] = useState(null);
    const [ctxt] = useState(contextAudio());
    const dist = ctxt.createWaveShaper();
    const analyseur = ctxt.createAnalyser()
    const gainNode = ctxt.createGain();

    useEffect(() => {
        window.addEventListener('sound', (e) => {
            setSoundPath(soundDirectory + e.detail.sound);
        });
    }, []);

    useEffect(() => {
        dist.curve = distortion;

    }, [distortion])

    useEffect(() => {
        //        gainNode.gain.value = gain
        console.log(gain);
        gainNode.gain.setValueAtTime(gain, ctxt.currentTime);
    }, [gain])

    useEffect(() => {

        if (soundPath === null) {
            return;
        }

        fs.readFile(soundPath, (err, data) => {
            console.log(data);
            if (err) throw err;
            console.log(soundPath);
            ctxt.decodeAudioData(toArrayBuffer(data), (buffer) => {
                let source = ctxt.createBufferSource();

                source.buffer = buffer;
                source.connect(gainNode);
                analyseur.connect(gainNode);
                gainNode.connect(ctxt.destination);
                /*
                                setInterval(() => {
                                    gainNode.gain.value += 1;
                                }, 1000)*/
                // console.log(gainNode.gain.value = 78);
                // dist.connect(gainNode)


                source.start(0);
                setSoundPath(null);
            })
        });
    }, [soundPath])



    return (
        null
    );
}

export default Player; 
