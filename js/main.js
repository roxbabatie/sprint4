$(document).ready(function () {
    loading();
    pagination();
    getVal();
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
            store.update(iou, getVal()).then(
                function (data) {
                    drawTable(store);
                    resetForm();
                },
                function (data) {
                    alert(data.error); }
            );
        };
        return false;
    });
    resetForm();
    drawTable(store);
    sorting();
});

var starsPlugin = $('[name="review"]').stars();
var page =  1;
var pageNumber = 1;

function loading() {
    $( document ).ajaxStart(function() {
        $( ".gif" ).show();
    });
    $( document ).ajaxStop(function() {
        $( ".gif" ).hide();
    });
};

function pagination(){
    $('.previous').click(function(){
        if (page > 1) {
            $('.pagination').text(--page +" of "+pageNumber);
            drawTable(store, page);
        }
    });
    $('.next').click(function(){
        if (page < pageNumber) {
            $('.pagination').text(++page + " of " +pageNumber);
            drawTable(store, page);
        }
    });
};

function getVal() {
    return {
        name: $('#city').val(),
        stars: parseInt($('.stars').val()),
        visited: $('#cb:checkbox:checked').length > 0 ? 1 : 0
    }
};

function resetForm() {
    $('.form-control').val('');
    $('[name="visited"]').attr('checked', false);
    $('[name="iou"]').val('0');
    $('[name="review"]').val('0').change();
};

function removeRow() {
    $('.remove-btn').confirm({
        message: 'Are you sure?',
        onConfirm: function() {
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

function editRow() {
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

function attachEvents() {
    removeRow();
    editRow();
    pagination();
};

function drawTable(store, pg, sDir, sField) {
    sDir = typeof sDir !== 'undefined' ? sDir : 'asc';
    sField = typeof sField !== 'undefined' ? sField : 'name';
    pg = typeof pg !== 'undefined' ? pg : '1';
    store.getAll(pg, sDir, sField).then(
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

function defaultClass(thClass) {
    for (var i=0; i<=thClass.length; i++) {
        $("#"+thClass[i]).removeAttr('class');
        $("#"+thClass[i]).attr('class', 'both');
        $("#"+thClass[i]).find("span").remove();
        $("#"+thClass[i]).append( "<span></span>");
        $("#"+thClass[i]).find("span").addClass('glyphicon glyphicon-sort');
    }
};

function sorting() {
    $('#name-field').click(function(){
        defaultClass(['stars-field', 'visited-field']);
        var sortField = "name";
        var sortDir = $('#name-field').attr("class");
        getParameters(sortField, sortDir);
    });

    $('#stars-field').click(function(){
        defaultClass(['name-field', 'visited-field']);
        var sortField = "stars";
        var sortDir = $('#stars-field').attr("class");
        getParameters(sortField, sortDir);
    });

    $('#visited-field').click(function(){
        defaultClass(['name-field', 'stars-field']);
        var sortField = "visited";
        var sortDir = $('#visited-field').attr("class");
        getParameters(sortField, sortDir);
    });
};

var getParameters = function(field, direction) {
    var dir = "";
    switch(direction){
        case "both":
            dir = "asc";
            $('#'+field+'-field').removeClass('both').addClass('up');
            $('#'+field+'-field').find("span").removeClass('glyphicon-sort').addClass('glyphicon-sort-by-attributes');
            break;
        case "up":
            dir = "desc";
            $('#'+field+'-field').removeClass('up').addClass('down');
            $('#'+field+'-field').find("span").removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
            break;
        case "down":
            dir = "asc";
            $('#'+field+'-field').removeClass('down').addClass('up');
            $('#'+field+'-field').find("span").removeClass('glyphicon-sort-by-attributes-alt').addClass('glyphicon-sort-by-attributes');
            break;
    }
    drawTable(store, page, dir, field);
};

