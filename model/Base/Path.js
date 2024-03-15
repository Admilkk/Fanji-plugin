import path from 'path'
class Path {
    get qianyuPath() {
        return process.cwd() + path.join('/plugins/Fanji-plugin/')
    }

    get resourcePath() {
        return this.qianyuPath + path.join('resources/')
    }
}
export default new Path()