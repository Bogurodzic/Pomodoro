let timerSingleton = (function(){

  var instance;

  var interval;
  var timerFlag = false;
  var audio = new Audio('../audio/audio.mp3');

  var timeView = {
    counter: document.getElementById("counter"),
    break: document.getElementById("break-value"),
    work: document.getElementById("work-value")
  }

  var timeValues = {
    break: 5,
    time: 0.10
  }

  var buttons = {
    addBreak: document.getElementById("break-add"),
    subBreak : document.getElementById("break-sub"),
    addCounter : document.getElementById("work-add"),
    subCounter : document.getElementById("work-sub"),
    counter: document.getElementById("counter"),
    stop: document.getElementById("stop")
  }


  reloadBreak();
  reloadCounter(timeValues.time);
  reloadWork(timeValues.time);
  addListeners(buttons);

  function reloadCounter(time){
    timeView.counter.innerText = time;
  }

  function reloadBreak(){
    timeView.break.innerText = timeValues.break;
  }

  function reloadWork(time){
    timeView.work.innerText = time;
  }

  function addListeners(buttons){
    buttons.addBreak.addEventListener("click", function(){
      if(!checkTimerFlag()){
        timeValues.break += 5;
        reloadBreak();
      }
    });

    buttons.subBreak.addEventListener("click", function(){
      if(!checkTimerFlag()){
        timeValues.break -= 5;
        reloadBreak();
      }
    });

    buttons.addCounter.addEventListener("click", function(){
      if(!checkTimerFlag()){
        timeValues.time += 5;
        reloadCounter(timeValues.time);
        reloadWork(timeValues.time)
      };
    });

    buttons.subCounter.addEventListener("click", function(){
      if(!checkTimerFlag()){
        timeValues.time -= 5;
        reloadCounter(timeValues.time);
        reloadWork(timeValues.time);
      }
    });

    buttons.counter.addEventListener("click", function(){
      if(interval){
        stopCounter();
      } else{
        startCounter(timeValues.time);
      }
    });

    buttons.stop.addEventListener("click", function(){
      stopAlarmSound();
    });
  }

  function startCounter(time) {
    console.log("started");
    interval = setInterval(function(){
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
    console.log("cleared");
  }


  function calculateTime(time){
    if(time%1 === 0){
      return time-1+0.59;
    } else if (time%1 !== 0){
      return (time-0.01).toFixed(2);
    }
  }

  function checkRemainingTime(time){
    if (time <= 0){
      alarm();
    }
  }

  function alarm(){
    playAlarmSound();
    stopCounter();
  }

  function playAlarmSound(){
    audio.play();
  }

  function stopAlarmSound(){
    audio.pause();
  }

  function toggleTimerFlag() {
    if (timerFlag===false) {
      timerFlag = true;
    } else if(timerFlag===true) {
      timerFlag = false;
    }
  }

  function checkTimerFlag() {
    if(timerFlag===true){
      return true;
    } else {
      return false;
    }
  }

  function init(){
    return {


    }
  }

  return {
    getInstance: function(){
      if(!instance){
        instance = init();
      }
        return instance;
      }
  }

}());

let timer = timerSingleton.getInstance();
