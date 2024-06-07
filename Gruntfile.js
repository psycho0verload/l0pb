module.exports = function(grunt) {
    // Projektkonfiguration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/*.js',
                dest: 'html/assets/js/<%= pkg.name %>.min.js'
            },
            bundle: {
                src: 'html/assets/js/<%= pkg.name %>-bundle.js',
                dest: 'html/assets/js/<%= pkg.name %>-bundle.min.js'
            }
        },
        
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'html/assets/css',
                    ext: '.min.css'
                }]
            },
            bundle: {
                files: [{
                    src: 'html/assets/css/<%= pkg.name %>-bundle.css',
                    dest: 'html/assets/css/<%= pkg.name %>-bundle.min.css'
                }]
            }
        },
        
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'html/index.html': 'src/index.html'
                }
            }
        },
        
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'node_modules/bootswatch/dist/flatly/', src: ['bootstrap.min.css'], dest: 'html/assets/css/'},
                    {expand: true, cwd: 'node_modules/bootstrap/dist/js/', src: ['bootstrap.bundle.min.js'], dest: 'html/assets/js/'},
                    // Kopiere Highlight.js Dateien
                    {expand: true, cwd: 'src/vendor/highlight.js/', src: ['highlight.min.js'], dest: 'html/assets/js/'},
                    {expand: true, cwd: 'src/vendor/highlight.js/', src: ['javascript.min.js'], dest: 'html/assets/js/'},
                    {expand: true, cwd: 'src/vendor/highlight.js/', src: ['default.min.css'], dest: 'html/assets/css/'},
                    {expand: true, cwd: 'src/vendor/highlight.js/', src: ['atom-one-dark-reasonable.min.css'], dest: 'html/assets/css/'},
                    // Kopiere Fontawsome Dateien
                    {expand: true, cwd: 'src/vendor/fontawesome/', src: ['fontawesome.min.js'], dest: 'html/assets/js/'},
                    {expand: true, cwd: 'src/vendor/fontawesome/', src: ['fontawesome.min.css'], dest: 'html/assets/css/'},
                ],
            },
        },
        
        concat: {
            options: {
                separator: '\n/* End of file */\n',
            },
            js: {
                src: ['html/assets/js/bootstrap.bundle.min.js', 'html/assets/js/fontawesome.min.js', 'html/assets/js/highlight.min.js', 'html/assets/js/javascript.min.js'],
                dest: 'html/assets/js/<%= pkg.name %>-bundle.js',
            },
            css: {
                src: ['html/assets/css/bootstrap.min.css', 'html/assets/css/fontawesome.min.css', 'html/assets/css/default.min.css', 'html/assets/css/atom-one-dark-reasonable.min.css'],
                dest: 'html/assets/css/<%= pkg.name %>-bundle.css',
            },
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'html/assets/images/'
                }]
            }
        },
        
        clean: {
            js: ['html/assets/js/*', '!html/assets/js/<%= pkg.name %>-bundle.min.js', '!html/assets/js/<%= pkg.name %>.min.js'],
            css: ['html/assets/css/*', '!html/assets/css/<%= pkg.name %>-bundle.min.css', '!html/assets/css/<%= pkg.name %>.min.css'],
            images: ['html/assets/images/*']
        }
    });

    // Diese Plugins stellt die Aufgaben bereit.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Standardaufgabe(n).
    grunt.registerTask('default', ['copy', 'uglify:build', 'cssmin:target', 'htmlmin', 'concat:js', 'concat:css', 'uglify:bundle', 'cssmin:bundle', 'clean:images', 'imagemin', 'clean:js', 'clean:css']);
};