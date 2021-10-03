import path from 'path';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { app, BrowserWindow, ipcMain, Menu } from 'electron';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

/* const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath(); */

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    frame: true,
    titleBarStyle: 'hidden',
    // backgroundColor: '#191622',
    backgroundColor: '#F2F2F2',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function createMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: 'Aplicação',
      submenu: [
        {
          role: 'reload',
          label: 'Recarregar',
        },
        { role: 'forceReload', label: 'Forçar atualização da página' },
        { role: 'toggleDevTools', visible: false },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message);
  });
}

app
  .on('ready', () => {
    createWindow();
    createMenu();
  })
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
