'use strict';

angular.module('registration', ['registration.search', 'registration.session'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: 'SearchPatientController'});
        $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'CreateNewPatientController'});
        $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'SessionController'});
        $routeProvider.otherwise({redirectTo: '/login'});
    }]).run(function($rootScope){
//        $rootScope.BaseUrl='http://localhost:8080/openmrs';
        $rootScope.BaseUrl='/openmrs';
    });