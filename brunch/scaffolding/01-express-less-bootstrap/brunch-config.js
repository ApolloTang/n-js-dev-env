exports.config = {
    files: {
        javascripts: {
            joinTo: {
                'javascripts/app.js': /^app\/scripts/,
                'javascripts/vendor.js': /^(vendor|bower_components)/
            }
        },
        stylesheets: {
            joinTo: {
                'stylesheets/app2.css': 'app/styles/main.scss',
                'stylesheets/app.css': 'app/styles/app.less',
                'stylesheets/vendor.css': /^(vendor|bower_components)/
            }
        }
    },
    paths: {
        watched: ['app', 'views']
    },
    plugins: {
        jaded: {
            staticPatterns: /^app(\/|\\)static(\/|\\)(.+)\.jade$/,
        }
    },
    server: {
        path: 'server.js',
        port: 8000
    }
};
