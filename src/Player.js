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
    const { distortion, gain, biquadFilter } = audioContext.contextAudio;
    const [soundPath, setSoundPath] = useState(null);
    const [ctxt] = useState(contextAudio());
    const dist = ctxt.createWaveShaper();
    let analyseur = ctxt.createAnalyser()
    let gainNode = ctxt.createGain();
    let tunableFilter = ctxt.createBiquadFilter();

    useEffect(() => {
        window.addEventListener('sound', (e) => {
            setSoundPath(soundDirectory + e.detail.sound);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            let event = new CustomEvent('distortion', { 'detail': { 'distortion': distortion } });
            document.dispatchEvent(event)
        }, 1000)
    }, [distortion])

    useEffect(() => {
        setTimeout(() => {
            let event = new CustomEvent('gain', { 'detail': { 'gain': gain } });
            document.dispatchEvent(event)
        }, 1000)


    }, [gain])

    useEffect(() => {
        setTimeout(() => {
            let event = new CustomEvent('biquadFile', {
                'detail':
                {
                    'biquadFilter': {
                        type: "highshelf",
                        frequency: {
                            value: biquadFilter
                        },
                        gain: {
                            value: 50
                        }
                    }
                }
            })

            document.dispatchEvent(event);
        }, 1000)
    }, [biquadFilter])

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
                source.connect(analyseur);
                analyseur.connect(dist);
                dist.connect(tunableFilter);
                tunableFilter.connect(gainNode);
                gainNode.connect(ctxt.destination);

                document.addEventListener('distortion', ({ detail }) => dist.curve = detail.distortion)
                document.addEventListener('gain', ({ detail }) => gainNode.gain.value = detail.gain)
                document.addEventListener('biquadFile', ({ detail }) => tunableFilter = detail.biquadFilter)




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
