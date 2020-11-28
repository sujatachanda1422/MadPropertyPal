document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    new SQLiteStorageService().initialize();
    window.location = 'html/home.html';
}
