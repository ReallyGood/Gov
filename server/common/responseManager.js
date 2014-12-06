/**
 * Created by Adir on 06/12/2014.
 */
function responseManager(req, res, promise) {
    promise.then(
        // success
        function(result) {
            res.send(result);
        },
        // failure
        function(errorCode) {
            res.sendStatus(errorCode);
        }
    );
}

module.exports = responseManager;
