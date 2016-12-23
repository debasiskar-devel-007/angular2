/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      'npm4:': '/',
      //'npm:': 'https://unpkg.com/',
      'npm1:': 'https://unpkg.com/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',


      //// angular bundles
      /*'@angular/core': 'npm1:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm1:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm1:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm1:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm1:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/forms': 'npm1:@angular/forms/bundles/forms.umd.js',*/

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      "ng2-modal": "node_modules/ng2-modal",
      "ng2-popover": "node_modules/ng2-popover",
      'angular2-cookie':'npm:angular2-cookie',
      'ng2-pagination':'npm:ng2-pagination',
      "ng2-ckeditor": "npm:ng2-ckeditor",
      'ng2-uploader': 'npm:ng2-uploader',
      //'ng2-typeahead':              'node_modules/ng2-typeahead',
      //'angular2-clipboard': 'npm:angular2-clipboard',
      //'clipboard': 'npm1:clipboard/dist/clipboard.js',
      //'angular2-clipboard': 'https://unpkg.com/:angular2-clipboard',
      'clipboard': 'clipboard.js',
      //'clipboard': 'https://cdn.rawgit.com/zenorocha/clipboard.js/master/dist/clipboard.js',



      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      "ng2-modal": { "main": "index.js", "defaultExtension": "js" },
      "ng2-popover": { "main": "index.js", "defaultExtension": "js" },
      //'ng2-typeahead':              { main: 'ng2-typeahead.js', defaultExtension: 'js' },
      'angular2-cookie': {
        main: './core.js',
        defaultExtension: 'js'
      },
      'ng2-pagination':{
        "main": "index.js", "defaultExtension": "js"
      },
      "ng2-ckeditor": {
        "main": "lib/index.js",
        "defaultExtension": "js",
      },
      'ng2-uploader': {
        main: 'ng2-uploader.js',
        defaultExtension: 'js'
      },
      'angular2-clipboard': {
        main: 'index.js',
        defaultExtension: 'js'
      },

      /*'clipboard':{
        defaultExtension: 'js'
      }*/

    }
  });
})(this);
