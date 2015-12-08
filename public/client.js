var app = angular.module('empApp', []).controller("EmployeeCtrl", function ($scope, $http) {

		$scope.employee = [];
		$scope.statusCode = '200'; 
		
		$scope.loadEmployee = function () {
			$http({
				method : 'GET',
				url : '/employees/'
			}).then(function successCallback(response) {
				$scope.status = response.status;
                $scope.employee = response.data;
			}, function errorCallback(response) {
				$scope.status = response.status;
                $scope.employee = response.data;
			});

		};

	});
