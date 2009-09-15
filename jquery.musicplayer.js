// simple music player
// (c) 2009 Jakub Steiner
// MIT licensed.

(function ($) {
  $.fn.musicPlayer = function () {
    $(this).each(function () {
      var a = document.createElement("audio");
      if (a.play) {
        var link = $(this).attr('href');
        $(this).append('<audio>').children('audio')
                .append("<source type='audio/ogg' src='"+link+"'>")
                .append("<source type='audio/mpeg' src='"+link.replace(/ogg$/gi,"mp3")+"'>");
        $(this).click(function () {
          var $au = $("audio", this);
          $(this).parents("ul").find('a').removeClass('playing');
          if ($au.get(0).paused) {
            $(this).parent().siblings().find('a>audio').each(function () {
              $(this).get(0).pause();
              $(this).get(0).currentTime = 0.0; //stop instead of pausing
            });
            $au.get(0).play();
            $au.get(0).addEventListener("timeupdate", function() { 
              $("#musicplayer-info").playbackInfo(this);
            }, true);
            $au.get(0).addEventListener("ended", function() {
              $(this).parent().removeClass('playing');
              $("#musicplayer-info").empty();
            }, true);
            $(this).addClass('playing');
          } else {
            $au.get(0).pause();
            $au.get(0).currentTime = 0.0; //stop instead of pausing

          }
          return false;
        });
      }
      
      return $(this);
    });
  };
  $.fn.playbackInfo = function (a) {
    var m = Math.floor(Math.round(a.currentTime)/60);
    var s = Math.round(a.currentTime) - (m * 60);
    var dm = Math.floor(Math.round(a.duration)/60);
    var ds = Math.round(a.duration) - (dm * 60);

    //js doesn't have sprintf? :/
    m = m<=9 ? "0"+m : m;
    s = s<=9 ? "0"+s : s;
    dm = dm<=9 ? "0"+dm : dm;
    ds = ds<=9 ? "0"+ds : ds;
    
    $(this).empty().html("Playing: " + m + ":" + s + " of "+ dm + ":" + ds);
    return $(this);
  }
})(jQuery);
