var store = (function () {
    var id =  1;
    var data = [
        {
            id: 1,
            city: 'Bucharest',
            stars: 3,
            visited: true
        }
    ];
    //public
    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
            //return data;
        },
        add: function (item) {
            return new Promise(function (resolve, reject) {
                data.push(item);
                item.id = ++id;
                resolve(data);
            });
        },
        update: function (id, updateData) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        data[index] = updateData;
                        resolve(data);
                    }
                });
            });
        },
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                $.each(data, function (index) {
                    if (this.id == id) {
                        data.splice(index, 1);
                        resolve(data);
                    }
                });
            });
        }
    };
})();