$(document).ready(function() {

  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });

  $('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
  });
  

  $(".call-menu").on("click", function(){
    $("nav").slideToggle(250);
    $(".backdrop").toggleClass("backdrop-active");
  });

  $(".backdrop").on("click", function(){
    $("nav").slideUp(250);
    $(this).removeClass("backdrop-active");
  });

  
  $('.single').slick({
    arrows: true,
    dots: true,
    touchMove: true,
  });

  $('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    centerMode: true,
    variableWidth: true,
    infinite: true,
    focusOnSelect: true,
    cssEase: 'linear',
    touchMove: true,
    prevArrow: '<button class="slick-prev">  </button>',
    nextArrow: '<button class="slick-next">  </button>',
});

var imgs = $('.slider img');
imgs.each(function () {
    var item = $(this).closest('.item');
    item.css({
        'background-image': 'url(' + $(this).attr('data-src') + ')',
        'background-position': 'center',
        '-webkit-background-size': 'cover',
        'background-size': 'cover',
    });
    $(this).hide();
});

  
function init(elem, options){
	elem.addClass('countdownHolder');

	// Создаем разметку внутри контейнера
	$.each(['Days','Hours','Minutes','Seconds'],function(i){
		$('<span class="count'+this+'">').html(
			'<span class="position">\
				<span class="digit static">0</span>\
			</span>\
			<span class="position">\
				<span class="digit static">0</span>\
			</span>'
		).appendTo(elem);
		
		if(this!="Seconds"){
			elem.append('<span class="countDiv countDiv'+i+'"></span>');
		}
	});

}

  // Создаем анимированный переход между двумя цифрами
  function switchDigit(position,number){
    
    var digit = position.find('.digit')
    
    if(digit.is(':animated')){
      return false;
    }
    
    if(position.data('digit') == number){
      // Мы уже вывели данную цифру
      return false;
    }
    
    position.data('digit', number);
    
    var replacement = $('<span>',{
      'class':'digit',
      css:{
        top:'-2.1em',
        opacity:0
      },
      html:number
    });
    
    
    digit
      .before(replacement)
      .removeClass('static')
      .animate({top:'2.5em',opacity:0},'fast',function(){
        digit.remove();
      })

    replacement
      .delay(100)
      .animate({top:0,opacity:1},'fast',function(){
        replacement.addClass('static');
      });
  }

  (function($){
    
    // Количество секунд в каждом временном отрезке
    var days	= 24*60*60,
      hours	= 60*60,
      minutes	= 60;
    
    // Создаем плагин
    $.fn.countdown = function(prop){
      
      var options = $.extend({
        callback	: function(){},
        timestamp	: 0
      },prop);
      
      var left, d, h, m, positions;

      // инициализируем плагин
      init(this, options);
      
      positions = this.find('.position');
      
      (function tick(){
        
        // Осталось времени
        left = Math.floor((options.timestamp - (new Date())) / 1000);
        
        if(left < 0){
          left = 0;
        }
        
        // Осталось дней
        d = Math.floor(left / days);
        updateDuo(0, 1, d);
        left -= d*days;
        
        // Осталось часов
        h = Math.floor(left / hours);
        updateDuo(2, 3, h);
        left -= h*hours;
        
        // Осталось минут
        m = Math.floor(left / minutes);
        updateDuo(4, 5, m);
        left -= m*minutes;
        

        
        // Вызываем возвратную функцию пользователя
        options.callback(d, h, m, );
        
        // Планируем следующий вызов данной функции через 1 секунду
        setTimeout(tick, 1000);
      })();
      
      // Данная функция обновляет две цифровые позиции за один раз
      function updateDuo(minor,major,value){
        switchDigit(positions.eq(minor),Math.floor(value/10)%10);
        switchDigit(positions.eq(major),value%10);
      }
      
      return this;
    };


    // Здесь размещаются две вспомогательные функции

  })(jQuery);

  $(function(){
	
    var note = $('#note'),
      ts = new Date(2020, 5, 1),
      newYear = true;
    
    if((new Date()) > ts){
      // Задаем точку отсчета для примера. Пусть будет очередной Новый год или дата через 10 дней.
      // Обратите внимание на *1000 в конце - время должно задаваться в миллисекундах
      ts = (new Date()).getTime() + 10*24*60*60*1000;
      newYear = false;
    }
      
    $('#countdown').countdown({
      timestamp	: ts,
      callback	: function(days, hours, minutes){
        
        var message = "";
        
        message += "Дней: " + days +", ";
        message += "часов: " + hours + ", ";
        message += "минут: " + minutes + " и ";
        
        
        note.html(message);
      }
    });
    
  });
});