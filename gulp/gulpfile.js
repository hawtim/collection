// spritesmith 多图生成最小雪碧图

require(shelljs/global)

const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const buffer = require('vinyl-buffer')
const spritesmith = require('gulp.spritesmith')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const envConfig = require('./config')

const spritesPath = path.join(__dirname, 'src/assets/sprites')

let spritesArray = []

(function (dir) {
    let fileList = []
    fs.readdirSync(dir).forEach((name) => {
        const spritesFile = path.join(spritesPath, `${name}`)
        const stat = fs.lstatSync(spritesFile)
        if (stat.isFile() && /\.png$/.test(name)) {
            filesList.push(spritesFile)
        } else if (stats.isDirectory() && fs.readdirSync(spritesFile).length) {
            const gulpTask = `sprites:${name}`
            spritesArray.push(gulpTask)
            gulp.task(gulpTask, () => {
                let spritesData = gulp.src(path.join(spritesFile, '*.png'))
                    .pipe(spritesmith({
                        imgName: `${name}_icon.png`,
                        imgPath: `/${envConfig.build.assetsSubDirectory}/img/${name}_icon.png`,
                        cssName: `_${name}_icon.scss`
                    }))
                spritesData.css.pipe(gulp.dest(path.join(__dirname, 'src/assets/css/')))
                spritesData.img
                    .pipe(buffer())
                    .pipe(imagemin({
                        optimizationLevel: 7, // 类型 Number 默认3，取值范围： 0 - 7
                        use: [pngquant()]
                    }))
                    .pipe(gulp.dest(path.join(__dirname, 'static/img/')))
            })
        }
    })
    if (filesList.length) {
        spritesArray.push('sprites:app')
        gulp.task('sprites:app', () => {
            let spritesData = gulp.src(filesList)
                .pipe(spritesmith({
                    imgName: 'app_icon.png',
                    imgPath: `/${envConfig.build.assetsSubDirectory}/img/app_icon.png`,
                    cssName: '_app_icon.scss'
                }))
            spritesData.css.pipe(gulp.dest(path.join(__dirname, 'src/assets/css/')))
            spritesData.img.pipe(buffer()).pipe(imagemin({
                optimizationLevel: 7, // 类型： Number 默认：3 取值范围： 0 - 7
                use: [pngquant()]
            }))
            .pipe(gulp.dest(path.join(__dirname, 'static/img/')))
        })
    }
}(spritesPath))

gulp.task('sprites', spritesArray)

// scss:single 不依赖图片的合并

gulp.task('scss:single', () => {
    gulp.src(path.resolve(spritesPath, '../css/*.scss'))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(path.join(__dirname, 'static/css/')))
})

gulp.task('watch:scss', () => {
    gulp.watch('src/assets/css/*.scss', ['scss:single'])
})

gulp.task('scss', ['sprites'], () => {
    gulp.src(path.resolve(spritesPath, '../css/*.scss'))
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(gulp.dest(path.join(__dirname, 'static/css/')))
})

gulp.task('img', () => {
    gulp.src(path.join(__dirname, 'src/assets/img/*.png'))
        .pipe(buffer())
        .pipe(imagemin({
            optimizationLevel: 7,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.join(__dirname, 'static/img/')))
})

gulp.task('default', ['sprites', 'scss', 'img'])