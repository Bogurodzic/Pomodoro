let timerSingleton = (function(){

  var instance;

  var time = 25;
  var counter = document.getElementById("counter");

  function reload(){
    counter.innerText = time;
  }

  function init(){
    return {
      add: function(){
        time += 5;
      },

      substract: function(){
        time -= 5;
      },

      startCounter: function(fun){
        setInterval(function(){
          time--;
          console.log(time);
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
timer.startCounter();
