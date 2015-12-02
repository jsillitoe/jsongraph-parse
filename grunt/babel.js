/**
 * Use next generation JavaScript, today
 *
 * https://www.npmjs.org/package/grunt-babel
 */

module.exports = {
    options: {
        presets: ["es2015"]
    },

    build:{
        files:[{
            expand: true,
            cwd: 'src',
            src: ['*.js'],
            dest: 'build/modules',
            ext: ".js"
        }]
    }

};