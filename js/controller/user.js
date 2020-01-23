angular.module('Philipp').controller('UserController', function($scope, $http) {
    $scope.firstName = ''
    $scope.lastName = ''
    $scope.age = ''
    $scope.adress = ''
    $scope.apt = ''
    console.log($scope.state)
    //$scope.state = 'State'
    $scope.country = ''

 
	$scope.add = function() {
		if (!$scope.isValid()) {
			return;
		}

		var user = {
            firstname: $scope.firstName,
            lastname: $scope.lastName,
            age: $scope.age,
            adress: $scope.adress,
            state: $scope.state,
            country: $scope.country,
		};

		$http.post('http://localhost:1337/api/users/', user).then(function(response) {
			//$scope.phones.push(response.data.data);
		}, function(response) {});

		$scope.phoneName = '';
		$scope.phoneSnippet = '';
	};

	$scope.isValid = function() {
		return ($scope.firstName !== '' && $scope.lastName !== '' && $scope.age !== '');
	}
});