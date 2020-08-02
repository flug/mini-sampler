import React from 'react'
import RecordApp from './RecordApp';
import WebAudioContext from './WebAudioContext';
import useStateAudioApi from './useStateAudioApi';
import App from './App';
import styled from 'styled-components';

const SectionApp = styled.div`
  display: grid ; 
  grid-template-columns: 60% 40%;
  width: 100%;
  height: 100vh; 

`
const MiniSampler = () => {

    const store = {
        contextAudio: useStateAudioApi()
    }
    return (
        <SectionApp>
            <WebAudioContext.Provider value={store}>
                <RecordApp value={store}/>
                <App />
            </WebAudioContext.Provider>
        </SectionApp>
    );
}

export default MiniSampler; 