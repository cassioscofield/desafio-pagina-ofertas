var assert = require('assert'),
rewire = require('rewire'),
txt = '[{	"id": 0,	"title": "Hotel The Mirage (Hotel & Casino)",	"location": "Las Vegas, USA",	"description": "Aéreo de várias cidades + Hotel em Vegas",	"photos": ["images/photo6.jpg", "images/photo8.jpg", "images/photo7.jpg", "images/photo9.jpg", "images/photo11.jpg", "images/photo3.jpg", "images/photo2.jpg", "images/photo1.jpg"],	"options": [{		"id": 2,		"title": "Noites em Vegas e Albuquerque",		"description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",		"from": ["Brasilia", "Campo Grande"],		"daily": 5,		"price": 2380	}, {		"id": 3,		"title": "Noites em Vegas e Albuquerque",		"description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",		"from": ["Brasilia", "Salvador"],		"daily": 8,		"price": 2580	}]}, {	"id": 1,	"title": "Hotel The Mirage (Hotel & Casino)",	"location": "Las Vegas, USA",	"description": "Aéreo de várias cidades + Hotel em Vegas",	"photos": ["images/photo6.jpg", "images/photo8.jpg", "images/photo7.jpg", "images/photo9.jpg", "images/photo11.jpg", "images/photo3.jpg", "images/photo2.jpg", "images/photo1.jpg"],	"options": [{		"id": 2,		"title": "Noites em Vegas e Albuquerque",		"description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",		"from": ["Brasilia", "Campo Grande"],		"daily": 12,		"price": 2280	}]}]';

describe('offersDao\n', function() {

    beforeEach(function () {
        offersDao =  rewire('../api/offersDao');
    });
    
    describe('retrieveMultiple', function() {
    
        it('should retrieve multiple offers', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback(null, txt);
                }
            });
            
            offersDao.retrieveMultiple({}, function (err, data) {
                assert(err === null);
                assert(data.length === 2);
                done();
            });
            
        });
        
        it('should return error in case of filesystem error', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback('ERROR_FS', null);
                }
            });
            
            offersDao.retrieveMultiple({}, function (err, data) {
                assert(err === 'ERROR_FS');
                assert(data === null);
                done();
            });
            
        });
    
    });
    
    describe('retrieveOne', function() {
    
        it('should retrieve single offer with all options', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback(null, txt);
                }
            });
            
            offersDao.retrieveOne({id: '0'}, function (err, data) {
                assert(err === null);
                assert(data.id === 0);
                assert(data.options.length === 2);
                done();
            });
            
        });
        
        it('should retrieve single offer with options filtered by daily', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback(null, txt);
                }
            });
            
            offersDao.retrieveOne({id: '0', daily: '5'}, function (err, data) {
                assert(err === null);
                assert(data.id === 0);
                assert(data.options.length === 1);
                done();
            });
            
        });
        
        it('should retrieve single offer with options filtered by from', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback(null, txt);
                }
            });
            
            offersDao.retrieveOne({id: '0', from: 'Salvador'}, function (err, data) {
                assert(err === null);
                assert(data.id === 0);
                assert(data.options.length === 1);
                done();
            });
            
        });
        
        it('should retrieve single offer with options filtered by daily and from', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback(null, txt);
                }
            });
            
            offersDao.retrieveOne({id: '0', daily: '5', from: 'Salvador'}, function (err, data) {
                assert(err === null);
                assert(data.id === 0);
                assert(data.options.length === 0);
                done();
            });
            
        });
        
        it('should return error in case of filesystem error', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback('ERROR_FS', null);
                }
            });
            
            offersDao.retrieveOne({id: '1'}, function (err, data) {
                assert(err === 'ERROR_FS');
                assert(data === null);
                done();
            });
            
        });
        
        it('should return null if no match is found', function(done) {
            
            offersDao.__set__('fs', {
                readFile: function (file, format, callback) {
                    callback(null, txt);
                }
            });
            
            offersDao.retrieveOne({id: '2'}, function (err, data) {
                assert(err === null);
                assert(data === null);
                done();
            });
            
        });
    
    });

});
