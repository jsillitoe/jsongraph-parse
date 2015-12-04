/**
 * Copy files and folders.
 *
 * https://www.npmjs.org/package/grunt-contrib-copy
 */

module.exports = {

    dist: {
        files:[
            {expand: true, cwd:'build/', src: ['*'], dest: 'dist/'}
        ]
    }

};
