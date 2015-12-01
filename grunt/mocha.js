/**
 * Grunt task for running client-side Mocha specs in PhantomJS
 *
 * https://www.npmjs.org/package/grunt-mocha
 */

module.exports = {
    all: {
        options: {
            run: true,
            urls: [
                'http://localhost:9001/tests/tests.html'
            ],
            log: true
        }
    }
};

