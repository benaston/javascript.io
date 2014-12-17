module.exports = function (grunt) {

  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
          dist: {
            options: {
              separator: ';'
            },
            src: [
              'public/javascripts/vendor/zepto.min.js',
              'public/javascripts/vendor/zepto-callbacks.js',
              'public/javascripts/vendor/zepto-deferred.js',
              'public/javascripts/vendor/smooth-scroll.js',
              'public/javascripts/vendor/debounce.js',
              'public/javascripts/vendor/underscore.js',
              'public/javascripts/vendor/_cookie.js',
              'public/javascripts/vendor/decorator.js',
              'public/javascripts/vendor/sha-1.js',
              'public/javascripts/vendor/tiny-pub-sub.js',
              'public/javascripts/vendor/moment.min.js',
              'public/javascripts/vendor/invertebrate/invertebrate.js',
              'public/javascripts/vendor/invertebrate/**.js'
            ],
            dest: 'public/javascripts/<%= pkg.name %>.js'
          },
          css: {
            src: [
              'public/stylesheets/reset/third-party-reset.css',
              'public/stylesheets/reset/wizerati-style-reset-form.css',
              'public/stylesheets/reset/wizerati-style-reset-non-form.css',
              'public/stylesheets/vendor/lucid-style-buttons.css',
              'public/stylesheets/vendor/lucid-style-form-elements.css',
              'public/stylesheets/vendor/cube.css',
              'public/stylesheets/vendor/animation.css',
              'public/stylesheets/vendor/starburst.css',
              'public/stylesheets/application/*.css',
            ],
            dest: 'public/stylesheets/<%= pkg.name %>.css'
          }
        },
        cssUrlEmbed: {
          encodeWithBaseDir: {
            options: {
              baseDir: './public/stylesheets'
            },
            files: {
              'public/stylesheets/<%= pkg.name %>.encoded.css': ['public/stylesheets/<%= pkg.name %>.css']
            }
          }
        },
        uglify: {
          options: {
            preserveComments: false
          },
          dist: {
            files: {
              'public/javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },
        cssmin: {
          css: {
            src: 'public/stylesheets/<%= pkg.name %>.encoded.css',
            dest: 'public/stylesheets/<%= pkg.name %>.min.css'
          }
        },
        replace: {
          injectCssIntoHead: {
            options: {
              patterns: [
                {
                  match: 'css',
                  replacement: '<%= grunt.file.read("public/stylesheets/' + grunt.file.readJSON('package.json').name + '.min.css") %>'
                }
              ]
            },
            files: [
              {src: ['view-templates/index.ejs'], dest: 'view-templates/_index-css-injected.ejs'},
              {src: ['view-templates/syllabus.ejs'], dest: 'views/syllabus.ejs'}
            ]
          }, injectBuildNumber: {
            options: {
              patterns: [
                {
                  match: 'build',
                  replacement: new Date().toISOString()
                }
              ]
            },
            files: [
              {src: ['view-templates/_index-css-injected.ejs'], dest: 'view-templates/_index-build-injected.ejs'}
            ]
          },
        injectInPageTemplates: {
          options: {
            patterns: [
              {
                match: 'footer',
                replacement: '<%= grunt.file.read("public/template-server/shared/templates/footer.html") %>'
              }
            ]
          },
          files: [
            {src: ['view-templates/_index-build-injected.ejs'], dest: 'views/index.ejs'}
          ]},
          injectScriptTagForDebugging: {
            options: {
              patterns: [
                {
                  match: 'javascript',
                  replacement: '<script src="/javascripts/<%= pkg.name %>.js"></script>'
                }
              ]
            },
            files: [
              {src: ['view-templates/_index-in-page-templates-injected.ejs'], dest: 'views/index.ejs'}
            ]
          }, injectJavaScriptIntoBody: {
            options: {
              patterns: [
                {
                  match: 'javascript',
                  replacement: '<script><%= grunt.file.read("public/javascripts/' + grunt.file.readJSON('package.json').name + '.min.js") %></script>'
                }
              ]
            },
            files: [
              {src: ['view-templates/_index-build-injected.ejs'], dest: 'view-templates/_index-javascript-injected.ejs'}
            ]
          }
        },
        sass: {                              // Task
          dist: {                            // Target
            options: {                       // Target options
              style: 'expanded'
            },
            files: {                         // Dictionary of files
              'main.css': 'main.scss',       // 'destination': 'source'
              'widgets.css': 'widgets.scss'
            }
          }
        },
        qunit: {
          files: ['test/**/*.html']
        },
        jshint: {
          files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
          options: {
            // options here to override JSHint defaults
            globals: {
              jQuery: true,
              console: true,
              module: true,
              document: true
            }
          }
        }
      }
  )
  ;

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat',
    'uglify',
    'cssUrlEmbed',
    'cssmin',
    'replace:injectCssIntoHead',
    'replace:injectBuildNumber',
    'replace:injectInPageTemplates'
  ]);
}
;
