const { ipcMain } = require('electron');
const electron = require('electron');
// Module to control application life.
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');



let mainWindow;
const windowWidth = 1280;
const windowHeight = 720;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        minWidth: windowWidth,
        minHeight: windowHeight,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: __dirname + '/preload.js'
        },
        frame: false,
        fullscreenable: true,
        resizable: true,

    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Clear Cache
    mainWindow.webContents.session.clearStorageData()
    mainWindow.webContents.session.clearCache()



    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

// Catch Window Controls
ipcMain.handle('window-controls', (event, arg) => {
    if (arg === "-") {
        mainWindow.minimize()
    } else if (arg === "+") {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
            mainWindow.setSize(windowWidth, windowHeight)
        } else {
            mainWindow.maximize();
        }
    } else if (arg === "x") {
        app.quit()
    }
    // return 1
})