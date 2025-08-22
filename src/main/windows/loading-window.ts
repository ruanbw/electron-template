import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '@/resources/icon.png?asset'
import { showMainWindow } from "./main-window";

/**
 * 创建预加载窗口
 */
async function createLoadingWindow(): Promise<void> {

  const loadingWindow = new BrowserWindow({
    width: 400,
    height: 250,
    show: false,
    frame: false,
    transparent: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    },
  })

  loadingWindow.setAlwaysOnTop(true)

  loadingWindow.on('ready-to-show', () => {
    loadingWindow?.show()

    setTimeout(() => {
      showMainWindow()
      loadingWindow.close()
    }, 3000)
  })

  loadingWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loadingWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/loading.html')
  } else {
    loadingWindow.loadFile(join(__dirname, '../../renderer/loading.html'))
  }
}

export { createLoadingWindow }
