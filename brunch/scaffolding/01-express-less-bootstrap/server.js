exports.startServer = function (port, path, callback) {
    "use strict";

    var express = require('express');
    var fs = require('fs');
    var app = express();
    app.use(express.static(__dirname + '/public'));
    app.set('view engine', 'jade');


    app.get('/', function (req, res) {
        res.render('test');
    });

    var files = fs.readdirSync('views');
    var fileNames = files.map(function (f) {return f.replace(/\..*/g, '')});

    var regexStr = '^/(' + fileNames.join('|') + ')';
    var regex = new RegExp(regexStr);

    app.get(regex, function (req, res) {
        var template = req.params[0];
        res.render(template, req.query);
    });

    app.listen(port);

    callback();
    return app;
};
