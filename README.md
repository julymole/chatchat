# webpack-gulp-template
## Особенности
* именование классов по [БЭМ](https://ru.bem.info/)
* используется препроцессор [SCSS](https://sass-lang.com/)
* используется транспайлер [Babel](https://babeljs.io/) для поддержки современного JavaScript (ES6) в браузерах
* используется [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей
* используется жёсткий кодгайд

## Установка
* установите [NodeJS](https://nodejs.org/en/) (если требуется)
* установите ```pnpm``` глобально: ```npm i -g pnpm```
* установите ```gulp``` глобально: ```pnpm i gulp-cli -g```
* перейдите в скачанную папку со сборкой: ```cd webpack-gulp-template```
* скачайте необходимые зависимости: ```pnpm i```
* чтобы начать работу, введите команду: ```npm run dev``` (режим разработки)
* чтобы собрать проект, введите команду ```npm run build``` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером. Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## Файловая структура

```
webpack-gulp-template
├── build
├── gulp-tasks
├── src
│   ├── fonts
│   ├── img
│   ├── scripts
|   ├── static
│   ├── styles
│   └── templates
├── .babelrc.js
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .gitlab-ci.yml
├── .stylelintignore
├── .stylelintrc
├── global.json
├── gulpfile.babel.js
├── package.json
└── webpack.config.js
```

* Корень папки:
    * ```.editorconfig``` — настройки для редакторов кода
    * ```.babelrc.js``` — настройки Babel
    * ```.eslintrc.json``` — настройки ESLint
    * ```.gitignore``` – запрет на отслеживание файлов Git'ом
    * ```global.json``` — переменные для полноценной работы с nunjucks
    * ```.gitlab-ci.yml``` — файл-заготовка для настройки деплоя
    * ```gulpfile.babel.js``` — настройки Gulp
    * ```.stylelintrc``` — настройки Stylelint
    * ```.stylelintignore``` – запрет на отслеживание файлов Stylelint'ом
    * ```webpack.config.js``` — настройки Webpack
    * ```package.json``` — список зависимостей
* Папка ```src``` - используется во время разработки:
    * шрифты: ```src/fonts```
    * изображения: ```src/img```
    * JS-файлы: ```src/js```
    * страницы сайта: ```src/templates/pages```
    * SCSS-файлы: ```src/styles```
    * Постоянные инклуды: ```src/templates/includes```
    * Главный шаблон страницы: ```src/templates/layout.html```
    * статические файлы ```src/static```
* Папка ```build``` - папка, из которой запускается локальный сервер для разработки (при запуске ```npm run dev```)
* Папка ```gulp-tasks``` - папка с Gulp-тасками

## Команды
* ```npm run lint:style``` - проверить SCSS-файлы. Для VSCode необходимо установить [плагин](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint). Для WebStorm
или PHPStorm необходимо включить Stylelint в ```Languages & Frameworks - Style Sheets - Stylelint``` (ошибки будут исправлены автоматически при сохранении файла)
* ```npm run lint:style --fix``` - исправить ошибки в SCSS-файлах
* ```npm run dev``` - запуск сервера для разработки проекта
* ```npm run build``` - собрать проект с оптимизацией без запуска сервера
* ```npm run build views``` - скомпилировать Html файлы
* ```npm run build styles``` - скомпилировать SCSS-файлы
* ```npm run build scripts``` - собрать JS-файлы
* ```npm run build images``` - собрать изображения
* ```npm run build webp``` - сконвертировать изображения в формат ```.webp```
* ```npm run build sprites```- собрать спрайты
* ```npm run build fonts``` - собрать шрифты
* ```npm run build favicons``` - собрать фавиконки


### Страницы проекта
* страницы проекта находятся в папке ```src/templates/pages```
    * шаблон основной структуры страницы: ```src/templates/layout.html```

### Шрифты
* шрифты находятся в папке ```src/fonts```
    * используйте [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```
    * шрифты подключаются в файл ```src/styles/base/_fonts.scss```
    * сконвертировать локальные шрифты можно с помощью [данного сервиса](https://onlinefontconverter.com/)

### Изображения
* изображения находятся в папке ```src/img```
    * изображение для генерации фавиконок должно находиться в папке ```src/img/favicon``` и иметь размер не менее ```1024px x 1024px```
    * изображения автоматически конвертируются в формат ```.webp```. Подробная информация по использованию [тут](https://vk.com/@vk_it-webp).

### Сторонние библиотеки
* все сторонние библиотеки устанавливаются в папку ```node_modules```
    * для их загрузки воспользуйтеcь командой ```pnpm i package_name```
    * для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла , например:
    ```javascript
    import $ from "jquery";
    ```
    * для подключения стилевых файлов библиотек импортируйте их в файл где они используются
    * JS-файлы и стилевые файлы библиотек самостоятельно изменять нельзя

:warning: Если в вашем проекте используется несколько библиотек, которые необходимо подключать на нескольких страницах, во избежании ошибок нужно:
* по пути ```src/js``` создать создать js-файл для страницы, например, ```pageA.js```, и импортировать туда библиотеку, которая будет использоваться только на этой странице
    * аналогично проделать шаг для дополнительных страниц
* в файле ```webpack.config.js``` в точку входа добавить js-файлы страниц, пример:
```javascript
entry: {
    libs: "./src/scripts/libs.js",
    pageA: "./src/scripts/pageA.js",
    pageB: "./src/scripts/pageB.js"
}
```
* подключить скомпилированные js-файлы на необходимых страницах

