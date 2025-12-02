//Подключает все необходимые npm-пакеты
let gulp = require("gulp");
let fs = require('fs');
let del = require("del");

let browsersync = require("browser-sync").create();
let plumber = require("gulp-plumber");

let { src, dest } = require("gulp");

let autoprefixer = require("gulp-autoprefixer");
let scss = require('gulp-sass')(require('sass'));
let group_media = require("gulp-group-css-media-queries");
let imagemin = require("gulp-imagemin");
let rename = require("gulp-rename");
let fileinclude = require("gulp-file-include");
let clean_css = require("gulp-clean-css");
let newer = require('gulp-newer');

// let webp = require('imagemin-webp');
// let webpcss = require("gulp-webpcss");
// let webphtml = require('gulp-webp-html');

let fonter = require('gulp-fonter');

let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');

// Определяются пути для исходных файлов и для сборки
// Папка #src - исходники, project_name - папка сборки (название текущей папки проекта)
let project_name = require("path").basename(__dirname);
// let build_name = require("path").basename(__dirname) + "-build";
let src_folder = "#src";

let path = {
	build: {
		html: project_name + "/",
		js: project_name + "/js/",
		css: project_name + "/css/",
		images: project_name + "/img/",
		fonts: project_name + "/fonts/",
		json: project_name + "/json/"
	},
	src: {
		favicon: src_folder + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
		html: [src_folder + "/**/*.html", "!" + src_folder + "/_*.html"],
		js: [src_folder + "/js/app.js", src_folder + "/js/vendors.js"],
		css: src_folder + "/scss/style.scss",
		images: [src_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}", "!**/favicon.*"],
		fonts: src_folder + "/fonts/*.ttf",
		json: src_folder + "/json/**/*.*"
	},
	watch: {
		html: src_folder + "/**/*.html",
		js: src_folder + "/**/*.js",
		css: src_folder + "/scss/**/*.scss",
		images: src_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
		json: src_folder + "/json/**/*.*"
	},
	clean: "./" + project_name + "/"
	// buildclean: "./" + build_name + "/"
};


//plumber() - ловушка ошибок (поток не падает при ошибке)
//fileinclude() - вставка файлов (заменяет @@include на содержимое)
//dest() - сохранение на диск (записывает файлы в папку)
//rename() - переименование в памяти (меняет путь файла перед сохранением)
//pipe() - соединение потоков (передает данные от одного плагина к другому)
//src() - чтение файлов (берет файлы из исходной папки)  
//scss() - компиляция SCSS (преобразует SCSS/Sass в CSS)  
//autoprefixer() - добавление префиксов (добавляет -webkit-, -moz- для старых браузеров)  
//group_media() - группировка медиа-запросов (объединяет одинаковые @media)  
//imagemin() - сжатие изображений (уменьшает размер картинок)  
//clean_css() - минификация CSS (удаляет пробелы, комментарии, оптимизирует)  
//newer() - фильтр новых файлов (обрабатывает только измененные файлы)  
//browsersync.stream() - обновление браузера (инжектит изменения без перезагрузки страницы)  
//del() - удаление файлов (удаляет файлы и папки)  
//gulp.watch() - слежение за файлами (запускает задачи при изменениях)  
//gulp.series() - последовательное выполнение (задачи выполняются одна за другой)  
//gulp.parallel() - параллельное выполнение (задачи выполняются одновременно)  
//on('error') - обработка ошибок (ловит и обрабатывает ошибки в потоке)  
//outputStyle: 'expanded' - формат CSS (сохраняет читаемый код с отступами)  
//encoding: false - бинарный режим (для изображений и других бинарных файлов)

// Копирует указанные в foldersArray папки в сборку
// Пишем папки которые нужно копировать через запятую
let foldersArray = []; // 'videos', 'files' ...
function copyFolders() {
	foldersArray.forEach(folderItem => {
		src(src_folder + "/" + folderItem + "/**/*.*", {})
			.pipe(newer(project_name + "/" + folderItem + "/"))
			.pipe(dest(project_name + "/" + folderItem + "/"));
	});
	return src(path.src.html).pipe(browsersync.stream());
}


