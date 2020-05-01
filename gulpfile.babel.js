import gulp from "gulp";
import { spawn } from "child_process";
import hugoBin from "hugo-bin";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import less from "gulp-less";
import path from "path";
import responsive from "gulp-responsive";
var log = require( 'fancy-log' );


const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = [ "-d", "../dist", "-s", "site", "-v" ];
const hugoArgsPreview = [ "--buildDrafts", "--buildFuture" ];

// Development tasks
gulp.task( "hugo", ( cb ) => buildSite( cb ) );
gulp.task( "hugo-preview", ( cb ) => buildSite( cb, hugoArgsPreview ) );

// // Compile CSS with PostCSS
// gulp.task("css", () => (
//   gulp.src("./src/css/*.css")
//     .pipe(postcss([cssImport({from: "./src/css/main.css"}), cssnext()]))
//     .pipe(gulp.dest("./dist/css"))
//     .pipe(browserSync.stream())
// ));

gulp.task( 'copyassets', function() {
  gulp.src( './src/css/**/*' )
    .pipe( gulp.dest( './dist/css' ) );
  gulp.src( './assets/**.*' )
    .pipe( gulp.dest( './dist/assets' ) );
} );

gulp.task( 'copyVideo', function() {
  gulp.src( './vid/**.*' )
    .pipe( gulp.dest( './dist/assets/video' ) );
} );



gulp.task( 'less', ( done ) => {
  gulp.src( './src/less/main.less' )
    .pipe( less( {
      paths: [ path.join( __dirname, 'less', 'includes' ) ]
    } ) )
    .pipe( gulp.dest( './dist/css' ) )
    .pipe( browserSync.stream() );
  done();
} );

// Compile Javascript
gulp.task( "js", ( cb ) => {
  const myConfig = Object.assign( {}, webpackConfig );

  webpack( myConfig, ( err, stats ) => {
    if ( err ) throw new gutil.PluginError( "webpack", err );
    log( "[webpack]", stats.toString( {
      colors: true,
      progress: true
    } ) );
    browserSync.reload();
    cb();
  } );
} );



//task for responsive images
gulp.task( 'images', function() {
  return gulp.src( [ 'img/*.{jpg,png}' ] )
    .pipe( responsive( {
      '*': [ {
        rename: {
          suffix: ''
        },
      }, {
        width: 100,
        withoutEnlargement: false,
        rename: {
          suffix: '-thumbnail'
        },
      }, {
        width: 1024,
        withoutEnlargement: false,
        rename: {
          suffix: '-large'
        },
      }, {
        width: 800,
        withoutEnlargement: false,
        rename: {
          suffix: '-medium'
        },
      } ]
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Zlib compression level of PNG output format
      compressionLevel: 6,
      // Strip all metadata
      withMetadata: false,

      skipOnEnlargement: false,
      errorOnEnlargement: false,
    } ) )
    .pipe( gulp.dest( 'dist/assets/img' ) );
} );



// Development server with browsersync
gulp.task( "serve", gulp.series( "hugo", "less", "js", ( done ) => {
  browserSync.init( {
    server: {
      baseDir: "./dist"
    }
  } );
  gulp.watch( "./src/js/**/*.js", gulp.series( "js" ) );
  gulp.watch( "./src/less/**/*.less", gulp.series( "less" ) );
  gulp.watch( "./site/**/*", gulp.series( "hugo" ) );
  gulp.watch( "./vid/**/*", gulp.series( "copyVideo" ) );
  gulp.watch( "./assets/**/*", gulp.series( "copyassets" ) );
  gulp.watch( "./img/**/*", gulp.series( "images" ) );

  done();

} ) );

// Build/production tasks
gulp.task( "build", gulp.series( "less", "copyassets", "images", "copyVideo", "js", ( cb ) => buildSite( cb, [], "production" ) ) );
gulp.task( "build-preview", gulp.series( "less", "copyassets", "images", "copyVideo", "js", ( cb ) => buildSite( cb, hugoArgsPreview, "production" ) ) );


/**
 * Run hugo and build the site
 */
function buildSite( cb, options, environment = "development" ) {
  const args = options ? hugoArgsDefault.concat( options ) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

  return spawn( hugoBin, args, { stdio: "inherit" } ).on( "close", ( code ) => {
    if ( code === 0 ) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify( "Hugo build failed :(" );
      cb( "Hugo build failed" );
    }
  } );
}