const electron = require('electron');
const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');
// Module to control application life.
const app = electron.app;
const ipcMain = electron.ipcMain
const globalShortcut = electron.globalShortcut;
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required")
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;


const url = require('url');
const configPath = __dirname + "/config.json";
const soundDirectory = "/sounds";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser windo

    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: { nodeIntegration: true, preload: __dirname + '/preload.js' }
    });
    mainWindow.setMenu(null);

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    loadConfig(mainWindow);
    onUpdateSound(mainWindow);
    onRemoveSound(mainWindow);
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

const onUpdateSound = (mainWindow) => {
    ipcMain.on('updateSound', (event, soundObject) => {

        fs.readFile(configPath, (err, data) => {
            if (err) throw err;

            let config = JSON.parse(data);

            if (path.dirname(soundObject.sound.path) !== soundDirectory) {
                soundObject.sound.path = copySound(soundObject.sound.path);
            }

            config.buttons[soundObject.index] = soundObject.sound;

            const updateData = new Uint8Array(Buffer.from(JSON.stringify(config)));
            fs.writeFile(configPath, updateData, (err) => {
                if (err) throw err;

                mainWindow.webContents.send('loader', config)
                event.reply("updateSound", { error: "Ok" })
            });
        })
    });
}


const onRemoveSound = (mainWindow) => {
    ipcMain.on('removeSound', (event, indexObject) => {


        fs.readFile(configPath, (err, data) => {
            if (err) throw err;

            let config = JSON.parse(data);

            config.buttons.splice(indexObject.index, 1);

            const updateData = new Uint8Array(Buffer.from(JSON.stringify(config)));
            fs.writeFile(configPath, updateData, (err) => {
                if (err) throw err;

                mainWindow.webContents.send('loader', config)
                event.reply("removeSound", { error: "Ok" })
            });

        });

    })
}

const copySound = (soundPath) => {


    const ext = path.extname(soundPath);
    const relativePath = soundDirectory + "/" + md5File.sync(soundPath) + ext;
    const absolutePath = __dirname + "/public/" + relativePath;
    fs.copyFile(soundPath, absolutePath, (err) => console.log(err))

    return relativePath;
}
const loadConfig = (mainWindow) => {
    fs.readFile(configPath, (err, data) => {
        if (err) throw err;

        let config = JSON.parse(data);


        config.buttons.map((button) => {

            globalShortcut.register(button.shortcut, () => {
                mainWindow.webContents.send('sound', button.path)
            });
        })

        setTimeout(() => {
            mainWindow.webContents.send('loader', config)
            console.log('update database client!')
        }, 5000)

    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
