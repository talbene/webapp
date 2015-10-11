//

function init()  {

     var options = {
        done: function(json){
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

tabModule = {

    init: function () {
        this.tabNav();
        this.initEvent();
    },

    tabNav: function () {

            var tabLink = $(".tabs li a");

            $(tabLink).click(function(event) {

                event.preventDefault();

                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");

                var tabContent = $(".tabContent")
                $(tabContent).removeClass("active");
                $(tabContent).addClass("hide");

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
      //  UTILS.addEvent(document.querySelector("#tabs a"),"click", this.tabNav);
    }

};


formModule = {

    init: function () {
        this.initEvent();
        this.toIframe();

    },

    toLocalStorage: function(){

          var captureValue = [];
          var urlValue = [];
          //  var storage = [];
          var data = [];

          var $currentsaveBtn = $(this).closest('div').parent();

          var $captureList = $currentsaveBtn.find(".captureInput");
          var $urlList = $currentsaveBtn.find(".urlInput");

          $captureList.each(function () {
              captureValue.push(this.value);
          });

          $urlList.each(function () {
              urlValue.push(this.value);
          });

          for (var i = 0; i < captureValue.length; i++) {
             // storage[captureValue[i]] = urlValue[i];
              //localStorage["data"]= data[i];
              data[i] = ([captureValue[i], urlValue[i]]);
              localStorage.setItem("data" , JSON.stringify(data))
          }
    },

    clearLocalStorage: function() {
            window.localStorage.clear();
    },

    fromLocalStorage: function() {

        if(localStorage.length>0) {

            var dataStorage = JSON.parse(localStorage.getItem("data"))

            var $currentsaveBtn = $(this).closest('div').parent();
            var $currentOption = $currentsaveBtn.find('select').children();


                for (var i = 0; i < dataStorage.length; i++) {


                    for (var j = 0; j < dataStorage[i].length; j++) {


                        if (j % 2 === 0) {
                            ($currentOption.eq(i)).text(dataStorage[i][j])
                        }
                        else {
                            ($currentOption.eq(i)).val(dataStorage[i][j])
                         }
                    }
                 }
        }
    },

    toIframe: function() {

        var $currentSelect = $(this).closest('div').parent();
        var $target = $currentSelect.find('select').val();
        $currentSelect.find('iframe').attr("src", $target);

    },

    toNewWindow: function() {
       var $currentbtnExpand = $(this).closest('div');
       var $currentIframe = $($currentbtnExpand).find('iframe');
       window.open(($currentIframe).attr("src"));
    },

    formHide: function() {
        var $currentclearBtn = $(this).closest(".tabContent");
        $currentclearBtn.children(".form").hide();
    },

    formToggel: function() {
        var $currentbtnSetting = $(this).closest(".tabContent");
        $currentbtnSetting.children(".form").toggle();
    },



    initEvent: function () {

      $('.saveBtn').on('click', this.toLocalStorage) ;
      $('.saveBtn').on('click', this.fromLocalStorage) ;
      $('.clearBtn').on('click', this.clearLocalStorage) ;
      $('.clearBtn').on('click', this.formHide) ;
      $('.btnExpand').on('click', this.toNewWindow) ;
      $('.btnSetting').on('click', this.formToggel) ;
      $('select').on('change', this.toIframe) ;
        /* UTILS.addEvent(document.querySelector(".saveBtn"), "click", this.toLocalStorage);
             UTILS.addEvent(document.querySelector(".saveBtn"), "click", this.fromLocalStorage);
              UTILS.addEvent(document.querySelector(".clearBtn"), "click", this.clearLocalStorage);
              UTILS.addEvent(document.querySelector(".clearBtn"), "click", this.formHide);
              UTILS.addEvent(document.querySelector(".btnExpand"), "click", this.toNewWindow);
              UTILS.addEvent(document.querySelector(".btnSetting"), "click", this.formToggel);*/
    }
};



tabModule.init();
formModule.init();











