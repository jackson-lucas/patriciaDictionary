module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      smash: {
        bundle: {
            src: './source/js/main.js',
            dest: './<%= pkg.name %>.js'
        },
      },
    })
    
    grunt.loadNpmTasks('grunt-smash');
};
