/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pomodoro = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var timerSingleton = function () {

  var instance;

  var interval;
  var timerFlag = false;

  var breakTime = 5;
  var time = 25;

  var counter = document.getElementById("counter");
  var breakValue = document.getElementById("break-value");
  var workValue = document.getElementById("work-value");

  var addBreak = document.getElementById("break-add");
  var subBreak = document.getElementById("break-sub");
  var addCounter = document.getElementById("work-add");
  var subCounter = document.getElementById("work-sub");

  reloadBreak();
  reloadCounter(time);
  reloadWork(time);
  addListeners();

  function reloadCounter(time) {
    counter.innerText = time;
  }

  function reloadBreak() {
    breakValue.innerText = breakTime;
  }

  function reloadWork(time) {
    workValue.innerText = time;
  }

  function addListeners() {
    addBreak.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        breakTime += 5;
        reloadBreak();
      }
    });

    subBreak.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        breakTime -= 5;
        reloadBreak();
      }
    });

    addCounter.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        time += 5;
        reloadCounter(time);
        reloadWork(time);
      };
    });

    subCounter.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        time -= 5;
        reloadCounter(time);
        reloadWork(time);
      }
    });

    counter.addEventListener("click", function () {
      if (interval) {
        stopCounter();
      } else {
        startCounter(time);
      }
    });
  }

  function startCounter(time) {
    console.log("started");
    interval = setInterval(function () {
      time--;
      reloadCounter(time);
    }, 1000);
    toggleTimerFlag();
  }

  function stopCounter() {
    clearInterval(interval);
    interval = undefined;
    toggleTimerFlag();
    console.log("cleared");
  }

  function toggleTimerFlag() {
    if (timerFlag === false) {
      timerFlag = true;
    } else if (timerFlag === true) {
      timerFlag = false;
    }
  }

  function checkTimerFlag() {
    if (timerFlag === true) {
      return true;
    } else {
      return false;
    }
  }

  function init() {
    return {};
  }

  return {
    getInstance: function getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
}();

var timer = timerSingleton.getInstance();

/***/ })
/******/ ]);