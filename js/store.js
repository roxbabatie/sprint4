var store = (function () {
    var entriesUrl = "http://server.godev.ro:8080/api/roxanab/entries";
    var errorHandler = function(reject) {
        return function (xhr) {
            if(xhr.status == 409) {
                reject(xhr.responseJSON.error);
            } else {
                alert('An unknown error occurred');
            }
        };
    };
    //public
    return {
        get :  function(id) {
            return new Promise(function (resolve, reject) {
                var getSettings = {
                    type: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl+"/"+id, getSettings);
                ajaxResult.done(function(d) {
                    resolve(d);
                });
                ajaxResult.error(function(d) {
                    reject(d.responseJSON);
                });

            });
        },
        getAll: function (page, sortDir, sortField) {
            return new Promise(function (resolve, reject) {
                var getSettings = {
                    type: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl+"?sortDir="+sortDir+"&sortField="+sortField+"&page="+page, getSettings);
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
                var putSettings = {
                    type: 'PUT',
                    data: JSON.stringify(updateData),
                    headers: {'Content-Type': 'application/json' }
                };
                var ajaxResult = $.ajax(entriesUrl+"//"+id, putSettings);
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
                var deleteSettings = {
                    type: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                };
                var ajaxResult = $.ajax(entriesUrl+"/"+id, deleteSettings);
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