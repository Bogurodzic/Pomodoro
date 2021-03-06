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
  var breakNext = false;
  var audio = new Audio('../audio/audio.mp3');

  var timeView = {
    counter: document.getElementById("counter"),
    break: document.getElementById("break-value"),
    work: document.getElementById("work-value")
  };

  var timeValues = {
    break: 2.00,
    time: 25.00
  };

  var buttons = {
    addBreak: document.getElementById("break-add"),
    subBreak: document.getElementById("break-sub"),
    addCounter: document.getElementById("work-add"),
    subCounter: document.getElementById("work-sub"),
    counter: document.getElementById("counter"),
    stop: document.getElementById("stop")
  };

  reloadBreak();
  reloadCounter(timeValues.time);
  reloadWork(timeValues.time);
  addListeners(buttons);

  function reloadCounter(time) {
    timeView.counter.innerText = time;
  }

  function reloadBreak() {
    timeView.break.innerText = timeValues.break;
  }

  function reloadWork(time) {
    timeView.work.innerText = time;
  }

  function addListeners(buttons) {
    buttons.addBreak.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        timeValues.break += 5;
        reloadBreak();
      }
    });

    buttons.subBreak.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        timeValues.break -= 5;
        reloadBreak();
      }
    });

    buttons.addCounter.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        timeValues.time += 5;
        reloadCounter(timeValues.time);
        reloadWork(timeValues.time);
      };
    });

    buttons.subCounter.addEventListener("click", function () {
      if (!checkTimerFlag()) {
        timeValues.time -= 5;
        reloadCounter(timeValues.time);
        reloadWork(timeValues.time);
      }
    });

    buttons.counter.addEventListener("click", function () {
      if (interval) {
        stopCounter();
      } else {
        if (checkBreak()) {
          startCounter(timeValues.break);
        } else if (!checkBreak()) {
          startCounter(timeValues.time);
        }
      }
    });

    buttons.stop.addEventListener("click", function () {
      stopAlarmSound();
      changeBreakNext();
      if (checkBreak()) {
        reloadCounter(timeValues.break);
      } else if (!checkBreak()) {
        reloadCounter(timeValues.time);
      }
    });
  }

  function startCounter(time) {
    interval = setInterval(function () {
      time = calculateTime(time);
      reloadCounter(time);
      checkRemainingTime(time);
    }, 1000);
    toggleTimerFlag();
  }

  function stopCounter() {
    clearInterval(interval);
    interval = undefined;
    toggleTimerFlag();
  }

  function calculateTime(time) {
    if (time % 1 === 0) {
      return time - 1 + 0.59;
    } else if (time % 1 !== 0) {
      return (time - 0.01).toFixed(2);
    }
  }

  function checkRemainingTime(time) {
    if (time <= 0) {
      alarm();
    }
  }

  function alarm() {
    toggleStopButton();
    playAlarmSound();
    stopCounter();
  }

  function playAlarmSound() {
    audio.play();
  }

  function stopAlarmSound() {
    toggleStopButton();
    audio.pause();
    changeMode();
  }

  function changeMode() {
    var clockText = document.getElementById("clock-text");
    if (!checkBreak()) {
      changeClockText(clockText, "Break Time:");
    } else if (checkBreak()) {
      changeClockText(clockText, "Remaining Time:");
    }
  }

  function changeClockText(ele, text) {
    ele.innerText = text;
  }

  function toggleTimerFlag() {
    if (!timerFlag) {
      timerFlag = true;
    } else if (timerFlag) {
      timerFlag = false;
    }
  }

  function checkTimerFlag() {
    if (timerFlag) {
      return true;
    } else {
      return false;
    }
  }

  function changeBreakNext() {
    if (!breakNext) {
      breakNext = true;
    } else if (breakNext) {
      breakNext = false;
    }
  }

  function toggleStopButton() {
    buttons.stop.classList.toggle("stop-button--hidden");
  }

  function checkBreak() {
    if (breakNext) {
      return true;
    } else if (!breakNext) {
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