angular.module('Philipp').directive('phoneListItem', function ($http) {
	return {
		restrict: 'A',
		templateUrl: 'templates/phone-list-item.html',
		link: function ($scope, $elem) {
			var modalWindowRemove = $elem.find('.mini.modal.remove');
			var modalWindowEdit = $elem.find('.mini.modal.edit');

			modalWindowRemove.modal({
				approve: '.approve',
				deny: '.deny',
				blurring: true,

				onApprove: function () {
					$scope.phones.splice($scope.index, 1)
					//remove part from array/fix apply
					//search for file history extension
					let phoneToRemoveUrl = 'http://localhost:1337/api/phones/' + $scope.phone._id
					$http.delete(phoneToRemoveUrl, $scope.phone)/*.then(function(){
						$scope.$apply();
					})*/;
					
				}
			});


			modalWindowEdit.modal({
				approve: '.approve',
				deny: '.deny',
				blurring: true,

				onApprove: function () {
					if($scope.phoneNewName==='' || $scope.phoneNewSnippet ==='') {
						return;
					}
					$scope.phone.name = $scope.phoneNewName;
					$scope.phone.snippet = $scope.phoneNewSnippet;
					let phoneToEdit = 'http://localhost:1337/api/phones/' + $scope.phone._id
					$http.put(phoneToEdit, $scope.phone);


					$scope.$apply()
					
				}
			});

			$scope.removeItem = function () {
				modalWindowRemove.modal('show');
			}


			
			$scope.editItem = function () {
				modalWindowEdit.modal('show');
				$scope.phoneNewName = $scope.phone.name;
				$scope.phoneNewSnippet = $scope.phone.snippet;

			}
		}
	}
})