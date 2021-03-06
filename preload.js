const { ipcRenderer, remote } = require('electron');

ipcRenderer.on('sound', (e, data) => {
    window.dispatchEvent(new CustomEvent('sound', {
        detail: {
            sound: data
        }
    }))
});

window.ipcRenderer = ipcRenderer;
window.remote = remote; 
