$(document).ready(function () {
    var drawTable = function (store) {
        store.getAll().then(function (data) {
            $('tbody').empty();
            $.each(data, function(){
                var sc = $('#tpl').html();
                var s = tmpl(sc, this);
                $("tbody").append(s);
            });
            attachEvents();
        });
    };

    drawTable(store);

    $('#my-form').submit(function () {
        store.add(getVal()).then(function (data) {
            drawTable(store);
            console.log(data);
        });
        return false;
    });

    var getVal = function() {
        return {
            city: $('#city').val(),
            stars: 3,
            visited: $('#cb:checkbox:checked').length > 0
        }
    };

    var attachEvents = function() {
        $('.remove-btn').click(function (){
            var rowId = $(this).closest('tr').data('id');
            store.delete(rowId).then(function() {
               drawTable(store);
           });
        });
    }
});



