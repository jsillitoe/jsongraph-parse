/**
 * Copy files and folders.
 *
 * https://www.npmjs.org/package/grunt-contrib-uglify
 */

module.exports = {
  dist: {
    files: {
      'dist/jsongraph-parse.min.js': ['dist/jsongraph-parse.js']
    }
  }
};
