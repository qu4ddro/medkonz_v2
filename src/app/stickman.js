angular
  .module('app')
  .component('stickman', {
    templateUrl: 'app/stickman.html',
    controller: stickmanController,
    controllerAs: 'stickman',
    scope: {
      ngValue: '=',
      ngModel: '='
    }
  });
function stickmanController($timeout, $document, $log) {
  var vm = this;

  vm.Move = move;
  vm.EndMove = endmove;
  vm.StickPos = [0, 0]; //x,y
  vm.IsMoving = null;

  function move(event) {
    var stick = $document[0].getElementById('stickman');
    $log.log(event);

    if (event.key === 'ArrowDown' && event.key === 'ArrowRight') {
      vm.StickPos[0] += 10;
      vm.StickPos[1] += 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowDown' && event.key === 'ArrowLeft') {
      vm.StickPos[0] += 10;
      vm.StickPos[1] -= 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowUp' && event.key === 'ArrowRight') {
      vm.StickPos[0] -= 10;
      vm.StickPos[1] += 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowUp' && event.key === 'ArrowLeft') {
      vm.StickPos[0] -= 10;
      vm.StickPos[1] -= 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowDown') {
      vm.StickPos[1] += 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowUp') {
      vm.StickPos[1] -= 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowRight') {
      vm.StickPos[0] += 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
    else if (event.key === 'ArrowLeft') {
      vm.StickPos[0] -= 10;
      TweenLite.to(stick, 0.2, { x: vm.StickPos[0], y: vm.StickPos[1] });
      vm.IsMoving = true;
    }
  }

  function endmove(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      vm.IsMoving = false;
    }
  }
}
