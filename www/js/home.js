window.addEventListener('load', function() {
    var sqlService = SQLiteStorageService();
    var deleteAllBtn = $('.trash-btn');

    sqlService.getPropertyList().done(function(properties) {
        console.log("Values = ", properties);
        showList(properties);
    });


    var showList = function(properties) {
        var listEl = $('#home_list');
        listEl.html('');

        if (properties.length) {
            deleteAllBtn.show();

            var list = '<ul>'

            for (var i = 0; i < properties.length; i++) {
                list += '<li class="list-item" data-property-id="' + properties[i].id + '">' +
                    '<div class="name-wrapper"><span class="property-name">' +
                    properties[i].name + '</span>' +
                    '<span><img src="../img/location.jpg">' + properties[i].location + '</span>' +
                    '</div><div class="price-wrapper">' +
                    '<span>' + properties[i].price + '</span>' +
                    '<span>' + properties[i].type + '</span>' +
                    '</div></li>';
            }
            list += '</ul>';
        } else {
            deleteAllBtn.hide();

            var list = '<div class="no-result">You don\'t have any property added. Please click on the "+" button to add property.</div>';
        }

        listEl.append(list);
    };

    var editItem = function(e) {
        var itemId = $(this).data('property-id');
        window.location = 'add-form.html#' + itemId;
    };

    $('body').on('click', '.list-item', editItem);

    deleteAllBtn.on('click', function() {
        $('#remove_all_property').modal('show');
    });

    $('.delete-all-property-confirmation').on('click', function() {
        sqlService.deleteAllProperties().done(function() {
            $('#remove_all_property').modal('hide');
            window.location = 'home.html';
        });
    });


}, false);