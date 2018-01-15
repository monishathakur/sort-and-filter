module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/lodash/lodash.min.js',
            'src/pizza.module.js',
            'src/pizza.controller.js',
            'src/pizza.controller.spec.js',
            'src/pizza.service.js',
            'src/pizza.service.spec.js'
        ],
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/!(*.spec)+(.js)': ['coverage']
        },
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        autoWatch: true,

        frameworks: ['mocha', 'sinon-chai'],

        browsers: ['Chrome'],

        client: {
            mocha: {
                reporter: 'html'
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-coverage'
        ]

    });
};
