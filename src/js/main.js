(function ($) {
  "use strict";
  let windows = $(window);
  let screenSize = windows.width();
  let sticky = $('.header-sticky');
  let $html = $('html');
  let $body = $('body');
  let plugins = {
    googleMap: $('#google-map'),
    //customWaypoints: $('[data-custom-scroll-to]'),
  };
  
  
  /**
   * preloader
   */
  windows.on('load', function(){
    $(".preloader-activate").removeClass('preloader-active');
  });
  
  $(window).on('load', function(){
    setTimeout(function(){
      jQuery('.open_tm_preloader').addClass('loaded');
    }, 1000);
  });
  
  
  /**
   * end preloader
   */
  
  
 
  let now = new Date();
  let getYear = now.getFullYear();
  let elCopyrightYear = document.getElementById('copyright-year');
  if (elCopyrightYear) {
    elCopyrightYear.innerHTML = getYear;
  }
  
  
  /*bx-panel*/
  
  if ($('body #bx-panel').length > 0) {
    $('.header-area--absolute').css({
      top: '40' + 'px'
    })
  }
  
  /*=============================================
  =            light gallery active            =
  =============================================*/
  
  $('.popup-images').lightGallery();
  
  $('.video-popup').lightGallery();
  
  
  /*===========================================
      =            Submenu viewport position      =
      =============================================*/
  
  if ($(".has-children--multilevel-submenu").find('.submenu').length) {
    var elm = $(".has-children--multilevel-submenu").find('.submenu');
    
    elm.each(function(){
      var off = $(this).offset();
      var l = off.left;
      var w = $(this).width();
      var docH = windows.height();
      var docW = windows.width() - 10;
      var isEntirelyVisible = (l + w <= docW);
      
      if (!isEntirelyVisible) {
        $(this).addClass('left');
      }
    });
  }
  
  /**
   * menu
   */
  windows.on('scroll', function () {
    var scroll = windows.scrollTop();
    var headerHeight = sticky.height();
    
    if (screenSize >= 320) {
      if (scroll < headerHeight) {
        sticky.removeClass('is-sticky');
      } else {
        sticky.addClass('is-sticky');
      }
    }
    
  });
  /**
   * end menu
   */
  /**
   * scroll-top
   */
  /*----------  Scroll to top  ----------*/
  function scrollToTop() {
    var $scrollUp = $('#scroll-top'),
        $lastScrollTop = 0,
        $window = $(window);
    
    $window.on('scroll', function () {
      var st = $(this).scrollTop();
      if (st > $lastScrollTop) {
        $scrollUp.removeClass('show');
      } else {
        if ($window.scrollTop() > 200) {
          $scrollUp.addClass('show');
        } else {
          $scrollUp.removeClass('show');
        }
      }
      $lastScrollTop = st;
    });
    
    $scrollUp.on('click', function (evt) {
      $('html, body').animate({scrollTop: 0}, 600);
      evt.preventDefault();
    });
  }
  scrollToTop();
  /**
   * end scroll-top
   */
  
  /**
   * menu mobile
   */
  /*==========================================
    =            mobile menu active            =
    ============================================*/
  
  $("#mobile-menu-trigger").on('click', function(){
    $("#mobile-menu-overlay").addClass("active");
    $body.addClass('no-overflow');
  });
  
  $("#mobile-menu-close-trigger").on('click', function(){
    $("#mobile-menu-overlay").removeClass("active");
    $body.removeClass('no-overflow');
  });
  
  $(".offcanvas-navigation--onepage ul li a").on('click', function(){
    $("#mobile-menu-overlay").removeClass("active");
    $body.removeClass('no-overflow');
  });
  
  /*=============================================
    =            offcanvas mobile menu            =
    =============================================*/
  var $offCanvasNav = $('.offcanvas-navigation'),
      $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');
  
  /*Add Toggle Button With Off Canvas Sub Menu*/
  $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
  
  /*Close Off Canvas Sub Menu*/
  $offCanvasNavSubMenu.slideUp();
  
  /*Category Sub Menu Toggle*/
  $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
    var $this = $(this);
    if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
      e.preventDefault();
      if ($this.siblings('ul:visible').length){
        $this.parent('li').removeClass('active');
        $this.siblings('ul').slideUp();
      } else {
        $this.parent('li').addClass('active');
        $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
        $this.closest('li').siblings('li').find('ul:visible').slideUp();
        $this.siblings('ul').slideDown();
      }
    }
  });
  
  
  /*Close When Click Outside*/
  $body.on('click', function(e){
    var $target = e.target;
    if (!$($target).is('.mobile-menu-overlay__inner') && !$($target).parents().is('.mobile-menu-overlay__inner') && !$($target).is('#mobile-menu-trigger') && !$($target).is('#mobile-menu-trigger i')){
      $("#mobile-menu-overlay").removeClass("active");
      $body.removeClass('no-overflow');
    }
    if (!$($target).is('.search-overlay__inner') && !$($target).parents().is('.search-overlay__inner') && !$($target).is('#search-overlay-trigger') && !$($target).is('#search-overlay-trigger i')){
      $("#search-overlay").removeClass("active");
      $body.removeClass('no-overflow');
    }
  });
  
  /*=============================================
   =            search overlay active            =
   =============================================*/
  
  $("#search-overlay-trigger").on('click', function(){
    $("#search-overlay").addClass("active");
    $body.addClass('no-overflow');
  });
  
  $("#search-close-trigger").on('click', function(){
    $("#search-overlay").removeClass("active");
    $body.removeClass('no-overflow');
  });
  
  
  new WOW().init();
  
  /**
   *  accordion
   */
  $('.collapse').on('show.bs.collapse', function () {
    $(this).parent().addClass('active');
  });
  
  $('.collapse').on('hide.bs.collapse', function () {
    $(this).parent().removeClass('active');
  });
  
  /**
   * map
   */
  if (plugins.googleMap.length) {
    plugins.googleMap.googleMap({
      styles: [/*{
        "featureType": "landscape",
        "stylers": [{"hue": "#FFBB00"}, {"saturation": 43.400000000000006}, {"lightness": 37.599999999999994}, {"gamma": 1}]
      }, {
        "featureType": "road.highway",
        "stylers": [{"hue": "#FFC200"}, {"saturation": -61.8}, {"lightness": 45.599999999999994}, {"gamma": 1}]
      }, {
        "featureType": "road.arterial",
        "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 51.19999999999999}, {"gamma": 1}]
      }, {
        "featureType": "road.local",
        "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]
      }, {
        "featureType": "water",
        "stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]
      }, {
        "featureType": "poi",
        "stylers": [{"hue": "#00FF6A"}, {"saturation": -1.0989010989011234}, {"lightness": 11.200000000000017}, {"gamma": 1}]
      }
     
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "saturation": 36
            },
            {
              "color": "#333333"
            },
            {
              "lightness": 40
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#ffffff"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#fefefe"
            },
            {
              "lightness": 20
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#fefefe"
            },
            {
              "lightness": 17
            },
            {
              "weight": 1.2
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            },
            {
              "lightness": 20
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#d5d5d5"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7574c0"
            },
            {
              "saturation": "-37"
            },
            {
              "lightness": "75"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            },
            {
              "lightness": 21
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7574c0"
            },
            {
              "saturation": "-2"
            },
            {
              "lightness": "53"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dedede"
            },
            {
              "lightness": 21
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7574c0"
            },
            {
              "lightness": "69"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#7574c0"
            },
            {
              "lightness": "25"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "lightness": 29
            },
            {
              "weight": 0.2
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "lightness": "38"
            },
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "lightness": 18
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f2f2f2"
            },
            {
              "lightness": 19
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e9e9e9"
            },
            {
              "lightness": 17
            }
          ]
        }*/
      ]
    });
  }
  
  
  /**
   * swiper
   */
  var brandLogoSlider = new Swiper('.brand-logo-slider__container', {
    slidesPerView : 5,
    loop: true,
    speed: 1000,
    spaceBetween : 30,
    autoplay: {
      delay: 3000,
    },
    
    breakpoints: {
      1499:{
        slidesPerView : 6
      },
      
      991:{
        slidesPerView : 4
      },
      
      767:{
        slidesPerView : 3
        
      },
      
      575:{
        slidesPerView : 2
      }
    }
  });
  
  /*en swiper*/
  
  /**
   * swiper
   */
  let swiperAnimation = new SwiperAnimation();
  let listNewsSlider = new Swiper('.news-list-slider__container', {
    //slidesPerView : 1,
    //loop: true,
    speed: 1000,
    spaceBetween : 10,
    autoplay: {
      delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    on: {
      init: function () {
        swiperAnimation.init(this).animate();
      },
      slideChange: function () {
        swiperAnimation.init(this).animate();
      }
    },
  });
  
  /*en swiper*/
  
  /**
   * form
   */
  
  var inputs = document.querySelectorAll( '.inputfile' );
  Array.prototype.forEach.call( inputs, function( input )
  {
    var label	 = input.nextElementSibling,
        labelVal = label.innerHTML;
    
    input.addEventListener( 'change', function( e )
    {
      var fileName = '';
      if( this.files && this.files.length > 1 )
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      else
        fileName = e.target.value.split( '\\' ).pop();
      
      if( fileName )
        label.querySelector( 'span' ).innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });
  });
  
  var inputsModal = document.querySelectorAll( '.inputfilemodal' );
  Array.prototype.forEach.call( inputsModal, function( input )
  {
    var label	 = input.nextElementSibling,
        labelVal = label.innerHTML;
    
    input.addEventListener( 'change', function( e )
    {
      var fileName = '';
      if( this.files && this.files.length > 1 )
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      else
        fileName = e.target.value.split( '\\' ).pop();
      
      if( fileName )
        label.querySelector( 'span' ).innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });
  });
  
  /*******end inputfile******/
  
  function checkPolicy(checkbox, btn) {
    if ($(checkbox).is(':checked')) {
      $(btn).prop('disabled', false);
      
    } else {
      $(btn).prop('disabled', true);
      
    }
  }
  
  $('.js-policy-1').on('click', function(){
    checkPolicy(this, '.form-btn-1');
  });
  $('.js-policy-2').on('click', function(){
    checkPolicy(this, '.form-btn-2');
  });
  
  $('.form').validate({
    
    submitHandler: function(form){
      
      var formData = new FormData($('.form')[0]),
          xhr = new XMLHttpRequest();
      
      xhr.open("POST", "/send-main.php", true);
      
      //var contactLoaderText = document.querySelector('.contact-form__overlay-text');
      //contactLoaderText.textContent = 'Заявка отправляется...';
      let contactLoader = document.querySelector('.contact-form__overlay');
      contactLoader.style.visibility = 'visible';
      contactLoader.style.opacity = '1';
      
      
      xhr.onprogress = function () {
      
      };
      
      // ready state 4
      xhr.onload = function () {
        if (this.status === 200) {
          //contactLoaderText.textContent = 'Заявка успешно отправлена!';
          setTimeout(function () {
            contactLoader.style.visibility = 'hidden';
            contactLoader.style.opacity = '0';
            form.reset();
            $('.upload-text-reset').text('Прикрепить файл');
          }, 3000);
          
        } else if (this.status === 404) {
          //document.getElementById('error').innerHTML = 'Not Found';
          console.log('Some error');
        }
      }
      
      xhr.onerror = function() {
        console.log('Some error');
      };
      
      xhr.send(formData);
    },
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      }
      
    },
    messages: {
      name: {
        required: "Введите Ваше имя"
      },
      email: {
        required: "Введите адрес электронной почты",
        email: "Не корректный адрес"
      },
      phone: {
        required: "Введите Ваш телефон"
      }
    }
  });
  $('.form-modal').validate({
    
    submitHandler: function(form){
      
      var formData = new FormData($('.form-modal')[0]),
          xhr = new XMLHttpRequest();
      
      xhr.open("POST", "/send-main.php", true);
      
      let contactLoader = document.querySelector('.modal-my__overlay');
      contactLoader.style.visibility = 'visible';
      contactLoader.style.opacity = '1';
      
      
      xhr.onprogress = function () {
      
      }
      
      
      // ready state 4
      xhr.onload = function () {
        if (this.status === 200) {
          
          setTimeout(function () {
            contactLoader.style.visibility = 'hidden';
            contactLoader.style.opacity = '0';
            form.reset();
            $('.upload-text-reset').text('Прикрепить файл');
            $('.modal').modal('hide');
          }, 3000);
          
        } else if (this.status === 404) {
          //document.getElementById('error').innerHTML = 'Not Found';
          console.log('Some error');
        }
      }
      
      xhr.onerror = function() {
        console.log('Some error');
      };
      
      xhr.send(formData);
    },
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      }
      
    },
    messages: {
      name: {
        required: "Введите Ваше имя"
      },
      email: {
        required: "Введите адрес электронной почты",
        email: "Не корректный адрес"
      },
      phone: {
        required: "Введите Ваш телефон"
      }
    }
  });
  /**
   * end form
   */
  
  /* Features needed to make the selectCustom work for mouse users.

- Toggle custom select visibility when clicking the "box"
- Update custom select value when clicking in a option
- Navigate through options when using keyboard up/down
- Pressing Enter or Space selects the current hovered option
- Close the select when clicking outside of it
- Sync both selects values when selecting a option. (native or custom)

*/
  /*
  const elSelectNative = document.getElementsByClassName("js-selectNative")[0];
  const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0];
  const elSelectCustomBox = elSelectCustom.children[0];
  const elSelectCustomOpts = elSelectCustom.children[1];
  const customOptsList = Array.from(elSelectCustomOpts.children);
  const optionsCount = customOptsList.length;
  const defaultLabel = elSelectCustomBox.getAttribute("data-value");
  
  let optionChecked = "";
  let optionHoveredIndex = -1;

// Toggle custom select visibility when clicking the box
  elSelectCustomBox.addEventListener("click", (e) => {
    const isClosed = !elSelectCustom.classList.contains("isActive");
    
    if (isClosed) {
      openSelectCustom();
    } else {
      closeSelectCustom();
    }
  });
  
  function openSelectCustom() {
    elSelectCustom.classList.add("isActive");
    // Remove aria-hidden in case this was opened by a user
    // who uses AT (e.g. Screen Reader) and a mouse at the same time.
    elSelectCustom.setAttribute("aria-hidden", false);
    
    if (optionChecked) {
      const optionCheckedIndex = customOptsList.findIndex(
          (el) => el.getAttribute("data-value") === optionChecked
      );
      updateCustomSelectHovered(optionCheckedIndex);
    }
    
    // Add related event listeners
    document.addEventListener("click", watchClickOutside);
    document.addEventListener("keydown", supportKeyboardNavigation);
  }
  
  function closeSelectCustom() {
    elSelectCustom.classList.remove("isActive");
    
    elSelectCustom.setAttribute("aria-hidden", true);
    
    updateCustomSelectHovered(-1);
    
    // Remove related event listeners
    document.removeEventListener("click", watchClickOutside);
    document.removeEventListener("keydown", supportKeyboardNavigation);
  }
  
  function updateCustomSelectHovered(newIndex) {
    const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
    const option = elSelectCustomOpts.children[newIndex];
    
    if (prevOption) {
      prevOption.classList.remove("isHover");
    }
    if (option) {
      option.classList.add("isHover");
    }
    
    optionHoveredIndex = newIndex;
  }
  
  function updateCustomSelectChecked(value, text) {
    const prevValue = optionChecked;
    
    const elPrevOption = elSelectCustomOpts.querySelector(
        `[data-value="${prevValue}"`
    );
    const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);
    
    if (elPrevOption) {
      elPrevOption.classList.remove("isActive");
    }
    
    if (elOption) {
      elOption.classList.add("isActive");
    }
    
    elSelectCustomBox.innerHTML = text;
    optionChecked = value;
  }
  
  function watchClickOutside(e) {
    const didClickedOutside = !elSelectCustom.contains(event.target);
    if (didClickedOutside) {
      closeSelectCustom();
    }
  }
  
  function supportKeyboardNavigation(e) {
    // press down -> go next
    if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
      let index = optionHoveredIndex;
      e.preventDefault(); // prevent page scrolling
      updateCustomSelectHovered(optionHoveredIndex + 1);
    }
    
    // press up -> go previous
    if (event.keyCode === 38 && optionHoveredIndex > 0) {
      e.preventDefault(); // prevent page scrolling
      updateCustomSelectHovered(optionHoveredIndex - 1);
    }
    
    // press Enter or space -> select the option
    if (event.keyCode === 13 || event.keyCode === 32) {
      e.preventDefault();
      
      const option = elSelectCustomOpts.children[optionHoveredIndex];
      const value = option && option.getAttribute("data-value");
      
      if (value) {
        elSelectNative.value = value;
        updateCustomSelectChecked(value, option.textContent);
      }
      closeSelectCustom();
    }
    
    // press ESC -> close selectCustom
    if (event.keyCode === 27) {
      closeSelectCustom();
    }
  }

// Update selectCustom value when selectNative is changed.
  elSelectNative.addEventListener("change", (e) => {
    const value = e.target.value;
    const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
        `[data-value="${value}"]`
    )[0];
    
    updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
  });

// Update selectCustom value when an option is clicked or hovered
  customOptsList.forEach(function (elOption, index) {
    elOption.addEventListener("click", (e) => {
      const value = e.target.getAttribute("data-value");
      
      // Sync native select to have the same value
      elSelectNative.value = value;
      updateCustomSelectChecked(value, e.target.innerHTML);
      closeSelectCustom();
    });
    
    elOption.addEventListener("mouseenter", (e) => {
      updateCustomSelectHovered(index);
    });
    
    // TODO: Toggle these event listeners based on selectCustom visibility
  });
  */
  
})(jQuery);

