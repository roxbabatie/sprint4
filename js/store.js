var store = (function () {
    var id =  0;
    var data = [];
    //public
    return {
        get :  function(id) {
            return new Promise(function (resolve, reject) {
                var entriesUrl = "http://server.godev.ro:8080/api/roxanab/entries/"+id;
                var getSettings = {
                    type: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, getSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.error(function(d) {
                    reject(d.responseJSON);
                });
            });
        },
        getAll: function (page) {
            return new Promise(function (resolve, reject) {
                var entriesUrl = "http://server.godev.ro:8080/api/roxanab/entries?page="+page;
                var getSettings = {
                    type: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, getSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.error(function(d) {
                    reject(d.responseJSON);
                });
            });
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                var entriesUrl = "http://server.godev.ro:8080/api/roxanab/entries";
                var postSettings = {
                    type: 'POST',
                    data: JSON.stringify(item),
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, postSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.error(function(d) {
                    reject(d.responseJSON);
                });
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                var entriesUrl = "http://server.godev.ro:8080/api/roxanab/entries/"+id;
                var putSettings = {
                    type: 'PUT',
                    data: JSON.stringify(updateData),
                    headers: {'Content-Type': 'application/json' }
                };
                var ajaxResult = $.ajax(entriesUrl, putSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.error(function(d) {
                    reject(d.responseJSON);
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                var entriesUrl = "http://server.godev.ro:8080/api/roxanab/entries/"+id;
                var deleteSettings = {
                    type: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl, deleteSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.error(function(d) {
                    reject(d.responseJSON);
                });
            });
        }
    };
})();