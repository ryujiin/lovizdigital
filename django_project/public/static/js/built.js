({
    appDir: '../js',
    baseUrl: 'static/js/',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery: 'vendor/bower_components/jquery/dist/jquery',
        backbone: 'vendor/bower_components/backbone/backbone',
        underscore: 'vendor/bower_components/lodash/dist/lodash',
        bootstrap: 'vendor/bootstrap/bootstrap',
        swig: 'vendor/swig/swig',
        owl: 'vendor/owl/owl.carousel',
        zoom: 'vendor/bower_components/jquery-zoom/jquery.zoom',
        storage: 'vendor/bower_components/jQuery-Storage-API/jquery.storageapi',
        coockie: 'vendor/coockie/jquery.cookie',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
    }
})