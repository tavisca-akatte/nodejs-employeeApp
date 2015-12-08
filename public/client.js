var app = angular.module('empApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'display.html',
            controller: 'EmployeeController'
        })
        .when('/edit/:id', {
            templateUrl: '/edit.html',
            controller: 'EditEmployeeController'
        });
});


app.controller("EmployeeController", function ($scope, $http, $location) {
    $scope.employees = [];
    $scope.statusCode = '200';

    $scope.loadEmployee = function () {
        $http({
            method: 'GET',
            url: '/employees/'
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
            method: 'DELETE',
            url: '/delete/' +emp.ID
        }).then(function successCallback(response) {
            $scope.status = response.status;
            $location.url('/');
        }, function errorCallback(response) {
            $scope.status = response.status;
            $location.url('/');
        });

    };

    $scope.editEmployee = function (emp) {
        $location.url('/edit/' + emp.ID);
    };

});

app.controller('EditEmployeeController', function ($scope, $http, $location) {
    var empId = $location.path().split(/[\s/]+/).pop();
    console.log(empId);
    $scope.employee = {};

    $scope.getEmployee = function () {
        $http({
            method: 'GET',
            url: '/employee/' + empId
        }).then(function successCallback(response) {
            $scope.status = response.status;
            $scope.employee = response.data;
        }, function errorCallback(response) {
            $scope.status = response.status;
            $scope.employee = response.data;
        });
        $("#alert").hide();
    };

    $scope.goHome = function () {
        $location.url('/');
    }

    $scope.save = function () {
        $http({
            url: '/edit',
            method: "PUT",
            data: JSON.stringify($scope.employee),
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {

            $('#alert').removeClass('pure-alert-error').addClass('pure-alert pure-alert-success');
            $("#alert").fadeTo(2000, 500).slideUp(500, function(){

                $("#alert").show();
            });
            $scope.goHome();
        }).error(function (data, status, headers, config) {
            $scope.status = status + ' ' + headers;
            $('#alert').removeClass('pure-alert-success').addClass('pure-alert pure-alert-error');
            $("#alert").html('Error occurred while saving. Please try again...');
            $("#alert").fadeTo(2000, 500).slideUp(500, function(){
                $("#alert").hide();
            });
        });
    }
});