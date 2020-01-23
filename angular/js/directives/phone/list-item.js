angular.module('Philipp').directive('phoneListItem', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/phone-list-item.html',
		replace: true,
		link: function ($scope, $elem) {
			var modalWindow = $($elem).find('.mini.modal');

			modalWindow.modal({
				approve: '.approve',
				deny: '.deny',
				blurring: true,

				onApprove: function () {
					$scope.phones.splice($scope.$index, 1);
					localStorage.setItem('phones', JSON.stringify($scope.phones));
					$scope.$apply();
				}
			});

			$scope.removeItem = function () {
				modalWindow.modal('show');
			}
		}
	}
});