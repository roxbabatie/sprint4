var giphy = (function() {
    return {
        get: function (name) {
            return new Promise(function (resolve, reject) {
                var entriesUrl = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC";
                var getSettings = {
                    type: 'GET',
                    data: JSON.stringify(name),
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, getSettings);
                ajaxResult.done(function (d) {
                    resolve(d);
                });
                ajaxResult.error(function (d) {
                    reject(d);
                });
            });
        }
    }
})();



