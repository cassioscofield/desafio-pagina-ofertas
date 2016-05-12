var fs = require('fs');
var offers = null;

/**
 * 
 * Fetches the offers from the txt file and parses it to object format
 * 
 * @param {object} options - specific options (origin, days)
 * @param {function} callback - callback method
 * 
 */
function parseOffers(options, callback) {
    
    if (options && options.forceRefresh === false && offers) {
        callback(null, ofertas);
    } else {
        fs.readFile('offer.txt', 'utf8', function (err, data) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, JSON.parse(data));
        }); 
    }
    
}

/**
 * 
 * Filters options within an offer by from AND daily
 * 
 * @param {object} options - specific options (data, from, daily)
 * @param {object} offer - offer to be sorted
 * 
 */
function filterOptions(options, offer) {
    
    // Cloning offer
    var filteredOffer = JSON.parse(JSON.stringify(offer));
    
    if (options && options.from && options.daily) {
        // Filter by from and daily
        filteredOffer.options = [];
        for (var j=0;offer.options && j<offer.options.length;j++) {
            if (offer.options[j].from && offer.options[j].from.length && offer.options[j].from.indexOf(options.from.toString()) > -1 && offer.options[j].daily === Number(options.daily)) {
                filteredOffer.options.push(offer.options[j]);
            }
        }
    }
    else if (options && options.from) {
        // Filter by from (origin city)
        filteredOffer.options = [];
        for (var j=0;offer.options && j<offer.options.length;j++) {
            if (offer.options[j].from && offer.options[j].from.length && offer.options[j].from.indexOf(options.from.toString()) > -1) {
                filteredOffer.options.push(offer.options[j]);
            }
        }
    } else if (options && options.daily) {
        // Filter by daily (number of days)
        filteredOffer.options = [];
        for (var j=0;offer.options && j<offer.options.length;j++) {
            if (offer.options[j].daily === Number(options.daily)) {
                filteredOffer.options.push(offer.options[j]);
            }
        }
    }
    
    return filteredOffer;
    
}

/**
 * 
 * Order options within an offer by price
 * 
 * @param {object} options - specific options (price)
 * @param {object} offer - offer to be sorted
 * 
 */
function orderOptions(options, offer) {
    
    // Cloning offer
    var orderedOffer = JSON.parse(JSON.stringify(offer));
    
    if (options && options.orderBy === 'price') {
        // Filter by from and daily
        orderedOffer.options.sort(function(a, b){
            if (a.price && b.price) {
                return a.price-b.price;
            }
            return -1;
        });
    }
    
    return orderedOffer;
    
}

/**
 * 
 * Fetches the first offer meeting the criteria
 * 
 * @param {object} options - specific options (id)
 * @param {function} callback - callback method
 * 
 */
function retrieveOne(options, callback) {
    
    parseOffers(options, function (err, data) {
        if (err) {
            callback(err, null);
            return;
        } else if (data) {
            for (var i=0;i<data.length;i++) {
                if (options && options.id) {
                    if (data[i].id.toString() === options.id) {
                        filteredOffer = filterOptions(options, data[i]);
                        orderedOffer = orderOptions(options, filteredOffer);
                        callback(null, orderedOffer);
                        return;
                    }
                } 
            }
        }
        
        callback(null, null);
    });
    
}

/**
 * 
 * Fetches all offers meeting the criteria.
 * If no criteria is met, an empty list is returned.
 * 
 * @param {object} options - specific options
 * @param {function} callback - callback method
 * 
 */
function retrieveMultiple(options, callback) {
    
    parseOffers(options, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
    
}

module.exports = {
    retrieveMultiple: retrieveMultiple,
    retrieveOne: retrieveOne
}
