var offersDao = require('../dao/offersDao');

/**
 * 
 * Method responsible for retrieving multiple ofertas
 * 
 * @param {object} req - http request
 * @param {object} res - http response
 * 
 */
function find(req, res) {
    req.query = req.query || {};
    offersDao.retrieveMultiple({
        forceRefresh: true,
        from: req.query.from,
        daily: req.query.daily
    }, function (err, data) {
        if (err) {
            res.status(500).send({ code: 'ERROR', message: 'Could not find offers', detail: err })
        } else {
            res.json(data);
        }
    });
}

/**
 * 
 * Method responsible for retrieving a single offer, filtered by id
 * 
 * @param {object} req - http request
 * @param {object} res - http response
 * 
 */
function findById(req, res) {
    req.params = req.params || {};
    req.query = req.query || {};
    offersDao.retrieveOne({
        forceRefresh: false,
        id: req.params.id,
        from: req.query.from,
        daily: req.query.daily
    }, function (err, data) {
        if (err) {
            res.status(500).send({ code: 'ERROR', message: 'Could not find offers', detail: err })
        } else {
            if (data) {
                res.json(data);
            } else {
                res.status(500).send({ code: 'NOT_FOUND', message: 'Could not find offer with the given id', detail: err })
            }
        }
    });
}

module.exports = {
    find: find,
    findById: findById
}
