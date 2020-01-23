angular.module('Philipp').directive('phoneList', function ($http) {
	return {
		restrict: 'E',
		templateUrl: 'templates/phone-list.html',
		link: function ($scope, $elem) {
			$http.get('http://localhost:1337/api/phones').then(function(response) {
				$scope.phones = response.data.data;
			}, function(response) {});
		}
	}
});