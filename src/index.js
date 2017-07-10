(function () {
  angular.module('myapp', [
    'ngAnimate',
    'smoothScroll',
    'angular-carousel',
  ])
    .controller('MyAppController', function ($timeout, $document, $window, $log, smoothScroll, Carousel) {
      var vm = this;
      angular.extend(vm, vm, {
        ShowDiv: showdiv,
        $onInit: init(),
        myInterval: 10000,
        noWrapSlides: false,
        active: 0,
        Move: moveOnArrow,
        EndMove: endmove,
        ScrollTo: scrollTo,
        TimelinePointPositions: null,
        Stick: null,
        StickmanIsFlipped: false,
        ScrollIndex: 0,
        IsMoving: true,
        contentDivs: [false, false, false, false, false],
        DivPosition: ["div2", "div3", "div4", "div5"],
        contentDivsClass: ["circle-empty", "circle-empty", "circle-empty", "circle-empty", "circle-empty"],
        contentDivsConnector: [],
        Comments: [false, false, false, false, false, false, false, false],
        StickPos: [0, 0], // x,y
        scrolling: false,
        speaking: false,
        bubble: [false, false, false, false, false],

        imagesPersonal: [
          { image: 'assets/images/1_Persönlich/Elon-Musk.jpg', id: 0 },
          { image: 'assets/images/1_Persönlich/Elon-Musk1.jpeg', id: 1 }
        ],
        imagesPaypal: [
          { image: 'assets/images/3_PayPal/smartphone1.jpg', id: 0 },
          { image: 'assets/images/3_PayPal/smartphone2.png', id: 1 },
          { image: 'assets/images/3_PayPal/whatispaypal.png', id: 2 },
          { image: 'assets/images/3_PayPal/paypal-working-functioning.png', id: 3 },
          { image: 'assets/images/3_PayPal/flowChart1.png', id: 4 },
          { image: 'assets/images/3_PayPal/flowChart2.png', id: 5 }
        ],
        imagesTesla: [
          { image: 'assets/images/4_Tesla/Models/chassis-motor-p90d.jpg', id: 0 },
          { image: 'assets/images/4_Tesla/Model X/section-exterior-primary.jpg', id: 1 },
          { image: 'assets/images/4_Tesla/Model X/section-hero-background.jpg', id: 2 }
        ],
        imagesSpacex: [
          { image: 'assets/images/5_SpaceX/falcon9-render.png', id: 0 },
          { image: 'assets/images/5_SpaceX/falcon-heavy-render.png', id: 1 },
          { image: 'assets/images/5_SpaceX/landing.jpg', id: 2 },
          { image: 'assets/images/5_SpaceX/launch.jpg', id: 3 },
          { image: 'assets/images/5_SpaceX/ses10_launch3.jpg', id: 4 }
        ],
        imagesHyperloop: [
          { image: 'assets/images/6_Hyperloop/hyperloop-transportation.jpg', id: 0 },
          { image: 'assets/images/6_Hyperloop/Hyperloop_all_cutaway.png', id: 1 },
          { image: 'assets/images/6_Hyperloop/hyperloopconcept.jpg', id: 2 },
          { image: 'assets/images/6_Hyperloop/image_desert.jpg', id: 3 },
          { image: 'assets/images/6_Hyperloop/the_hyperloop.png', id: 4 }
        ],
        imagesTheboringcompany: [
          { image: 'assets/images/7_The Boring Company/tunnel-boring-company-borer.jpg', id: 0 }
        ]
      });
      vm.Viewport = [$document[0].getElementById('main').clientWidth, $document[0].getElementById('main').clientHeight];
      vm.InitHeigth = vm.Viewport[1];
      vm.scrollTargets = [$document[0].getElementById('landing'), $document[0].getElementById('timeline'), $document[0].getElementById('closing')];
      vm.ScrollIndexPosXY = [[0, 30], [-520, -460], [0, 0]];
      vm.TimelineYPosition = (vm.Viewport[1] * 20 / 100);

      function init() {
        startQuotes(3000);
        vm.IsMoving = true;
        vm.stick = $document[0].getElementById('stickman');
        TweenLite.from(vm.stick, 2, { left: -500, onComplete: endmove() });
        $timeout(function () {
          vm.TimelinePointPositions = [
            { x: $document[0].getElementById('timelinePoint0').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint0').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint1').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint1').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint2').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint2').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint3').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint3').getBoundingClientRect().top },
            { x: $document[0].getElementById('timelinePoint4').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint4').getBoundingClientRect().top }
          ];
          showdiv(0);
        }, 1);
        $timeout(function () {
          vm.bubble[0] = true;
          vm.speaking = true;
          $timeout(function () {
            setAllBubblesFalse();
            vm.bubble[1] = true;
          }, 3000)
        }, 2500);
      }
      $window.addEventListener("keydown", function (e) {
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
      function getPos(item) {
        var CenterY = (item.getBoundingClientRect().bottom - item.getBoundingClientRect().top) / 2 + item.getBoundingClientRect().top;
        var CenterX = (item.getBoundingClientRect().right - item.getBoundingClientRect().left) / 2 + item.getBoundingClientRect().left;
        var position = [CenterX, CenterY];
        return position;
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
            posX += 10;
            posY -= 10;
          }
          else if (event.key === 'ArrowUp' && event.key === 'ArrowRight') {
            posX -= 10;
            posY += 10;
          }
          else if (event.key === 'ArrowUp' && event.key === 'ArrowLeft') {
            posX -= 10;
            posY -= 10;
          }
          else if (event.key === 'ArrowDown') {
            posY += 10;
          }
          else if (event.key === 'ArrowUp') {
            posY -= 10;
          }
          else if (event.key === 'ArrowRight') {
            posX += 10;
          }
          else if (event.key === 'ArrowLeft') {
            posX -= 10;
          }
          move(stick, posX, posY, moveTime);
          collissionDetection();
        }
      }

      // Where Elon moves
      function move(item, posX, posY, time) {
        vm.IsMoving = true;
        if (posX < vm.StickPos[0]) {
          vm.StickmanIsFlipped = true;
        }
        else {
          vm.StickmanIsFlipped = false;
        }
        var TweenlightViewport = [vm.Viewport[0] / 2, vm.Viewport[1] / 2];
        TweenLite.to(item, time, { x: posX, y: posY });
        vm.StickPos = [posX, posY];
        if (posX > (-1 * TweenlightViewport[0]) && (posX < (TweenlightViewport[0]))) {

        }
      }

      function collissionDetection() {
        if (vm.scrolling) {
          return;
        }
        var StickBottom = vm.stick.getBoundingClientRect().bottom + 60;
        var StickCenter = ((vm.stick.getBoundingClientRect().right - vm.stick.getBoundingClientRect().left) / 2 + vm.stick.getBoundingClientRect().left);
        var target;

        // Check if Elon runs out of bounds
        if ((StickBottom >= (vm.Viewport[1])) || (StickBottom <= 100)) {

          // Check if botttom of Page is reached
          if (StickBottom >= (vm.Viewport[1])) {
            if (vm.ScrollIndex[vm.ScrollIndex + 1] !== null) {
              vm.ScrollIndex += 1;
            }
          }
          // Check if top of Page is reached
          else {
            if (vm.ScrollIndex[vm.ScrollIndex - 1] !== null) {
              vm.ScrollIndex -= 1;
            }
          }
          target = vm.scrollTargets[vm.ScrollIndex];
          var posXY = [vm.ScrollIndexPosXY[vm.ScrollIndex][0], (vm.ScrollIndexPosXY[vm.ScrollIndex][1]) + (vm.Viewport[1] * (vm.ScrollIndex))];
          move(vm.stick, posXY[0], posXY[1], 3);
          scrollTo(target);
          switch (vm.ScrollIndex) {
            case 0: {
              setAllBubblesFalse();
              vm.bubble[1] = true;
            }
              break;
            case 1: {
              setAllBubblesFalse();
              vm.bubble[2] = true;
            }
              break;
            case 2: {
              setAllBubblesFalse();
              vm.bubble[3] = true;
            }
              break;

          }
        }

        // $log.log("StickBottom :" + StickBottom + "vm.TimelinePointPositions[0].y" + vm.TimelinePointPositions[0].y);

        // Check if Timeline Point is reached
        if (StickBottom < vm.TimelinePointPositions[0].y + 150 && StickBottom > vm.TimelinePointPositions[0].y - 150) {
          for (var i = 0; i < vm.TimelinePointPositions.length; i++) {
            if (StickCenter < vm.TimelinePointPositions[i].x + 50 && StickCenter > vm.TimelinePointPositions[i].x - 50) {
              showdiv(i);
            }
          }
        }
      }

      function scrollTo(target) {
        var options = {
          duration: 700,
          easing: 'easeInQuad',
          offset: 0,
          callbackBefore: function (element) {
            vm.scrolling = true;
            vm.IsMoving = true;
          },
          callbackAfter: function (element) {
            vm.scrolling = false;
            vm.IsMoving = false;
            $timeout(function () {
              vm.TimelinePointPositions = [
                { x: $document[0].getElementById('timelinePoint0').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint0').getBoundingClientRect().top },
                { x: $document[0].getElementById('timelinePoint1').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint1').getBoundingClientRect().top },
                { x: $document[0].getElementById('timelinePoint2').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint2').getBoundingClientRect().top },
                { x: $document[0].getElementById('timelinePoint3').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint3').getBoundingClientRect().top },
                { x: $document[0].getElementById('timelinePoint4').getBoundingClientRect().left, y: $document[0].getElementById('timelinePoint4').getBoundingClientRect().top }
              ];
              showdiv(0);
            }, 1);
          },
          containerId: 'custom-container-id'
        };
        smoothScroll(target, options);
      }
      function endmove(event) {
        vm.IsMoving = false;
      }

      function showdiv(number) {
        setTimeline(number);
        setAllContentDivsFalse();
        vm.contentDivs[number] = true;
      }
      function resetTimeline() {
        setAllContentDivsFalse();
        setAllContentDivsClassFalse();
        setAllContentDivsConnectorBlack();
      }
      function setTimeline(newStatus) {
        var lastDiv = getTimelineStatus();
        if (newStatus === lastDiv && lastDiv !== 0) {
          return;
        }
        else if (newStatus >= lastDiv) {
          for (var i = 0; i <= newStatus; i++) {
            vm.contentDivsClass[i] = "circle-full timeline-reached";
            vm.contentDivsConnector[i - 1] = "timeline-reached-connector";
          }
        }
        else if (newStatus < lastDiv) {
          for (var diff = lastDiv - newStatus; diff > 0; diff--) {
            vm.contentDivsClass[lastDiv] = "circle-empty";
            vm.contentDivsConnector[lastDiv - 1] = "timeline-not-reached-connector";
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
      function setAllContentDivsFalse() {
        for (var i = 0; i < vm.contentDivs.length; i++) {
          vm.contentDivs[i] = false;
        }
      }
      function setAllBubblesFalse() {
        for (var i = 0; i < vm.bubble.length; i++) {
          vm.bubble[i] = false;
        }
      }
      function setAllContentDivsClassFalse() {
        for (var i = 0; i < vm.contentDivsClass.length; i++) {
          vm.contentDivsClass[i] = "circle-empty";
        }
      }
      function setAllContentDivsConnectorBlack() {
        for (var i = 0; i < vm.contentDivsConnector.length; i++) {
          vm.contentDivsConnector[i] = "timeline-not-reached-connector";
        }
      }
    });
})();
