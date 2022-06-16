(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _burgerMenu = _interopRequireDefault(require("./components/burger-menu"));

var _tabs = _interopRequireDefault(require("./components/tabs"));

var _slider = _interopRequireDefault(require("./components/slider"));

var _scrollTo = _interopRequireDefault(require("./components/scroll-to"));

var _headerFix = _interopRequireDefault(require("./components/header-fix"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.
(function ($) {
  // When DOM is ready
  $(function () {
    var accordions = new _accordion["default"]();

    _burgerMenu["default"].init();

    _tabs["default"].init();

    _scrollTo["default"].init();

    (0, _slider["default"])();

    _headerFix["default"].init();

    _headerFix["default"].scrollHandler();

    var hash = window.location.hash.slice(1);

    if (hash) {
      _scrollTo["default"].top(hash);
    }

    $('.js-more').on('click', function () {
      $('.js-roadmap').addClass('active');
      $(this).hide();
    }); //video
    // $('.video').parent().click(function () {
    //   if ($(this).children(".video").get(0).paused) {
    //     $(this).children(".video").get(0).play();
    //     $(this).children(".playpause").fadeOut();
    //   } else {
    //     $(this).children(".video").get(0).pause();
    //     $(this).children(".playpause").fadeIn();
    //   }
    // });
  });
})(jQuery);

},{"./components/accordion":2,"./components/burger-menu":3,"./components/header-fix":4,"./components/scroll-to":5,"./components/slider":6,"./components/tabs":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_WRAP = 'js-accordion-wrap';
var CLASS_ACCORDION = 'js-accordion';
var CLASS_HEAD = 'js-accordion-head';
var CLASS_OPENER = 'js-accordion-open';
var CLASS_CONTENT = 'js-accordion-content';
var CLASS_DESCRIPTION = 'js-accordion-descr';
var CLASS_OPEN = 'js-open';
var CLASS_ACTIVE = 'active';

function initAccordion() {
  var accordionList = document.querySelectorAll(".".concat(CLASS_ACCORDION));
  var openList = document.querySelectorAll(".".concat(CLASS_ACCORDION, ".").concat(CLASS_OPEN));

  if (accordionList.length) {
    accordionList.forEach(function (accordion) {
      var wrap = accordion.closest(".".concat(CLASS_WRAP));
      var open = accordion.querySelector(".".concat(CLASS_OPENER));
      open.addEventListener('click', function (e) {
        var target = e.target;
        var btn = target.closest(".".concat(CLASS_OPENER));
        var head = target.closest(".".concat(CLASS_HEAD));
        var trigger = head ? head : btn;

        if (wrap && wrap.getAttribute('data-only') != undefined) {
          var group = wrap.querySelector(".".concat(CLASS_ACCORDION)).getAttribute('data-group');
          var contentList = [];

          if (group) {
            var currentAccordionList = wrap.querySelectorAll("[data-group=\"".concat(group, "\"]"));
            currentAccordionList.forEach(function (accordion) {
              contentList.push(accordion.querySelector(".".concat(CLASS_CONTENT)));
            });
          } else {
            contentList = wrap.querySelectorAll(".".concat(CLASS_CONTENT));
          }

          showAccordion(trigger, contentList, false);
        } else {
          showAccordion(trigger);
        }
      });
    });
    resize();
  }

  if (openList.length) {
    clickAccordion(openList);
  }

  function getDesctiptionHeight(currentAccordion) {
    var description = currentAccordion.querySelector(".".concat(CLASS_DESCRIPTION));
    var height = description.offsetHeight;
    var computedStyle = window.getComputedStyle(description);
    var marginTop = +computedStyle.marginTop.replace('px', '');
    var marginBottom = +computedStyle.marginBottom.replace('px', '');
    return height + marginTop + marginBottom;
  }

  function showAccordion(head) {
    var contentAccordion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var currentContent = head.nextElementSibling;
    var parent = currentContent.closest(".".concat(CLASS_ACCORDION));

    if (head.classList.contains(CLASS_ACTIVE)) {
      head.classList.remove(CLASS_ACTIVE);
      parent.classList.remove(CLASS_ACTIVE);
      currentContent.style.maxHeight = '0';
    } else {
      var changeParent = function changeParent(el) {
        parentDescription = el.closest(".".concat(CLASS_DESCRIPTION));

        if (parentDescription) {
          paretnContent = parentDescription.closest(".".concat(CLASS_CONTENT));
        } else {
          paretnContent = null;
        }
      };

      if (!all && contentAccordion.length) {
        contentAccordion.forEach(function (content) {
          content.previousElementSibling.classList.remove(CLASS_ACTIVE);
          content.style.maxHeight = '0';
        });
      }

      var heightDescription = getDesctiptionHeight(currentContent);
      var parentDescription;
      var paretnContent;
      changeParent(currentContent);

      if (paretnContent) {
        do {
          var oldHeight = paretnContent.scrollHeight;
          paretnContent.style.maxHeight = "".concat(oldHeight + heightDescription, "px");
          changeParent(paretnContent);
        } while (paretnContent);
      }

      head.classList.add(CLASS_ACTIVE);
      parent.classList.add(CLASS_ACTIVE);
      currentContent.style.maxHeight = heightDescription + 'px';
    }
  }

  function updateResize() {
    var activeAccordions = document.querySelectorAll(".".concat(CLASS_ACCORDION, ".").concat(CLASS_ACTIVE));
    var activeOpeners = document.querySelectorAll(".".concat(CLASS_OPENER, ".").concat(CLASS_ACTIVE));
    var activeHeads = document.querySelectorAll(".".concat(CLASS_HEAD, ".").concat(CLASS_ACTIVE));
    var activeContents = document.querySelectorAll(".".concat(CLASS_CONTENT, ".").concat(CLASS_ACTIVE));

    if (activeOpeners.length) {
      activeOpeners.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
    }

    if (activeHeads.length) {
      activeHeads.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
    }

    if (activeContents.length) {
      activeContents.forEach(function (el) {
        el.classList.remove(".".concat(CLASS_ACTIVE));
        el.style.maxHeight = '0';
      });
    }

    if (activeAccordions.length) {
      activeAccordions.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
      clickAccordion(activeAccordions);
      clickAccordion(activeAccordions);
    }
  }

  function clickAccordion(list) {
    list.forEach(function (open) {
      var btn = open.querySelector(".".concat(CLASS_OPENER));

      if (btn) {
        btn.click();
      }
    });
  }

  function resize() {
    var changed = false;
    window.addEventListener('resize', function () {
      if (changed !== false) {
        clearTimeout(changed);
      }

      changed = setTimeout(updateResize, 200);
    });
  }
}

var _default = initAccordion;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var BURGER = document.querySelector('.js-burger-open');
var NAV = document.querySelector('.js-burger');
var BODY = document.querySelector('body');
var CLASS_OVERFLOW = 'overflow';
var CLASS_ACTIVE = 'active';

var burgerMenu = function () {
  var burgeInit = function burgeInit() {
    if (!BURGER) return;
    BURGER.addEventListener('click', function (e) {
      if (!e.currentTarget.classList.contains('active')) {
        openBurger();
      } else {
        closeBurger();
      }
    });
  };

  var openBurger = function openBurger() {
    BURGER.classList.add(CLASS_ACTIVE);
    NAV.classList.add(CLASS_ACTIVE);
    BODY.classList.add(CLASS_OVERFLOW);
  };

  var closeBurger = function closeBurger() {
    BURGER.classList.remove(CLASS_ACTIVE);
    NAV.classList.remove(CLASS_ACTIVE);
    BODY.classList.remove(CLASS_OVERFLOW);
  };

  var init = function init() {
    burgeInit();
  };

  return {
    init: init,
    closeBurger: closeBurger
  };
}();

var _default = burgerMenu;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var HEADER = document.querySelector('.js-fixed-header');
var CLASS_FIXED = 'fixed';
var heightScroll = 1;

var headerFixed = function () {
  function scrollHandler() {
    if (scrollY >= heightScroll) {
      HEADER.classList.add(CLASS_FIXED);
    } else {
      HEADER.classList.remove(CLASS_FIXED);
    }
  }

  var headerFixedInit = function headerFixedInit() {
    if (!HEADER) return;
    window.addEventListener('scroll', scrollHandler);
  };

  var init = function init() {
    headerFixedInit();
  };

  return {
    init: init,
    scrollHandler: scrollHandler
  };
}();

var _default = headerFixed;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// const ACTIVE = 'active';
var NAV_LINKS = document.querySelectorAll('.js-link-to');

var scrollTo = function () {
  var initScroll = function initScroll() {
    if (!NAV_LINKS.length) return;
    NAV_LINKS.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = e.currentTarget;
        var currentPathLocation = window.location.pathname;

        if (currentPathLocation.length === 1) {
          e.preventDefault();
          var hash = target.getAttribute('href').match(/(?<=#)\w+/g)[0];
          window.location.hash = "#" + hash;
          top(hash);
        }
      });
    });
  };

  var top = function top(id) {
    var scrollTarget = document.querySelector("[data-anchor-id=\"".concat(id, "\"]"));
    if (!scrollTarget) return;
    var topOffset = 0;
    var fixHeader = document.querySelector('.js-fixed-header');

    if (fixHeader) {
      topOffset = fixHeader.offsetHeight;
    }

    var elementPosition = scrollTarget.getBoundingClientRect().top;
    var offsetPosition = elementPosition - topOffset;
    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  var init = function init() {
    initScroll();
  };

  return {
    init: init,
    top: top
  };
}();

var _default = scrollTo;
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function initSwiper() {
  //slider
  var partnerSlider = document.querySelector('.js-partner-slider');

  if (partnerSlider) {
    var slider1 = new Swiper('.js-partner-slider', {
      slidesPerView: "auto",
      spaceBetween: 25,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      on: {
        init: function init() {
          $(".swiper-progress-bar-partner").removeClass("animate");
          $(".swiper-progress-bar-partner").removeClass("active");
          $(".swiper-progress-bar-partner").eq(0).addClass("animate");
          $(".swiper-progress-bar-partner").eq(0).addClass("active");
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $(".swiper-progress-bar-partner").removeClass("animate");
          $(".swiper-progress-bar-partner").removeClass("active");
          $(".swiper-progress-bar-partner").eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $(".swiper-progress-bar-partner").eq(0).addClass("animate");
        }
      }
    });
  } ////


  var blogSlider = document.querySelector('.js-blog-slider');

  if (blogSlider) {
    var slider2 = new Swiper('.js-blog-slider', {
      slidesPerView: "auto",
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      on: {
        init: function init() {
          $(".swiper-progress-bar-blog").removeClass("animate");
          $(".swiper-progress-bar-blog").removeClass("active");
          $(".swiper-progress-bar-blog").eq(0).addClass("animate");
          $(".swiper-progress-bar-blog").eq(0).addClass("active");
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $(".swiper-progress-bar-blog").removeClass("animate");
          $(".swiper-progress-bar-blog").removeClass("active");
          $(".swiper-progress-bar-blog").eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $(".swiper-progress-bar-blog").eq(0).addClass("animate");
        }
      }
    });
  } ////


  var teamSlider = document.querySelector('.js-team-slider');
  var bindedTextSliders = Array.from(document.querySelectorAll(".js-slider-info"));

  if (teamSlider) {
    var slider3 = new Swiper('.js-team-slider', {
      slidesPerView: 1,
      loop: true,
      centeredSlides: false,
      updateOnWindowResize: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1024: {
          spaceBetween: 30,
          slidesPerView: 5,
          loopedSlides: 5,
          slideToClickedSlide: true
        }
      },
      on: {
        slideChange: function slideChange(swiper) {
          var slides = swiper.slides;
          var activeSlideIndex = swiper.activeIndex;
          var activeSlideNode = slides[activeSlideIndex];
          var bindText = activeSlideNode.dataset.bindText;
          var foundText = bindedTextSliders.find(function (text) {
            return text.dataset.bindSlider === bindText;
          });
          bindedTextSliders.forEach(function (text) {
            return text.classList.remove("active");
          });
          foundText.classList.add("active");
        }
      }
    });
  } /////


  var caseSlider = document.querySelector('.js-case-slider');

  if (caseSlider) {
    var slider4 = new Swiper('.js-case-slider', {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 40,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      on: {
        init: function init() {
          $(".swiper-progress-bar-case").removeClass("animate");
          $(".swiper-progress-bar-case").removeClass("active");
          $(".swiper-progress-bar-case").eq(0).addClass("animate");
          $(".swiper-progress-bar-case").eq(0).addClass("active");
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $(".swiper-progress-bar-case").removeClass("animate");
          $(".swiper-progress-bar-case").removeClass("active");
          $(".swiper-progress-bar-case").eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $(".swiper-progress-bar-case").eq(0).addClass("animate");
        }
      }
    });
  }
}

var _default = initSwiper;
exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_ACTIVE = 'active';
var wrapList = document.querySelectorAll('.js-tabs');

var tabs = function () {
  var tabsInit = function tabsInit() {
    if (!wrapList.length) return;
    wrapList.forEach(function (wrap) {
      return attachEvents(wrap);
    });

    function attachEvents(parent) {
      var tabList = parent.querySelectorAll('[data-tab]'),
          contentList = parent.querySelectorAll('[data-content]');
      if (!tabList.length) return;
      tabList.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          tabList.forEach(function (btn) {
            return btn.classList.remove(CLASS_ACTIVE);
          });
          e.currentTarget.classList.add(CLASS_ACTIVE);
          var idContent = e.currentTarget.dataset.tab;

          if (idContent === 'all') {
            contentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          } else {
            var currentContentList = document.querySelectorAll("[data-content=\"".concat(idContent, "\"]"));
            contentList.forEach(function (content) {
              return content.classList.remove(CLASS_ACTIVE);
            });
            currentContentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          }
        });
      });
    }
  };

  var init = function init() {
    tabsInit();
  };

  return {
    init: init
  };
}();

var _default = tabs;
exports["default"] = _default;

},{}]},{},[1]);
