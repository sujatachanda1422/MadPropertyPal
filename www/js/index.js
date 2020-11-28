document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    new SQLiteStorageService().initialize();

    setTimeout(function() {
        window.location = 'html/home.html';
    }, 500);

}