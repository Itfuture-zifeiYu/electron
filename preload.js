// 预加载脚本
const { contextBridge,ipcRenderer } = require('electron')

// 将 Electron 的 process.versions 对象的选定属性公开给 versions 全局变量中的渲染器进程
contextBridge.exposeInMainWorld('versions',{
    node: ()=>process.versions.node,
    chrome: ()=>process.versions.chrome,
    electron: ()=>process.versions.electron,
    //我们不仅可公开函数，也可公开变量
    /**
     * 进程间通信:
     *    Electron 无法直接从渲染器进程访问 Node.js API，也无法从主进程访问 HTML 文档对象模型 (DOM)
     * 解决方案是使用 Electron 的 ipcMain 和 ipcRenderer 模块进行进程间通信（IPC）
     * 网页消息--> 主进程：
     *                  1.公开一个调用 ipcRenderer.invoke 的函数以在预加载脚本中触发处理程序
     *                  2.使用 ipcMain.handle 设置主进程处理程序
     */
    ping: ()=> ipcRenderer.invoke('ping')
})

