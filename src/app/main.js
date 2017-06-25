angular
  .module('app')
  .component('app', {
    transclude: true,
    templateUrl: 'app/main.html',
    controller: mainController,
    controllerAs: 'main',
    scope: 'true'
  });
function mainController($log, stickman) {
  var vm = this;
  var einzwei = 12;

  // vm.StickPos = stickman.StickPos;
  vm.$onInit = init();

  function init() {
    $log.log(stickman.StickPos);
    // $log.log(stickman.StickPos);
  }
}
