'use strict';

// A promise can be:
// fulfilled
//     The action relating to the promise succeeded
// rejected
//     The action relating to the promise failed
// pending
//     Hasn't fulfilled or rejected yet
// settled
//     Has fulfilled or rejected

(function() {

    // -- Creates a new Promise
    var promise = new Promise(function(resolve, reject) {
        // do a thing, possibly async,
        setTimeout(function() {
            var resolved = true;
            if (resolved) {
                resolve('Stuff worked!');
            } else {
                reject(Error('It broke'));
            }
        }, 1000);
    });

    // -- use promise
    promise
        .then(function(result) {
            console.log(result); // 'Stuff worked!'
        }, function(err) {
            console.log(err); // Error: 'It broke'
        });

    // -- chaining
    promise
        .then(function(result) {
            return result;
        })
        .then(function(result) {
            return result + ' let`s continue';
        })
        .then(function(result) {
            console.log(result);
        }, function(err) {
            console.log(err); // Error: 'It broke'
        });

    // -- Queuing asynchronous actions
    promise
        .then(function(result) {
            return new Promise(function(fulfill) {
                setTimeout(function() {
                    fulfill(result + 'now let`s continue');
                }, 1000);
            });
        })
        .then(function(result) {
            console.log(result);

        }, function(err) {
            console.log(err);
        });
}());
