const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const MAIN_MESSAGE = '@electron-delta/updater:main';

const getWindow = (darkMode = false) => new BrowserWindow({
  width: 300,
  height: 350,
  resizable: false,
  frame: false,
  show: true,
  titleBarStyle: 'hidden',
  backgroundColor: darkMode ? '#1F2333' : '#fff',
  fullscreenable: false,
  skipTaskbar: false,
  center: true,
  movable: false,
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    disableBlinkFeatures: 'Auxclick',
    sandbox: true,
    preload: path.join(__dirname, 'preload.js'),
  },
});

function getStartURL() {
  return url
    .pathToFileURL(path.join(__dirname, 'splash.html'))
    .toString();
}

function dispatchEvent(updaterWindow, eventName, payload) {
  if (updaterWindow && !updaterWindow.isDestroyed()) {
    updaterWindow.webContents.send(MAIN_MESSAGE, { eventName, payload });
  }
}

module.exports = { getWindow, getStartURL, dispatchEvent };
