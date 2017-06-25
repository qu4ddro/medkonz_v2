(function () {
  angular.module('app', ['ngTouch', 'smoothScroll'])
    .controller('MyappController', function ($timeout, $document, $window, smoothScroll, $log) {
      var vm = this;
      vm.ShowDiv = showdiv;
      vm.$onInit = init();
      vm.contentDivs = [false, false, false, false, false];
      vm.DivPosition = ['div2', 'div3', 'div4', 'div5'];
      vm.contentDivsClass = ['fa-circle-o', 'fa-circle-o', 'fa-circle-o', 'fa-circle-o', 'fa-circle-o'];
      vm.contentDivsConnector = [];
      vm.Comments = [false, false, false, false, false, false, false, false];
      vm.imagesPersonal = [
        { image: 'assets/images/1_Persönlich/Elon-Musk.jpg', id: 0 },
        { image: 'assets/images/1_Persönlich/Elon-Musk1.jpeg', id: 1 }
      ];
      vm.imagesPaypal = [
        { image: 'assets/images/3_PayPal/smartphone1.jpg', id: 0 },
        { image: 'assets/images/3_PayPal/smartphone2.png', id: 1 },
        { image: 'assets/images/3_PayPal/whatispaypal.png', id: 2 },
        { image: 'assets/images/3_PayPal/paypal-working-functioning.png', id: 3 },
        { image: 'assets/images/3_PayPal/flowChart1.png', id: 4 },
        { image: 'assets/images/3_PayPal/flowChart2.png', id: 5 }
      ];
      vm.imagesTesla = [
        { image: 'assets/images/4_Tesla/Models/chassis-motor-p90d.jpg', id: 0 },
        { image: 'assets/images/4_Tesla/Model X/section-exterior-primary.jpg', id: 1 },
        { image: 'assets/images/4_Tesla/Model X/section-hero-background.jpg', id: 2 }
      ];
      vm.imagesSpacex = [
        { image: 'assets/images/5_SpaceX/falcon9-render.png', id: 0 },
        { image: 'assets/images/5_SpaceX/falcon-heavy-render.png', id: 1 },
        { image: 'assets/images/5_SpaceX/landing.jpg', id: 2 },
        { image: 'assets/images/5_SpaceX/launch.jpg', id: 3 },
        { image: 'assets/images/5_SpaceX/ses10_launch3.jpg', id: 4 }
      ];
      vm.imagesHyperloop = [
        { image: 'assets/images/6_Hyperloop/hyperloop-transportation.jpg', id: 0 },
        { image: 'assets/images/6_Hyperloop/Hyperloop_all_cutaway.png', id: 1 },
        { image: 'assets/images/6_Hyperloop/hyperloopconcept.jpg', id: 2 },
        { image: 'assets/images/6_Hyperloop/image_desert.jpg', id: 3 },
        { image: 'assets/images/6_Hyperloop/the_hyperloop.png', id: 4 }
      ];
      vm.imagesTheboringcompany = [
        { image: 'assets/images/7_The Boring Company/tunnel-boring-company-borer.jpg', id: 0 }
      ];
      vm.myInterval = 5000;
      vm.noWrapSlides = false;
      vm.active = 0;
      vm.Move = moveOnArrow;
      vm.EndMove = endmove;
      vm.StickPos = [0, 0]; // x,y
      vm.Viewport = [$document[0].getElementById('main').clientWidth, $document[0].getElementById('main').clientHeight];
      vm.InitHeigth = vm.Viewport[1];
      vm.ScrollTo = [$document[0].getElementById('landing'), $document[0].getElementById('timeline'), $document[0].getElementById('closing')];
      vm.ScrollIndex = 1;
      vm.ScrollUp = 0;
      vm.IsMoving = null;
      vm.TimelineYPosition = (vm.Viewport[1] * 20 / 100);
      vm.TimelinePointPositions = null;
      vm.Stick = null;

      function init() {
        startQuotes(3000);
        vm.IsMoving = true;
        vm.stick = $document[0].getElementById('stickman');
        TweenLite.from(vm.stick, 4, { left: -500 });
        $timeout(function () {
          vm.TimelinePointPositions = [
            { x: $document[0].getElementById('timelinePoint0').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint0').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint1').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint1').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint2').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint2').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint3').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint3').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint4').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint4').getBoundingClientRect().top }
          ];
          showdiv(1);
        }, 1);
      }

      function moveOnArrow(event) {
        var stick = $document[0].getElementById('stickman');
        var posX = vm.StickPos[0];
        var posY = vm.StickPos[1];
        var moveTime = 0.2;
        if ((event.key === 'ArrowUp') || (event.key === 'ArrowDown') || (event.key === 'ArrowLeft') || (event.key === 'ArrowRight')) {
          if (event.key === 'ArrowDown' && event.key === 'ArrowRight') {
            posX += 10;
            posY += 10;
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
      }

      function move(item, posX, posY, time) {
        // $log.log('posX: ' + posX + 'posY: ' + posY + 'time: ' + time);
        vm.IsMoving = true;
        TweenLite.to(item, time, { x: posX, y: posY, onComplete: collissionDetection() });
      }

      function endmove(event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          vm.IsMoving = false;
        }
      }
      function collissionDetection() {
        var StickTop = vm.stick.getBoundingClientRect().top;
        var StickLeft = vm.stick.getBoundingClientRect().left;
        if (StickTop > (vm.Viewport[1])) {
          $log.log(smoothScroll(vm.ScrollTo[vm.ScrollIndex]) + " :::: " + vm.ScrollTo);
          smoothScroll(vm.ScrollTo[vm.ScrollIndex]);
          vm.ScrollIndex += 1 % 2;
          vm.Viewport[1] += vm.InitHeigth;
        }
        else {
          switch (vm.ScrollIndex) {
            case 1:
              break;
            case 2:
              if (StickTop < vm.InitHeigth) {
                smoothScroll(vm.ScrollTo[vm.ScrollIndex - 2]);
                vm.ScrollIndex -= 1 % 2;
                vm.Viewport[1] -= vm.InitHeigth;
              }
              break;
            case 3:
              if (StickTop < (vm.InitHeigth * 2)) {
                smoothScroll(vm.ScrollTo[vm.ScrollIndex - 2]);
                vm.ScrollIndex -= 1 % 2;
                vm.Viewport[1] -= vm.InitHeigth;
              }
              break;
            default: {
              $log.log('something went wrong');
            }

          }
        }

        if (StickTop < vm.TimelinePointPositions[0].y + 150 && StickTop > vm.TimelinePointPositions[0].y - 150) {
          for (var i = 0; i < vm.TimelinePointPositions.length; i++) {
            if (StickLeft < vm.TimelinePointPositions[i].x + 50 && StickLeft > vm.TimelinePointPositions[i].x - 50) {
              showdiv(i);
            }
          }
        }
      }

      $window.addEventListener('keydown', function (e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
        }
      }, false);
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
      function showdiv(number) {
        setTimeline(number);
        setAllcontentDivsFalse();
        vm.contentDivs[number] = true;
      }
      function resetTimeline() {
        setAllcontentDivsFalse();
        setAllcontentDivsClassFalse();
        setAllcontentDivsConnectorBlack();
      }
      function setTimeline(newStatus) {
        var lastDiv = getTimelineStatus();
        if (newStatus === lastDiv && lastDiv !== 0) {
          return;
        }
        else if (newStatus >= lastDiv) {
          for (var i = 0; i <= newStatus; i++) {
            vm.contentDivsClass[i] = 'fa-circle timeline-reached';
            vm.contentDivsConnector[i - 1] = 'timeline-reached-connector';
          }
        }
        else if (newStatus < lastDiv) {
          for (var diff = lastDiv - newStatus; diff > 0; diff--) {
            vm.contentDivsClass[lastDiv] = 'fa-circle-o';
            vm.contentDivsConnector[lastDiv - 1] = 'timeline-not-reached-connector';
            lastDiv--;
          }
        }
      }
      function getTimelineStatus() {
        var lastTrueDiv;
        for (var i = 0; i < vm.contentDivs.length; i++) {
          if (vm.contentDivs[i] === true) {
            lastTrueDiv = i;
          }
        }
        if (!lastTrueDiv) {
          lastTrueDiv = 0;
        }
        return lastTrueDiv;
      }
      function setAllcontentDivsFalse() {
        for (var i = 0; i < vm.contentDivs.length; i++) {
          vm.contentDivs[i] = false;
        }
      }
      function setAllcontentDivsClassFalse() {
        for (var i = 0; i < vm.contentDivsClass.length; i++) {
          vm.contentDivsClass[i] = 'fa-circle-o';
        }
      }
      function setAllcontentDivsConnectorBlack() {
        for (var i = 0; i < vm.contentDivsConnector.length; i++) {
          vm.contentDivsConnector[i] = 'timeline-not-reached-connector';
        }
      }
    });
})();
