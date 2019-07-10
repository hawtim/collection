const fs = require('fs')
const path = require('path')
const Tinypng = require('@mora/tinypng').Tinypng

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

class Ty {
    constructor(options){
        //解析需要遍历的文件夹
        this.path = path.resolve(__dirname, options.path)
        this.quiet = options.quiet
        this.tokens = options.tokens
        this.cacheDir = resolve(options.cacheDir)
        this.recordFile = resolve(options.recordFile)
        this.excludeFolders = options.excludeFolders
    }
    init(tokens, cacheDir, recordFile, quiet) {
        let tinypng = new Tinypng({
            quiet,
            tokens,
            cacheDir,
            recordFile,
        })
        return tinypng
    }
    writeImageViaBuffer(fileDir) {
        const distPath = path.resolve(__dirname, fileDir)
        tinypng.tiny(fileDir).then(minifiedBuffer => {
            fs.writeFileSync(distPath, minifiedBuffer, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('写入成功')
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    processImage(filePath) {
        //根据文件路径读取文件，返回文件列表
        fs.readdir(filePath, (err, files) => {
            if (filePath.includes('vant')) return
            if (err) {
                console.warn(err)
            } else {
                files.forEach(filename => {
                    //获取当前文件的绝对路径
                    var fileDir = path.join(filePath, filename)
                    //根据文件路径获取文件信息，返回一个fs.Stats对象
                    fs.stat(fileDir, (err, stats) => {
                        if (err) {
                            console.warn('获取文件stats失败')
                        } else {
                            var isFile = stats.isFile() //是文件
                            var isDir = stats.isDirectory() //是文件夹
                            if (isDir) {
                                this.processImage(fileDir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                            if (isFile) {
                                if (fileDir.includes('png') || fileDir.includes('jpg')) {
                                    this.writeImageViaBuffer(fileDir)
                                }
                            }
                        }
                    })
                })
            }
        })
    }
}

export default Ty
