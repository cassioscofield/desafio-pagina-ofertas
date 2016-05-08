var offersController = require('./offersController');

module.exports = function (app) {
    
    app.get('/api/offers', function (req, res) {
        console.log('/api/offers');
        offersController.find(req, res);
    });
    
    app.get('/api/offers/:id', function (req, res) {
        console.log('/api/offers/:id', req.params.id);
        offersController.findById(req, res);
    });

    app.get('*', function (req, res) {
        var path = require('path');
        res.sendFile(path.resolve(__dirname, '..') + '/public/index.html');
    });
    
};
