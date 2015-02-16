var _ = require('lodash'),
    $ = require('jquery');

_.uniq([1,2,3,6,8,9,0,4,6,7,4,6,5,7,4,6,7,4,4,5,6,4,6,7,5,4,2,6,7,2,5])
    .forEach(function(i){
        $('#items').append('<li>' + i + '</li>');
    console.log(i);
    });
