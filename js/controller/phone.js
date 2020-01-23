angular.module('Philipp').controller('PhoneController', function($scope, DatabaseService, $http) {
	$scope.phoneName = '';
	$scope.phoneSnippet = '';

	$scope.add = function() {
		if (!$scope.isValid()) {
			return;
		}

		var phone = {
			name: $scope.phoneName,
			snippet: $scope.phoneSnippet,
			tags: $scope.tags
		};

		$http.post('http://localhost:1337/api/phones', phone).then(function(response) {
			$scope.phones.push(response.data.data);
		}, function(response) {});

		$scope.phoneName = '';
		$scope.phoneSnippet = '';
	};

	$scope.isValid = function() {
		return ($scope.phoneName !== '' && $scope.phoneSnippet !== '');
	}


	

});

