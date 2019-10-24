// const electron = require("electron");
const { app, BrowserWindow, Menu } = require("electron");

/*隐藏electron创听的菜单栏*/
Menu.setApplicationMenu(null)

let url = "https://jiweiqing.cn";
try {
    const args = process.argv;
    if (args.length > 0) {
        for (let i of args) {
            i = i.split("=");
            if (i[0] === "url") {
                url = i[1];
            }
        }
    }
} catch (err) {
    console.log(err)
}

const createWindow = () => {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 1400,
        height: 800,
        show:false,
        // 无边框窗口
        // frame: false,
        titleBarStyle: "hidden",
        // titleBarStyle: 'hiddenInset',
        // titleBarStyle: "customButtonsOnHover",
        // frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });


    // 加载页面
    win.loadURL(url);

    win.once('ready-to-show', () => {
        win.show()
      })
    // 打开开发者工具
    // win.webContents.openDevTools();

    // 当 window 被关闭，这个事件会被触发。
    win.on("closed", () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null;
    });

    // 当全部窗口关闭时退出。
    app.on("window-all-closed", () => {
        // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        // 在macOS上，当单击dock图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (win === null) {
            createWindow();
        }
    });
};
app.on("ready", createWindow);
