angular.module('Philipp').factory('DatabaseService', function () {
	var db = new Dexie('PhoneApp');

	db.version(1).stores({
		phones: '++id,name,snippet,tags'
	});

	return db
});