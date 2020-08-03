import { useState } from 'react'
const useStateAudioApi = () => {
    const [contextAudio, setContextAudio] = useState({
        distortion: new Float32Array(),
        gain: 0,
        biquadFilter: 0
    });

    const setDistortion = (val) => {
        setContextAudio({ ...contextAudio, distortion: val })
    }
    const setGain = (val) => {
        setContextAudio({ ...contextAudio, gain: val })
    }

    const setBiquadFilter = (val) => {
        setContextAudio({ ...contextAudio, biquadFilter: val })
    }

    return {
        contextAudio,
        setDistortion,
        setGain,
        setBiquadFilter
    }
}

export default useStateAudioApi; 