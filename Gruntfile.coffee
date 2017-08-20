matchdep = require('matchdep')

module.exports = (grunt) ->
  devTasks = undefined
  prodTasks = undefined

  # Flags from command line options.
  IS_PRODUCTION = grunt.cli.tasks[0] == 'production'

  grunt.initConfig
    app:
      app: './'
      dist: '_prod'
      baseurl: ''
    jekyll:
      options:
        config: '_config.yml,_config_prod.yml'
        src: './app'
      dist: options: dest: '_prod/'
      server: options:
        config: '_config.yml'
        dest: '_site/'
    connect:
      options:
        port: 9000
        livereload: 2500
        hostname: 'localhost'
      livereload: options:
        open: target: 'http://localhost:9000/'
        base: [
          '_site'
        ]
      dist: options:
        open: target: 'http://localhost:9000/'
        base: [
          '_prod'
        ]
    sass:
      options:
        loadPath: [
          'bower_components/bourbon/app/assets/stylesheets'
          'bower_components/toddy/core'
          'stylesheets/'
        ]
        quiet: true
        style: 'compact'
        sourcemap: 'none'
      build:
        src: 'stylesheets/style.scss'
        dest: 'stylesheets/style.css'
    scsslint:
      allFiles: 'stylesheets/**/*.scss'
      options:
        bundleExec: false
        config: '.scss-lint.yml'
        colorizeOutput: true
    postcss:
      options:
        if IS_PRODUCTION == true
          map: false
          processors: [
            require('pixrem')()
            require('autoprefixer')(browsers: '> 1%, last 5 versions')
            require('postcss-flexibility')()
            require('cssnano')(
              discardUnused: fontFace: false
              normalizeCharset: true
              mergeLonghand: true)
          ]
        else
          map: true
          processors: [
            require('pixrem')()
            require('autoprefixer')(browsers: '> 1%, last 5 versions')
            require('postcss-flexibility')()
          ]
      dist:
        src: 'stylesheets/style.css'
        dest:
          if IS_PRODUCTION == true
            '_prod/assets/style.css'
          else
            '_site/assets/style.css'
    modernizr: dist:
      'crawl': false
      'customTests': []
      'dest': 'scripts/modernizr.js'
      'tests': [
        'touchevents'
        'flexbox'
        'flexwrap'
        'csscalc'
        'svg'
        'history'
      ]
      'options': [
        'addTest'
        'html5shiv'
        'setClasses'
      ]
      'uglify': true
    bower_concat: all:
      dest: 'js': 'scripts/plugins/bower.js'
      exclude: [
        'jquery'
        'modernizr'
      ]
    copy:
      main:
        expand: true,
        cwd: 'bower_components/jquery/dist/'
        src: 'jquery.min.js'
        dest:
          if IS_PRODUCTION == true
            '_prod/assets/js'
          else
            '_site/assets/js/'
        ftiler: 'isFile'
    concat:
      options: separator: ';\n'
      dist:
        src: [
          'scripts/modernizr.js'
          'scripts/plugins/theme-breakpoints.js'
          'scripts/plugins/lazysizes-config.js'
          'scripts/plugins/history.js'
          'scripts/plugins/ajaxify.js'
          'scripts/plugins/bower.js'
          'scripts/plugins/ls.bgset.min.js'
          'scripts/plugins/packery.2.1.1.js'
          'scripts/plugins/ep-googlemap.js'
          'scripts/plugins/ep-scrollupheader.js'
          'scripts/plugins/plyr-controls.js'
          'scripts/modules/*.js'
          'scripts/scripts.js'
        ]
        dest: 'scripts/main.js'
    uglify:
      if IS_PRODUCTION == true
        options:
          mangle: true
          compress: true
          report: 'min'
        dist: files: '_prod/assets/js/main.min.js': [ 'scripts/main.js' ]
      else
        options:
          beautify: false
          mangle: false
          compress: false
          report: 'min'
        dist: files: '_site/assets/js/main.min.js': [ 'scripts/main.js' ]
    jshint:
      options:
        jshintrc: true
        curly: true
        eqeqeq: true
        eqnull: true
        browser: true
        globals:
          jQuery: true
      src: [ 'scripts/modules/*.js', 'scripts/scripts.js']
    watch:
      jekyll:
        files: ['app/**/*']
        tasks: ['jekyll:server']
      scss:
        files: [ 'stylesheets/**/*.scss' ]
        tasks: [ 'css' ]
        options: interrupt: true
      scripts:
        files: [ 'scripts/**/*.js' ]
        tasks: [
          'newer:concat'
          'jshint'
          'uglify'
        ]
      livereload:
        files: [
          '_site/assets/js/main.min.js'
          '_site/**/*.html'
        ]
        options: livereload:
          host: 'localhost'
          port: '2500'
    browserSync:
      bsFiles: src: [ '_site/assets/style.css' ]
      options:
        proxy: 'http://localhost:9000'
        open: false
        watchTask: true
        logConnections: true
        logFileChanges: true
        notify: false
        ui: false
        scriptPath: (path) ->
          'localhost:2400' + path
  matchdep.filterDev('grunt-*').forEach grunt.loadNpmTasks
  grunt.registerTask 'css', [
    'sass'
    'postcss'
  ]
  devTasks = [
    'jekyll:server'
    'css'
    'modernizr'
    'copy'
    'bower_concat'
    'concat'
    'jshint'
    'uglify'
    'connect:livereload'
    'browserSync'
    'watch'
  ]
  # Default grunt task: `grunt`
  grunt.registerTask 'default', devTasks
  prodTasks = [
    'jekyll:dist'
    'css'
    'modernizr'
    'copy'
    'bower_concat'
    'concat'
    'uglify'
    'preprocess:build'
  ]
  # Production task: `grunt prod`
  grunt.registerTask 'production', prodTasks
  # Validate code task: `grunt validate-code`
  grunt.registerTask 'validate-code', [
    'jshint'
    'scsslint'
  ]
  return

# ---
# generated by js2coffee 2.2.0