var assert = require('assert'),
rewire = require('rewire'),
offersController, 
offersDao,
req = {},
res = {},
offer = {},
offers = [{}, {}];

describe('offersController\n', function() {

    beforeEach(function () {
        offersController =  rewire('../api/offersController');
    });
    
    describe('find', function() {
    
        it('should find all offers and return 200', function(done) {
            
            offersController.__set__('offersDao', {
                retrieveMultiple: function (options, callback) {
                    callback(null, offers);
                }
            });
            
            res.status = function (status) {
                assert(status === 200);
                return res;
            };
            
            res.send = function (data) {
                assert(data);
                done();
            };
            
            offersController.find(req, res);
            
        });
        
        it('should return 500 in case of error', function(done) {
            
            offersController.__set__('offersDao', {
                retrieveMultiple: function (options, callback) {
                    callback('ERROR_DAO', null);
                }
            });
            
            res.status = function (status) {
                assert(status === 500, status);
                return res;
            };
            
            res.send = function (data) {
                assert(data.code === 'ERROR');
                assert(data.message === 'Could not find offers');
                assert(data.detail === 'ERROR_DAO');
                done();
            };
            
            offersController.find(req, res);
            
        });
    
    });
    
    describe('findById', function() {
    
        it('should find one offer and return 200', function(done) {
            
            offersController.__set__('offersDao', {
                retrieveOne: function (options, callback) {
                    callback(null, offer);
                }
            });
            
            res.status = function (status) {
                assert(status === 200);
                return res;
            };
            
            res.send = function (data) {
                assert.equal(data, offer);
                done();
            };
            
            offersController.findById(req, res);
            
        });
        
        it('should return 500 in case of error', function(done) {
            
            offersController.__set__('offersDao', {
                retrieveOne: function (options, callback) {
                    callback('ERROR_DAO', null);
                }
            });
            
            res.status = function (status) {
                assert(status === 500);
                return res;
            };
            
            res.send = function (data) {
                assert(data.code === 'ERROR');
                assert(data.message === 'Could not find offers');
                assert(data.detail === 'ERROR_DAO');
                done();
            };
            
            offersController.findById(req, res);
            
        });
        
        it('should return 404 in case of empty response', function(done) {
            
            offersController.__set__('offersDao', {
                retrieveOne: function (options, callback) {
                    callback(null, null);
                }
            });
            
            res.status = function (status) {
                assert(status === 404);
                return res;
            };
            
            res.send = function (data) {
                assert.equal(data.code, 'NOT_FOUND');
                assert.equal(data.message, 'Could not find offer with the given id');
                done();
            };
            
            offersController.findById(req, res);
            
        });
        
    });

});
