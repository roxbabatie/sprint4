$(document).ready(function () {
    loading();
    var starsPlugin = $('[name="review"]').stars();
    var page =  1;
    var pageNumber = 1;
    var pagination = function() {
        $('.previous').click(function(){
            if (page > 1) {
                $('.pagination').text(--page+" of "+pageNumber);
                drawTable(store);
            }
        });
        $('.next').click(function(){
            if (page < pageNumber) {
                $('.pagination').text(++page + " of " + pageNumber);
                drawTable(store);
            }
        });
    }

    var drawTable = function (store) {
        store.getAll(page).then(
            function (data) {
            pageNumber = data.totalPages;
            $('.pagination').text(page+" of "+pageNumber);
            $('tbody').empty();
            $.each(data.list, function (index) {
                data.list[index].stars = starsPlugin.activeStars(data.list[index].stars);
                var sc = $('#tpl').html();
                var s = tmpl(sc, this);
                $("tbody").append(s);
            });
            attachEvents();
        },
            function (data) {
                alert(data.error);
            }
        );
    };

    drawTable(store);

    var resetForm = function() {
        $('.form-control').val('');
        $('[name="visited"]').attr('checked', false);
        $('[name="iou"]').val('0');
        $('[name="review"]').val('0').change();
    }

    $('#my-form').submit(function () {
        var iou = $('[name="iou"]').val();
        if (iou == '0') {
            store.add(getVal()).then(
                function (data) {
                    drawTable(store);
                    resetForm();
                },
                function (data) {
                    alert(data.error);
                }
            );
        } else {
            index = iou;
            store.update(index, getVal()).then(
                function (data) {
                    drawTable(store);
                    resetForm();
                },
                function (data) {
                    alert(data.error);
                }
            );
        };
        return false;
    });

    var getVal = function() {
        return {
            name: $('#city').val(),
            stars: parseInt($('.stars').val()),
            visited: $('#cb:checkbox:checked').length > 0 ? 1 : 0
        }
    };

    var removeRow = function() {
        $('.remove-btn').confirm({
            message: 'Are you sure?',
            onConfirm: function() {
                console.log(this, 'yes!');
                var rowId = $(this).closest('tr').data('id');
                store.delete(rowId).then(
                    function() {
                        drawTable(store);
                },
                    function() {
                        alert(data.error);
                    }
                );
            }
        });
    };

    var editRow = function() {
        $('.edit-btn').click(function() {
            var rowId = $(this).closest('tr').data('id');
            store.get(rowId).then(
                function(data) {
                    $('#city').val(data.name);
                    $('#cb').prop('checked', data.visited);
                    $('.stars').val(data.stars).change();
                    $('[name="iou"]').val(data.id);
                },
                function (data) {
                    alert(data.error);
                }
            );
        });
    };

    var attachEvents = function() {
        removeRow();
        editRow();
    };

});

var loading = function() {
    $( document ).ajaxStart(function() {
        $( ".gif" ).show();
    });
    $( document ).ajaxStop(function() {
        $( ".gif" ).hide();
    });
}

