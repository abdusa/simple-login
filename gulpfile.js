var gulp 						= require('gulp'),
		browserSync 		= require('browser-sync'),
		sass 						= require('gulp-sass'),
		plumber 				= require('gulp-plumber'),
		prefix 					= require('gulp-autoprefixer');


gulp.task('sync', ['sass'], function(){
	console.log('Starting Browser Sync ...');
	browserSync.init({
		server: {
			baseDir: './',
			index: 'index.html'
		},
		notify: false
	});
	gulp.watch('./index.html', ['reload']);
	gulp.watch('assets/css/style.sass', ['sass']);
});

gulp.task('sass', function(){
	console.log('Compiling SASS ...');
	return gulp.src('./assets/css/style.sass')
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded', precision: 3}))
		.pipe(prefix({ browsers: ['last 2 versions', '> 1%', 'IE 8'], cascade: true}))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('reload', () => {
	browserSync.reload();
})

gulp.task('default', ['sync']);