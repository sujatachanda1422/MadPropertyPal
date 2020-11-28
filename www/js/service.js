SQLiteStorageService = function() {
    var service = {};
    var db = window.sqlitePlugin ?
        window.sqlitePlugin.openDatabase({ name: "proj.madpropertypal", location: "default" }) :
        window.openDatabase("proj.madpropertypal", "1.0", "Mad Property Pal", 5000000);

    service.initialize = function() {
        var deferred = $.Deferred();
        db.transaction(function(tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS property ' +
                '(id, name, lease, type, location, bedrooms, bathroom, size, price, ameneties, desc)', [],
                function(tx, res) {
                    tx.executeSql('DELETE FROM property', [], function(tx, res) {
                        deferred.resolve(service);
                    }, function(tx, res) {
                        deferred.reject('Error initializing database');
                    });
                },
                function(tx, res) {
                    deferred.reject('Error initializing database');
                });
        });
        return deferred.promise();
    }

    service.getPropertyList = function() {
        var deferred = $.Deferred();

        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM property', [], function(tx, res) {
                var property = [];

                for (var i = 0; i < res.rows.length; i++) {
                    property.push(res.rows.item(i));
                }

                deferred.resolve(property);
            }, function(e) {
                deferred.reject(e);
            });
        });
        return deferred.promise();
    }
    service.getPropertyById = function(id) {
        var deferred = $.Deferred();

        db.transaction(function(tx) {
            tx.executeSql('SELECT id, name, lease, type, location, bedrooms, bathroom, size, price, ameneties, desc FROM property  WHERE id = ?', [id], function(tx, res) {
                var property = res.rows.item(0);
                deferred.resolve(property);
            }, function(e) {
                deferred.reject(e);
            });
        });
        return deferred.promise();
    }
    service.addProperty = function(propertyObj) {
        var deferred = $.Deferred();
        console.log(db);

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO property (id, name, lease, type, location, bedrooms, bathroom, size, price, ameneties, desc) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [propertyObj.id, propertyObj.name, propertyObj.lease, propertyObj.type, propertyObj.location, propertyObj.bedrooms, propertyObj.bathroom, propertyObj.size, propertyObj.price, propertyObj.ameneties, propertyObj.desc], function(tx, res) {
                deferred.resolve();
            }, function(e) {
                deferred.reject(e);
            });
        });
        return deferred.promise();
    }
    service.updateProperty = function(propertyObj) {
        var deferred = $.Deferred();

        db.transaction(function(tx) {
            tx.executeSql('UPDATE property SET name = ?, lease = ?, type = ?, location = ?, bedrooms = ?, bathroom = ?, size = ?, price = ?, ameneties = ?, desc = ? WHERE id = ?', [propertyObj.name, propertyObj.lease, propertyObj.type, propertyObj.location, propertyObj.bedrooms, propertyObj.bathroom, propertyObj.size, propertyObj.price, propertyObj.ameneties, propertyObj.desc, propertyObj.id], function(tx, res) {
                deferred.resolve();
            }, function(e) {
                deferred.reject(e);
            });
        });
        return deferred.promise();
    }

    service.deleteProperty = function(id) {
        var deferred = $.Deferred();

        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM property WHERE id = ?', [id], function(tx, res) {
                deferred.resolve();
            }, function(e) {
                deferred.reject(e);
            });
        });
        return deferred.promise();
    }
    service.deleteAllProperties = function() {
        var deferred = $.Deferred();

        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM property', [], function(tx, res) {
                deferred.resolve();
            }, function(e) {
                deferred.reject(e);
            });
        });
        return deferred.promise();
    }

    return service;
}