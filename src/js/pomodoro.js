let timerSingleton = (function(){

  var instance;

  var interval;
  var timerFlag = false;

  var timeView = {
    counter: document.getElementById("counter"),
    break: document.getElementById("break-value"),
    work: document.getElementById("work-value")
  }

  var timeValues = {
    break: 5,
    time: 25
  }

  var buttons = {
    addBreak: document.getElementById("break-add"),
    subBreak : document.getElementById("break-sub"),
    addCounter : document.getElementById("work-add"),
    subCounter : document.getElementById("work-sub"),
    counter: document.getElementById("counter")
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
  }

  function startCounter(time) {
    console.log("started");
    interval = setInterval(function(){
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
