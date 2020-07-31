import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Button from './Button';
import PopinEditingSound from './PopinEditingSound';
import usePopin from './PopinEditingSound/usePopin';
import NewSound from './Button/NewSound';
import PopinRemoveSoundConfirm from './PopinRemoveSoundConfirm';
import usePopinConfirm from './PopinRemoveSoundConfirm/usePopinConfirm';


const Container = styled.div`
  margin: auto; 
  padding: 15px; 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
  grid-gap: 10px 15px;
  grid-auto-rows: minmax(100px, auto);
`

const useStateWithLocalStorage = localStorageKey => {
  const [config, setConfig] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || {}
  );

  useEffect(() => {
    window.ipcRenderer.on('loader', (e, data) => {
      setConfig(data);
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    });

  }, [config]);

  return [config];
}

const App = () => {
  const [config] = useStateWithLocalStorage('config');
  const buttons = config.buttons || [];
  const [{ isShowing }] = usePopin();
  const removePopinState = usePopinConfirm();

  const [soundKey, setSoundKey] = useState(0);

  return (

    <Container className="App">
      {buttons.map((button, i) => (
        <Button button={button} key={i} soundKey={[setSoundKey, i]} onRemoveAction={removePopinState.toggle} />
      ))}
      {isShowing ? <PopinEditingSound soundKey={soundKey} /> : null}
      {removePopinState.isShowing ? <PopinRemoveSoundConfirm onRemoveAction={removePopinState.toggle} soundKey={soundKey} /> : null}
      <NewSound soundKey={setSoundKey} />
    </Container>
  );
}
export default App;
