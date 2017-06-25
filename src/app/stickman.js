angular
  .module('app')
  .component('stickman', {
    transclude: true,
    templateUrl: 'app/stickman.html',
    controller: stickmanController,
    controllerAs: 'stickman',
    scope: 'true'
  });

function stickmanController($timeout, $document, $log) {
  var vm = this;

  vm.$onInit = init();

  vm.Move = move;
  vm.MoveOnArrow = moveOnArrow;
  vm.EndMove = endmove;
  vm.StickPos = [0, 0]; // x,y
  vm.IsMoving = null;

  function init() {
    var stick = $document[0].getElementById('stickman');
    // $log.log($('body').innerWidth()*-1/2);
    TweenLite.from(stick, 4, { left: vm.Viewport = $('body').innerWidth() * -1 / 2 });
    vm.IsMoving = true;
  }

  function moveOnArrow(event) {
    var stick = $document[0].getElementById('stickman');
    var posX = vm.StickPos[0];
    var posY = vm.StickPos[1];
    var moveTime = 0.2;
    if (event.key === 'ArrowDown' && event.key === 'ArrowRight') {
      posX += 10;
      posY += 10;
      move(stick, posX, posY, 0.2);
    }
    else if (event.key === 'ArrowDown' && event.key === 'ArrowLeft') {
      vm.StickPos[0] += 10;
      vm.StickPos[1] -= 10;
    }
    else if (event.key === 'ArrowUp' && event.key === 'ArrowRight') {
      vm.StickPos[0] -= 10;
      vm.StickPos[1] += 10;
    }
    else if (event.key === 'ArrowUp' && event.key === 'ArrowLeft') {
      vm.StickPos[0] -= 10;
      vm.StickPos[1] -= 10;
    }
    else if (event.key === 'ArrowDown') {
      vm.StickPos[1] += 10;
    }
    else if (event.key === 'ArrowUp') {
      vm.StickPos[1] -= 10;
    }
    else if (event.key === 'ArrowRight') {
      vm.StickPos[0] += 10;
    }
    else if (event.key === 'ArrowLeft') {
      vm.StickPos[0] -= 10;
    }
    move(stick, vm.StickPos[0], vm.StickPos[1], moveTime);
  }

  function move(item, posX, posY, time) {
    // $log.log('posX: ' + posX + 'posY: ' + posY + 'time: ' + time);
    TweenLite.to(item, time, { x: posX, y: posY });
    vm.IsMoving = true;
  }

  function endmove(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      vm.IsMoving = false;
    }
  }
}
