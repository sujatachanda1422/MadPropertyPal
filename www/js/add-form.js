window.addEventListener('load', function() {
    var sqlService = SQLiteStorageService();

    var formEl = $('.needs-validation');
    var removeModal = $('#remove_property');
    var isEditView = window.location.hash;

    if (isEditView) {
        var itemId = Number(isEditView.replace('#', ''));
    }

    Array.prototype.filter.call(formEl, function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            form.classList.add('was-validated');

            if (!form.checkValidity()) {
                return;
            }

            var formDataArr = $(form).serializeArray();
            var formObj = {};

            for (var i = 0; i < formDataArr.length; i++) {
                formObj[formDataArr[i].name] = formDataArr[i].value;
            }

            if (!isEditView) {
                formObj.id = new Date().getTime();

                sqlService.addProperty(formObj).done(function() {
                    window.location = 'home.html';
                });
            } else {
                formObj.id = itemId;

                sqlService.updateProperty(formObj).done(function() {
                    window.location = 'home.html';
                });
            }
        }, false);
    });



    if (isEditView) {
        $('.title .title-text').html('Edit Property');
        $('.delete-property').show();

        sqlService.getPropertyById(itemId).done(function(property) {
            populate(formEl, property);
        });
    }

    function populate(form, data) {
        $.each(data, function(key, value) {
            $('[name=' + key + ']', form).val(value);
        });
    }

    $('.back-btn').on('click', function() {
        window.location = 'home.html';
    });

    $('.delete-property').on('click', function() {
        removeModal.modal('show');
    });

    $('.delete-property-confirmation').on('click', function() {
        sqlService.deleteProperty(itemId).done(function() {
            removeModal.modal('hide');
            window.location = 'home.html';
        });
    });

    removeModal.on('show.bs.modal', function() {
        var propertyName = $('.property-item-name').val();
        $('.property-name').text(propertyName);
    });
}, false);