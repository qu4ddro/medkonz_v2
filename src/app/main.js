angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'main',
    scope: {
      ngValue: '=',
      ngModel: '='
    }
  });
function mainController($log) {
  var vm = this;
  // vm.StickPos = stickman.StickPos;
  vm.$onInit = init();

  function init() {
    $log.log(vm.StickPos);
  }
}
