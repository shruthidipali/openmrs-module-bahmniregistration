'use strict';

angular.module('registration.createVisit', ['resources.patientData', 'resources.visit', 'resources.concept', 'resources.bmi'])
    .controller('CreateVisitController', ['$scope', '$location', 'patientData', 'visit', 'concept', 'bmi', function ($scope, $location, patientData, visitService, conceptService, bmiModule) {
    var registrationConcepts = [];
      $scope.registrationFee="10";

    (function () {
        $scope.encounter = {};
        $scope.obs = {};
        $scope.obs.registration_fees=10;
        $scope.visit = {};
        $scope.patient = patientData.response();

        conceptService.getRegistrationConcepts().success(function (data) {
            var concepts = data.results[0].setMembers;
            concepts.forEach(function (concept) {
                registrationConcepts.push({name:concept.name.name,uuid:concept.uuid });
            });
        });
    })();


    $scope.calculateBMI = function () {
        var bmi = bmiModule.calculateBmi($scope.obs.height, $scope.obs.weight);
        var valid = bmi.valid();
        $scope.obs.error = !valid;
        $scope.obs.bmi = valid ? bmi.value : "";
        $scope.obs.bmi_status = valid ? bmi.status() : "";
    };

    $scope.back = function () {
        $location.path("/create");
    }

    $scope.createVisit = function () {
        var datetime = new Date().toISOString();
        $scope.visit.patient = $scope.patient.uuid;
        $scope.visit.startDatetime = datetime;
        $scope.visit.visitType = "REG";

        $scope.encounter.patient = $scope.patient.uuid;
        $scope.encounter.encounterType = "REG";
        $scope.encounter.encounterDatetime = datetime;

        $scope.encounter.obs = [];
        registrationConcepts.forEach(function (concept) {
            var conceptName = concept.name.replace(" ","_").toLowerCase();
            var value = $scope.obs[conceptName];
            if(value != null && value!=""){
                $scope.encounter.obs.push({concept:concept.uuid,value:value});
            }
        });
        $scope.visit.encounters = [$scope.encounter];

        visitService.create($scope.visit);
    };
}]);