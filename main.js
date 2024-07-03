const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {//要将此脚本附加到渲染器进程，请将其路径传递给 BrowserWindow 构造函数中的 webPreferences.preload 选项
      preload: path.join(__dirname, 'preload.js')// __dirname 字符串指向当前正在执行的脚本的路径，path.join API 将多个路径段连接在一起
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  /**
   * 在主进程中设置 handle 监听器。
   * 我们在加载 HTML 文件之前执行此操作，以便保证处理程序在从渲染器发出 invoke 调用之前准备就绪。
   */
  ipcMain.handle('ping', () => '主进程发消息给DOM页面')
  createWindow()

  app.on('activate',()=>{
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
      app.quit()
    }
  })