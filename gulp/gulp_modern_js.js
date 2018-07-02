var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var stripDebug = require('gulp-strip-debug');

gulp.task( 'js', function() {
    return browserify({
        entries: [jsSRC]
    })
    .transform( babelify, { presets: [ 'env' ] } )
    .bundle()
    .pipe( source( 'myscript.js' ) )
    .pipe( buffer() )
    .pipe( gulpif( options.has( 'production' ), stripDebug() ) )
    .pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe( uglify() )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( jsURL ) )
    .pipe( browserSync.stream() );
 });