// Запускает локальный сервер с автоперезагрузкой страницы при изменениях
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./" + project_name + "/"
		},
		notify: false,
		port: 3000,
	});
}

//Берет HTML-файлы из #src
//Обрабатывает @@include директивы (вставка частей HTML)
//Сохраняет в папку сборки
//Обновляет браузер
function html() {
	return src(path.src.html, {})
		.pipe(fileinclude())
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

//Преобразует SCSS/Sass в CSS, добавляет суффикс .min
function css() {
	return src(path.src.css, {})
		.pipe(
			scss({ outputStyle: 'expanded' }).on('error', scss.logError)
		)
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}
// function json() {
//   return src(path.src.json, {})
//     .pipe(dest(path.build.json))
//     .pipe(browsersync.stream());
// }

//Объединяет и минифицирует JavaScript файлы
function js() {
	return src(path.src.js, {})
		.pipe(fileinclude())
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(
			rename({
				suffix: ".min",
				extname: ".js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

//Копирует изображения, пропуская уже обработанные
function images() {
	return src(path.src.images, { encoding: false })
		.pipe(newer(path.build.images))
		.pipe(dest(path.build.images))
}
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico"
			})
		)
		.pipe(dest(path.build.html))
}

//Конвертирует шрифты в современные форматы и генерирует SCSS-файл с @font-face
function fonts_otf() {
	return src('./' + src_folder + '/fonts/*.otf', { encoding: false })
		.pipe(plumber())
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest('./' + src_folder + '/fonts/'));
}
function fonts() {
	src(path.src.fonts, { encoding: false })
		.pipe(plumber())
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream());
}
function fontstyle() {
	let file_content = fs.readFileSync(src_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/fonts.scss', '', cb);
		fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
	return src(path.src.html).pipe(browsersync.stream());
}

function infofile() { }

function cb() { }

//clean() - удаление папки сборки (очистка project-name/ перед новой сборкой)
function clean() {
	return del(path.clean);
}

//clean_build() - удаление финальной папки (очистка project-name-build/, если используется)
function clean_build() {
	return del(path.buildclean);
}

// Отслеживает изменения в файлах и запускает соответствующие задачи
function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	// gulp.watch([path.watch.json], json);
	gulp.watch([path.watch.images], images);
}


//Создает ДВА файла - обычный и минифицированный, с полной оптимизацией
function cssBuild() {
	return src(path.src.css, {})
		.pipe(plumber())
		.pipe(
			scss({ outputStyle: 'expanded' }).on('error', scss.logError)
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(webpcss(
			{
				webpClass: "._webp",
				noWebpClass: "._no-webp"
			}
		))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

// Создает ДВЕ копии - оригиналы и сжатые версии с теми же именами (перезаписывает)
function jsBuild() {
	let appPath = path.build.js + 'app.min.js';
	let vendorsPath = path.build.js + 'vendors.min.js';
	del(appPath);
	del(vendorsPath);
	return src(path.src.js, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.js))
		.on('error', function (err) { console.log(err.toString()); this.emit('end'); })
		.pipe(
			rename({
				suffix: ".min",
				extname: ".js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

// Создает ДВЕ копии - оригиналы и сжатые версии с теми же именами (перезаписывает)
function imagesBuild() {
	return src(path.src.images, { encoding: false })
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images, { encoding: false }))
		.pipe(newer(path.build.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images))
}

//Сборка HTML
function htmlBuild() {
	return src(path.src.html, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

// 1. Последовательное выполнение для шрифтов
let fontsBuild = gulp.series(fonts_otf, fonts, fontstyle);
// 2. Сборка для разработки
let buildDev = gulp.series(clean, gulp.parallel(fontsBuild, copyFolders, html, css, js, favicon, images));
// 3. Режим разработки (watch)
let watch = gulp.series(buildDev, gulp.parallel(watchFiles, browserSync));
// 4. Продакшен-сборка
let build = gulp.series(clean, gulp.parallel(htmlBuild, cssBuild, jsBuild, imagesBuild, fontsBuild));

// exports.imagesBuild = gulp.parallel(imagesBuild);

// Экспорт задач (публичный API)
exports.copy = copyFolders;
exports.fonts = fontsBuild;
exports.build = build;
exports.watch = watch;
exports.default = watch;
