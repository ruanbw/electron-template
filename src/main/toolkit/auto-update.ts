import { app, dialog } from 'electron'
import { autoUpdater } from "electron-updater";

const isDev = !app.isPackaged;

export function autoUpdateSetup(): void {

    // if (isDev) {
    //     autoUpdater.setFeedURL("http://192.168.0.103:8080")
    //     autoUpdater.forceDevUpdateConfig = true; // Force dev update config
    // }

    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('checking-for-update', () => {
        console.log('正在检查更新...');
    });

    autoUpdater.on('update-available', (info) => {
        console.log('发现新版本:', info);
        dialog.showMessageBox({
            type: 'info',
            title: '发现新版本',
            message: `发现新版本 ${info.version}，正在后台下载...`,
        });
    });

    autoUpdater.on('update-not-available', (info) => {
        console.log('当前已是最新版本:', info);
        if (!isDev) {
            dialog.showMessageBox({
                title: '无更新',
                message: '当前已是最新版本。',
            });
        }
    });

    autoUpdater.on('error', (err) => {
        console.error('更新出错:', err);
        dialog.showErrorBox('更新错误', err.message);
    });

    autoUpdater.on('download-progress', (progressObj) => {
        console.log(`下载进度: ${progressObj.percent}%`);
        // 可发送到渲染进程显示进度
    });

    autoUpdater.on('update-downloaded', (info) => {
        console.log('更新已下载，准备安装:', info);
        dialog.showMessageBox({
            title: '更新完成',
            message: `新版本 ${info.version} 已下载完毕，是否立即重启应用？`,
            type: 'question',
            buttons: ['立即重启', '稍后'],
        }).then(result => {
            if (result.response === 0) {
                setImmediate(() => autoUpdater.quitAndInstall());
            }
        });
    })
}
