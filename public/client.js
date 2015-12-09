var app = angular.module('empApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'display.html',
		controller : 'EmployeeController'
	})
	.when('/edit/:id', {
		templateUrl : '/edit.html',
		controller : 'EditEmployeeController'
	})
	.when('/add', {
		templateUrl : '/edit.html',
		controller : 'EditEmployeeController'
	});

	$locationProvider.html5Mode(false);
	
});

app.controller("EmployeeController", function ($scope, $http, $location) {
	$scope.employees = [];
	$scope.statusCode = '200';
	$scope.query = {};
    $scope.queryBy = 'Name';
	
	$scope.loadEmployee = function () {
		$http({
			method : 'GET',
			url : '/employees/'
		}).then(function successCallback(response) {
			$scope.status = response.status;
			$scope.employees = response.data;
		}, function errorCallback(response) {
			$scope.status = response.status;
			$scope.employees = response.data;
		});
	};
	$scope.deleteEmployee = function (emp) {

		$http({
			method : 'DELETE',
			url : '/delete/' + emp.ID
		}).then(function successCallback(response) {
			$scope.status = response.status;
			$scope.loadEmployee();
		}, function errorCallback(response) {
			$scope.status = response.status;
			$scope.loadEmployee();
		});

	};

	$scope.editEmployee = function (url, empId) {
		if (url === '/edit') {
			$location.url(url + '/' + empId);
		}
		if (url === '/add') {
			$location.url(url);
		}

	};

});

app.controller('EditEmployeeController', function ($scope, $http, $location) {
	var empId = $location.path().split(/[\s/]+/).pop();
	var currentUrl = $location.url().split('/')[1];
	
	$scope.employee = {};

	$scope.getEmployee = function () {
		if (currentUrl === 'edit') {
			
			$http({
				method : 'GET',
				url : '/employee/' + empId
			}).then(function successCallback(response) {
				$scope.status = response.status;
				$scope.employee = response.data;
			}, function errorCallback(response) {
				$scope.status = response.status;
				$scope.employee = response.data;
			});
		}
		
		$("#alert").hide();
	};

	$scope.goHome = function () {
		$location.url('/');
	}

	$scope.save = function () {
		$http({
			url : '/'+currentUrl,
			method : "POST",
			data : JSON.stringify($scope.employee),
			headers : {
				'Content-Type' : 'application/json'
			}
		}).success(function (data, status, headers, config) {

			$('#alert').removeClass('pure-alert-error').addClass('pure-alert pure-alert-success');
			$("#alert").fadeTo(2000, 500).slideUp(500, function () {

				$("#alert").show();
			});
			$scope.goHome();
		}).error(function (data, status, headers, config) {
			$scope.status = status + ' ' + headers;
			$('#alert').removeClass('pure-alert-success').addClass('pure-alert pure-alert-error');
			$("#alert").html('Error occurred while saving. Please try again...');
			$("#alert").fadeTo(2000, 500).slideUp(500, function () {
				$("#alert").hide();
			});
		});
	}
});
