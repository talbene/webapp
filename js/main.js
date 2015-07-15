//

function init()  {


 var options = {
 	done: function(json){
 		//console.log(json);
        var text =  json.notification;
        console.log(text);
        var element = document.querySelector(".notifications");
        element.textContent = text;
 	},
 	fail: function(err){
 		console.log(err);
 	}
 };
    UTILS.ajax("data/config.json", options);

}
    window.addEventListener("load", init, false);






//tabs


var tabModule = {

    init: function () {
        this.initEvent();
        //this.toIframe();
    },

    tabNav: function () {

            var tabLink = $(".tabs li a");

            $(tabLink).click(function(event) {

                event.preventDefault();

                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");

                var tabContent = $(".tabContent")
                $(tabContent).removeClass('active');
                $(tabContent).addClass('hide');

                //show target tab content /id
                var target_tab_selector = $(this).attr("href");
                $(target_tab_selector).removeClass("hide");
                $(target_tab_selector).addClass("active");

                //prevent hash jumping and get #href
                var yScroll = document.body.scrollTop;
                window.location.hash = $(this).attr("href");
                document.body.scrollTop = yScroll;
            });
    },


    initEvent: function () {
        UTILS.addEvent(window,"hashchange", this.tabNav);//????
      //  UTILS.addEvent(document.querySelector('#tabs a'),'click', this.tabNav);
    }

};


var formModule = {

    init: function () {
        this.initEvent();
        this.toIframe();
    },

    toLocalStorage: function(){


          var captureValue = [];
          var urlValue = [];
          //  var storage = [];
          var data = [];

          var $captureList = $(".captureInput");
          var $urlList = $(".urlInput");


          $captureList.each(function () {
              captureValue.push(this.value);
          });

          $urlList.each(function () {
              urlValue.push(this.value);
          });


          for (var i = 0; i < captureValue.length; i++) {
             // storage[captureValue[i]] = urlValue[i];
              //localStorage['data']= data[i];
              data[i] = ([captureValue[i], urlValue[i]])
              localStorage.setItem("data" , JSON.stringify(data))
          }

    },

    clearLocalStorage: function() {
            window.localStorage.clear();
    },


    fromLocalStorage: function() {
        if(localStorage.length>0){
        var dataStorage = JSON.parse(localStorage.getItem('data'))
        //    console.log(dataStorage[0][0]);

            for (var i = 0; i < dataStorage.length; i++) {

             //   console.log(dataStorage[i][i]);

                for (var j = 0; j < dataStorage[i].length; j++) {

                    var elementList = document.querySelector(".link");

                      if(j % 2 === 0)

                             {
                                 elementList[i].innerHTML = dataStorage[i][j]
                                 console.log("inner:"+elementList[i].innerHTML)
                             }
                      else
                             {
                                 elementList[i].value = dataStorage[i][j]
                                 console.log("value:"+elementList[i].value)
                             }
                }
            }

        }
    },


    toIframe: function() {

        var elementList = document.querySelector(".link");
        elementList.addEventListener("change", select, false);

        function select(e) {
            e.preventDefault();
            var target = e.target.value;
            var frame = document.querySelector("iframe");
            frame.setAttribute("src", target);

        }

    },

    initEvent: function () {
        UTILS.addEvent(document.querySelector('#saveBtn'),'click', this.toLocalStorage);
        UTILS.addEvent(document.querySelector('#saveBtn'),'click', this.fromLocalStorage);
        UTILS.addEvent(document.querySelector('#clearBtn'),'click', this.clearLocalStorage);
      //  UTILS.addEvent(document.querySelector('.link'),'change', this.toIframe);

    }

};



formModule.init();
tabModule.init();












