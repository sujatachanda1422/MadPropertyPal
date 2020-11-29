document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    new SQLiteStorageService().initialize().done(function() {
        window.location = 'html/home.html';
    });
}