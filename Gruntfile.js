module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: './src/js',
                    out: 'build/js/main.js',
                    name: 'main',
                    mainConfigFile: './src/js/main.js',
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:')
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }

                        done();
                    }
                }
            }
        },

        lesslint: {
            src: ['src/less/**/*.less']
        },

        less: {
            development: {
                files: {
                    "src/css/main.css": "src/less/main.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "build/css/main.css": "src/less/main.less"
                }
            }
        },

        jshint: {
            all:['src/js/*.js']
        },

        devserver: {
            options: {
                'type': 'http',
                'port': 8888,
                'base': 'src',
                'cache': 'no-cache',
                'async': true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-devserver');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lesslint');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'lesslint', 'less:production', 'requirejs']);
};
