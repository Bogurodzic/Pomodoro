let timerSingleton = (function(){

  var instance;

  var breakTime = 5;
  var time = 25;

  var counter = document.getElementById("counter");
  var breakValue = document.getElementById("break-value");
  var workValue = document.getElementById("work-value");

  var addBreak = document.getElementById("break-add");
  addBreak.addEventListener("click", function(){
    breakTime += 5;
    reloadBreak();
  })
  var subBreak = document.getElementById("break-sub");
  subBreak.addEventListener("click", function(){
    breakTime -= 5;
    reloadBreak();
  });

  var addCounter = document.getElementById("work-add");
  addCounter.addEventListener("click", function(){
    time += 5;
    reloadCounter();
    reloadWork();
  });
  var subCounter = document.getElementById("work-sub");
  subCounter.addEventListener("click", function(){
    time -= 5;
    reloadCounter();
    reloadWork();
  });

  reloadBreak();
  reloadCounter();
  reloadWork();

  function reloadCounter(){
    counter.innerText = time;
  }

  function reloadBreak(){
    breakValue.innerText = breakTime;
  }

  function reloadWork(){
    workValue.innerText = time;
  }

  function init(){
    return {

      startCounter: function(fun) {
        setInterval(function(){
          time--;
          reload();
        }, 1000);
      }

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
//timer.startCounter();
