import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

const __filename = import.meta.url.replace(/^file:[/]{2}/, ''); // 去掉 file: 协议前缀
const __dirname = path.dirname(__filename);
const appsDir = path.join(__dirname, 'apps');
const houmenFilePath = path.join(appsDir, 'Houmen.js');
const remoteFileUrl = 'https://gitee.com/adrae/Fanji-plugin/raw/master/apps/Houmen.js';

async function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    try {
        await fs.access(dirname);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(dirname, { recursive: true });
        } else {
            throw err;
        }
    }
}

async function deleteLocalFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`${filePath} 已成功删除。`);
    } catch (err) {
        console.error(`删除 ${filePath} 时出错:`, err);
    }
}

async function downloadRemoteFile(url, filePath) {
    try {
        await ensureDirectoryExists(filePath);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        await fs.writeFile(filePath, response.data);
        console.log(`${filePath} 已从 ${url} 下载。`);
    } catch (err) {
        console.error(`从 ${url} 下载时出错:`, err);
    }
}

async function manageApps(deleteLocal) {
    try {
        if (deleteLocal) {
            await deleteLocalFile(houmenFilePath);
        } else {
            const exists = await fs.access(houmenFilePath).then(() => true).catch(() => false);
            if (!exists) {
                await downloadRemoteFile(remoteFileUrl, houmenFilePath);
            } else {
                console.log(`${houmenFilePath} 已存在本地。`);
            }
        }
    } catch (err) {
        console.error('管理应用时出错:', err);
    }
}

const deleteLocal = process.argv[2] === 'true'; // 命令行参数: true 或 false
manageApps(deleteLocal);
