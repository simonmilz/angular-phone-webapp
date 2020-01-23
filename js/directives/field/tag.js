angular.module('Philipp').directive('tagField', function (DatabaseService) {
	return {
		restrict: 'A',
		link: function ($scope, $elem, $attrs) {
			DatabaseService.phones.toArray(function (phones) {
				var existingTags = [];

				phones.forEach(function (phone) {
					if (phone.tags) {
						phone.tags.forEach(function (tag) {
							existingTags.push({
								name: tag,
								value: tag
							})
						})
					}
				});

				$elem.dropdown({
					allowAdditions: true,
					values: existingTags.filter((v, i, a) => a.indexOf(v) === i)
				});

				$scope.$watch($attrs.ngModel, function (v) {
					if ($elem.dropdown) {
						$elem.dropdown('set selected', v)
					}
				});
			});

			function onChange(value) {
				ModelController.$setViewValue(value);
			}
		}
	}
});