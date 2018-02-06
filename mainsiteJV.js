    function hideText(tabName){
      var textToHide = document.getElementById(tabName);
      textToHide.style.opacity="0";
      setTimeout(function(){
        textToHide.style.display = "none";
        
      },700);
    }

    function showText(tabName,textCont){
      var textToShow = document.getElementById(tabName);
      textToShow.style.display = "block";
      setTimeout(function(){
      textToShow.style.opacity = "1";
    },400);
    }

    function displayTexts(tabName){
      var textCont = document.getElementById('TextCont');
      var contents = document.getElementsByClassName('content');
      var nameOfVisible = "null";
      $('#'+'butt'+tabName+' a').toggleClass('black');
      for (var i = 0; i< contents.length;i++){
        if(contents[i].style.opacity == 1){
          var nameOfVisible = contents[i].getAttribute('id');
          hideText(nameOfVisible);
          $('#'+'butt'+nameOfVisible+' a').toggleClass('black');
          break;
        }
      }
      if (nameOfVisible == "null"){
        textCont.style.opacity ="0.9";
      }
      if (nameOfVisible == tabName){
        textCont.style.opacity = "0";
        $('#'+'butt'+nameOfVisible+' a').toggleClass('black');
        return;
      }
      showText(tabName);
      setTimeout(function(){
        $("html, body").animate({ scrollTop: 0 },"slow");
      },500);
    }