
function openPopup(val) {
    /*console.log(val)
    var card = document.getElementsByClassName("popup-main");
    card[val].style.cursor = "context-menu"*/

    var popup = document.getElementById(val);
    if(popup.style.display == "block"){
      closePopup(val);
    }else{
      popup.style.display = "block";
      //popup.style.cursor = "context-menu"
    }
  }
function closePopup(val) {
    var popup = document.getElementById(val);
    popup.style.display = "none";
    /*var card = document.getElementsByClassName("popup-main");
    card[val].style.cursor = "pointer"*/
  }

  var sliderTeam = (function(document, $) {
  
    'use strict';
    
    var $sliderTeams = $('.slider--teams'),
        $list = $('#list'),
        $listItems = $('#list li'),
        $arrow_left=$('.a-left'),
        $arrow_right=$('.a-right'),
        $nItems = $listItems.length,
        $nView = 3,
        autoSlider,
        $current = 0,
        $isAuto = true,
        $acAuto = 2500,
        $height = $(window).height(),
        $width= $(window).width(),
        _init = function() {
          _initWidth();
          _eventInit();
        },
        
        _initWidth = function() {
          if($width>640){
            $list.css({
              'margin-left': (100 / $nView) + '%',
              'width': (100 * ($nItems / $nView)) + '%'
            });
            $listItems.css('width', 100 / $nItems + '%');
            $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
          }else{
            $list.css({
              'width': (100 * ($nItems)) + '%'
            });
            $listItems.css('width', 100 / $nItems + '%');
            $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
          }
          
        },
        
        _eventInit = function() {
          
          window.requestAnimFrame = (function() {
            return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function(callback, element){
                  window.setTimeout(callback, 1000 / 60);
                };
          })();
  
          window.requestInterval = function(fn, delay) {
              if( !window.requestAnimationFrame       && 
                  !window.webkitRequestAnimationFrame && 
                  !window.mozRequestAnimationFrame    && 
                  !window.oRequestAnimationFrame      && 
                  !window.msRequestAnimationFrame)
                      return window.setInterval(fn, delay);
              var start = new Date().getTime(),
              handle = new Object();
  
              function loop() {
                  var current = new Date().getTime(),
                  delta = current - start;
                  if(delta >= delay) {
                      fn.call();
                      start = new Date().getTime();
                  }
                  handle.value = requestAnimFrame(loop);
              };
              handle.value = requestAnimFrame(loop);
              return handle;
          }
  
          window.clearRequestInterval = function(handle) {
              window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
              window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
              window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
              window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
              window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
              clearInterval(handle);
          };
          
          $.each($listItems, function(i) {
            var $this = $(this);
            if($width<=640){
              $this.on('click', function(e) {
                console.log(e)
                //e.preventDefault();
                openPopup(i)
                _stopMove(i);
              });
            }else{
              $this.on('touchstart click', function(e) {
                //e.preventDefault();
                _stopMove(i);
                _moveIt($this, i);
              });
            }
          });

          $arrow_left.on('touchstart', function(e) {
            if($current!=0){
              e.preventDefault();
              _stopMove($current);
              _autoMove($current-1);
            }
          });
          $arrow_right.on('touchstart', function(e) {
            if($current<$nItems-1){
              e.preventDefault();
              _stopMove($current);
              _autoMove($current+1);
            }
          });
          autoSlider = requestInterval(_autoMove, $acAuto);
        },
        
        _moveIt = function(obj, x) {
          
          var n = x;
          obj.find('.popup-main').addClass('active');        
          $listItems.not(obj).find('.popup-main').removeClass('active');
          console.log((-(100 / $nItems)) * n)
          $list.velocity({
            translateX: ((-(100 / $nItems)) * n) + '%',
            translateZ: 0
          }, {
            duration: 1000,
            easing: [400, 26],
            queue: false
          });
          
        },
        
        _autoMove = function(currentSlide) {
          if ($isAuto) { 
            $current = ~~(($current + 1) % $nItems);
          } else {
            $current = currentSlide;
          }
          console.log($current);
          _moveIt($listItems.eq($current), $current);
        },
        
        _stopMove = function(x) {
          clearRequestInterval(autoSlider);
          $isAuto = false;
          _autoMove(x);
        };
    
    return {
      init: _init
    };
  
  })(document, jQuery);
  
  $(window).load(function(){
    'use strict';
    sliderTeam.init();
  });