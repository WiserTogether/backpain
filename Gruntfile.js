module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: './src/js',
                    out: 'src/build/js/main.js',
                    name: 'main',
                    mainConfigFile: './src/js/main.js',
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
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
                    "src/build/css/main.css": "src/less/main.less"
                }
            }
        },
        watch: {
          scripts: {
            files: 'src/js/**/*.js',
            tasks: ['jshint','requirejs'],
            options: {
              interrupt: true
            }
          },
          templates: {
            files: 'src/js/**/*.hbs',
            tasks: ['jshint','requirejs'],
            options: {
              interrupt: true
            }
          },
          stylesheets: {
            files: ['src/less/*.less'],
            tasks: ['less'],
            options: {
              interrupt: true
            }
          }
        },
        jshint: {
            all:['src/js/**/*.js'],
            options: {
                bitwise: true,
                browser: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                jquery: true,
                latedef: true,
                newcap: true,
                noarg: true,
                node: true,
                nonew: true,
                plusplus: true,
                regexp: true,
                trailing: true,
                undef: true,
                globals: {
                    define: true,
                    require: true
                }
            }
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
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('runNode', function () {
        grunt.util.spawn({
          cmd: 'node',
          args: ['./node_modules/nodemon/nodemon.js', '--debug', 'index.js'],
          opts: {
            stdio: 'inherit'
          }
        }, function () {
          grunt.fail.fatal(new Error("nodemon quit"));
        });
    });

    grunt.registerTask('compile', ['jshint', 'requirejs', 'less']);

    // Run the server and watch for file changes
    grunt.registerTask('server', ['runNode','compile', 'watch']);

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'lesslint', 'less:production', 'requirejs']);
};
