angular
  .module('app')
  .component('landing', {
    templateUrl: 'app/landing.html',
    controller: landingController,
    controllerAs: 'landing',
    scope: {
      ngValue: '=',
      ngModel: '='
    }
  });
function landingController($timeout, $document, $log) {
  var vm = this;
  vm.Comments = [false, false, false, false, false, false, false, false];
  vm.$onInit = init();

  function init() {
    startQuotes(3000);
  }

  function startQuotes(timer) {
    $timeout(function () {
      var rnd = Math.floor(Math.random() * vm.Comments.length);
      vm.Comments[rnd] = true;
      $timeout(function () {
        vm.Comments[rnd] = false;
        startQuotes(0);
      }, 5000);
    }, timer);
  }
}

