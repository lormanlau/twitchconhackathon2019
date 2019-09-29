// import { app, ipcMain, remote, screen, BrowserWindow } from 'electron' // eslint-disable-line
import { app, BrowserWindow } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    transparent: true,
    frame: false,
    minimizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      webSecurity: false,
    },
  });

  // app.dock.hide();
  mainWindow.maximize();
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // ipcMain.on('setGlobal', (event, newVar) => {
  //   global[newVar.name] = newVar.value;
  // });
  //
  // mainWindow.webContents.on('before-input-event', (event, input) => {
  //   // For example, only enable application menu keyboard shortcuts when
  //   // Ctrl/Cmd are down.
  //   mainWindow.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta);
  // });
}

app.disableHardwareAcceleration();
app.on('ready', () => setTimeout(createWindow, 300));


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
