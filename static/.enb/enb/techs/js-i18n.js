/**
* js-i18n
* =======
*
* Собирает `js`-файл по deps'ам и добавляет в результат таргет `?.lang.<язык>.js`. Используется с технологией `i18n-lang-js`.
*
* **Опции**
*
* * *String* **target** — Результирующий таргет. По умолчанию — `?.{lang}.js`.
* * *String* **lang** — Язык, для которого небходимо собрать файл.
* * *String* **jsTarget** — Исходный js файл. По умолчанию — `?.js`.
* * *String* **allLangTarget** — Исходный файл с ядром локализации. По умолчанию — `?.lang.all.js`.
* * *String* **langTarget** — Исходный файл с локализацией. По умолчанию — `?.lang.{lang}.js`.
*
* **Пример**
*
* ```javascript
* nodeConfig.addTech([ require('./enb/techs/js-i18n'), { lang: '{lang}' } ]);
* ```
*/
module.exports = require('enb/lib/build-flow').create()
    .name('js-i18n')
    .target('target', '?.{lang}.js')
    .defineRequiredOption('lang')
    .useSourceFilename('jsTarget', '?.js')
    .useSourceFilename('allLangTarget', '?.lang.all.js')
    .useSourceFilename('langTarget', '?.lang.{lang}.js')
    .justJoinFilesWithComments()
    .createTech();