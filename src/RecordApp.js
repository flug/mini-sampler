import React from 'react';
import InputRangeSound from './Range/InputRangeSound';
import styled from 'styled-components';


const View = styled.div`
    padding: 15px 0; 
    display: grid; 
    grid-template-columns:   repeat(auto-fit,minmax(20%,1fr));
    align-items: center; 
  
`

const makeDistortionCurve = (amount) => {
    let k = typeof amount === 'number' ? amount : 0,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
};


const RecordApp = ({ value }) => {

    const { contextAudio, setDistortion, setGain } = value.contextAudio;

    const handleWaveShaper = (e) => {
        setDistortion(makeDistortionCurve(e.target.value))
    }

    const handleGainChange = (e) => {
        setGain(e.target.value)
    }


    return (
        <View>
            <InputRangeSound onChange={handleWaveShaper} min="150" max="1000" />
            <InputRangeSound onChange={handleGainChange} min="0" max="100" />
            <InputRangeSound />
        </View>
    );

}

export default RecordApp; 