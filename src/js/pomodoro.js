let timerSingleton = (function(){

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

  function reloadCounter(time){
    counter.innerText = time;
  }

  function reloadBreak(){
    breakValue.innerText = breakTime;
  }

  function reloadWork(time){
    workValue.innerText = time;
  }

  function addListeners(){
    addBreak.addEventListener("click", function(){
      if(!checkTimerFlag()){
        breakTime += 5;
        reloadBreak();
      }
    });

    subBreak.addEventListener("click", function(){
      if(!checkTimerFlag()){
        breakTime -= 5;
        reloadBreak();
      }
    });

    addCounter.addEventListener("click", function(){
      if(!checkTimerFlag()){
        time += 5;
        reloadCounter(time);
        reloadWork(time)
      };
    });

    subCounter.addEventListener("click", function(){
      if(!checkTimerFlag()){
        time -= 5;
        reloadCounter(time);
        reloadWork(time);
      }
    });

    counter.addEventListener("click", function(){
      if(interval){
        stopCounter();
      } else{
        startCounter(time);
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
