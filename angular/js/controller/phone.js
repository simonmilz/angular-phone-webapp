angular.module('Philipp').controller('PhoneController', function($scope) {
	$scope.name = 'Philipps App';
	$scope.phoneName = '';
	$scope.phoneSnippet = '';

	try {
		$scope.phones = JSON.parse(localStorage.getItem('phones'));
	} catch (e) {
		$scope.phones = [];
	}

	$scope.add = function() {
		if (!$scope.isValid()) {
			return;
		}

		$scope.phones.push({
			id: new Date().getTime(),
			name: $scope.phoneName,
			snippet: $scope.phoneSnippet
		});

		localStorage.setItem('phones', JSON.stringify($scope.phones));

		$scope.phoneName = '';
		$scope.phoneSnippet = '';
	};

	$scope.isValid = function() {
		return ($scope.phoneName !== '' && $scope.phoneSnippet !== '');
	}
});