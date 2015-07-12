        exportData: function() {
            if (Modernizr.localstorage) {
                var $panels = $('#quick-reports-panel, #my-team-folders-panel'),
                data = [];

                $.each($panels, function(i, val) {
                    var $panel = $(val),
                        formHtml = $panel.html(),
                        $inputs = $panel.find('.form-group input'),
                        selectedIndex = $panel.find('select')[0].selectedIndex,
                        formValues = [];

                    for (var j = 0; j < $inputs.length; j++) {
                        var input = $inputs[j];
                            formValues.push(input.value);

                    }

                    data[i] = [formHtml, selectedIndex, formValues];

                });

                if (localStorage.setItem('data', JSON.stringify(data))) {
                    localStorage.setItem('data', JSON.stringify(data));
                }
            }
        },



              (function() {

                  data = ([captureValue[i], urlValue[i]])
                  alert(data);
                 ;
              })(i);
              localStorage.setItem("data" , JSON.stringify(data))
          }


          $(window).on('hashchange', function(){
            console.log("localhost:63342/webapp/index.html" + window.location.hash);
            event.preventDefault();
        })
    }
};





tabNav: function () {

        $('#tabs li> a').click(function () {

            //get displaying tab
            var active_tab_selector = $('#tabs li.active>a').attr('href');


            //find actived - remove 'active' css
            var actived_nav = $('#tabs li.active');
            actived_nav.removeClass('active');


            //add 'active' css to li
            $(this).parents('li').addClass('active');


            //hide displaying tab content
            $(active_tab_selector).removeClass('active');
            $(active_tab_selector).addClass('hide');

            //show target tab content /id
            var target_tab_selector = $(this).attr('href');
            $(target_tab_selector).removeClass('hide');
            $(target_tab_selector).addClass('active');

            var yScroll = document.body.scrollTop;
            window.location.hash = $(this).attr('href');
            document.body.scrollTop = yScroll;

            //stop browser to take action for clicked anchor
            event.preventDefault();
        });
    },



    initEvent: function () {
        UTILS.addEvent(window,'hashchange', this.tabNav);//????
      //  UTILS.addEvent(document.querySelector('#tabs li>a'),'click', this.tabNav);
    }

}