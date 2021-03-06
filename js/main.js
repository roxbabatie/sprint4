$(document).ready(function () {
    $('[name="review"]').stars();
    $( document ).ajaxStart(function() {
        $( ".gif" ).show();
    });
    $( document ).ajaxStop(function() {
        $( ".gif" ).hide();
    });
    $('#my-form').submit(onSubmit);
    $('#my-table').find('.to-sort').click(sort);

    drawTable(store);
});

var page =  1;
var pageNumber = 1;
var sortField = 'name';
var sortDir = 'asc';

function paginationPrev() {
    if (page > 1) {
        $('.pagination').text(--page +" of "+pageNumber);
        drawTable(store, page);
    }
}

function paginationNext() {
    if (page < pageNumber) {
        $('.pagination').text(++page + " of " + pageNumber);
        drawTable(store, page);
    }
}

function onSubmit() {
    var getVal = {
        name: $('#city').val(),
        stars: parseInt($('.stars').val()),
        visited: $('#cb:checkbox:checked').length > 0 ? 1 : 0
    };
    var iou = $('[name="iou"]').val();
    if (iou == '0') {
        store.add(getVal).then(
            function (data) {
                drawTable(store);
            },
            function (data) {
                alert(data);
            }
        );
    } else {
        store.update(iou, getVal).then(
            function (data) {
                drawTable(store);
            },
            function (data) {
                alert(data);
            }
        );
    };
    resetForm();
    return false;
}

function resetForm() {
    $('[name="city"]').val('');
    $('[name="visited"]').attr('checked', false);
    $('[name="iou"]').val('0');
    $('[name="review"]').val('0').change();
}

function removeRow() {
    var rowId = $(this).closest('tr').data('id');
    store.delete(rowId).then(
        function(data) {
            drawTable(store);
        },
        function (data) {
            alert(data);
        }
    );
}

function editRow() {
    var rowId = $(this).closest('tr').data('id');
    store.get(rowId).then(
        function(data) {
            $('#city').val(data.name);
            $('#cb').prop('checked', data.visited);
            $('.stars').val(data.stars).change();
            $('[name="iou"]').val(data.id);
        },
        function (data) {
            alert(data);
        }
    );
}

function attachEvents() {
    $('.remove-btn').confirm({message: 'Are you sure?', onConfirm: removeRow });
    $('.edit-btn').click(editRow);
    $('.giphy-name').click(getGiphy);
    $('.previous').click(paginationPrev);
    $('.next').click(paginationNext);
}

function drawTable(store) {
    store.getAll(page, sortDir, sortField).then(
        function (data) {
            pageNumber = data.totalPages;
            $('.pagination').text(page+" of "+pageNumber);
            $('tbody').empty();
            $.each(data.list, function (index) {
                data.list[index].stars = new Array(data.list[index].stars + 1).join('★');
                data.list[index].visited = data.list[index].visited == 1 ? 'Yes':'No';
                var sc = $('#tpl').html();
                var s = tmpl(sc, this);
                $("tbody").append(s);
            });
            attachEvents();
        },
        function (data) {
            alert(data);
        }
    );
}

function sort() {
    $('#my-table').find('span').removeAttr('class').attr("class","glyphicon glyphicon-sort");
    sortField = $(this).data('field');
    sortDir = $(this).data('dir');
    switch(sortDir) {
        case "asc":
            $(this).find('span').removeClass("glyphicon-sort").addClass("glyphicon-sort-by-attributes");
            $(this).data('dir', 'desc');
            break;
        case "desc":
            $(this).find('span').removeClass("glyphicon-sort-by-attributes").addClass("glyphicon-sort-by-attributes-alt");
            $(this).data('dir', 'asc');
            break;
    }
    drawTable(store);
}

function getGiphy() {
    var cityName = $(this).text();
    giphy.get(cityName).then(
        function(response) {
            $('.modal-body').empty();
            $('#search-term').text("Search term: "+cityName+" Results: "+(response.data).length);
            $('#myModal').modal('toggle');
            if (response.data[0]) {
                var imgObj = response.data[0];
                $('.modal-body').append('<img src='+imgObj.images.downsized_large.url+' width="400" height="300" />');
            } else {
                $('.modal-body').append('<img src="https://media.giphy.com/media/xT0GUyE9JKNNSHOnHq/giphy.gif" width="400" height="300" />');
            }
        });
}



