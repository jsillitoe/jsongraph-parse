/**
 * Grunt task for node-browserify.
 *
 * https://www.npmjs.com/package/grunt-browserify
 */

module.exports = {
    build: {
        options: {

        },
        files: {
            'build/jsongraph-parse.js': ['src/main.js']
        }
    }
};