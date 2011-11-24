(function($) {
  $.fn.slidingCarousel = function (options) {
      options = $.extend({}, $.fn.slidingCarousel.defaults, options || {});

      var pluginData = {
          container: $(this),
          sinus:   [0],
          images:  null,
          mIndex:  null
      };
      
      var preload = function(callback) {
          var images = pluginData.container.find("img"),
              total = images.length,
              loaded = 0;

          images.each(function (index, element) {
			  var img = new Image();
              $(img).bind('load error', function () {
                  loaded++;

                  if (loaded == total) {
                      var mid = ~~(total / 2)+(total % 2);

                      pluginData.mIndex = mid;
                      pluginData.images = $.map(images, function(val, i) {
                          return { img: val, height: $(val).height(), width: $(val).width() };
                      });

                      // prepare symetric sinus table
                      
                      for (var n=1, freq=0; n<total; n++) {
                          pluginData.sinus[n] = (n<mid) ? Math.sin(freq+=(1.6/mid)) : pluginData.sinus[total-n];
                      };

                      callback(pluginData.images);
                  }
              });
			  img.src = element.src;
          });
      };

      var setupCarousel = function() {
          preload(doLayout);
          setupEvents();
      };
          
      var setupEvents = function() {
          $('#carousel-right').click(function() {
              var images = pluginData.images;

              images.splice(0,0,images.pop());
              doLayout(images, true);
          });
          $('#carousel-left').click(function() {
              var images = pluginData.images;

              images.push(images.shift());
              doLayout(images, true);
          });
      };

      var doLayout = function(images, animate) {
          var mid  = pluginData.mIndex,
              sin  = pluginData.sinus,
              posx = 0,
              diff = 0, 
              hiff = 0,
              height = images[mid-1].height, top, idx, img, j=1;

          // hide description before doing layout
          pluginData.container.find('.carousel-caption').hide();


          $.each(images, function(i,e) {
              img = $(e.img);
              idx = Math.abs(i+1-mid);
              top = idx * options.hDiff;

              diff = sin[i] * options.wDiff;
              hiff = e.height - (height-(top*3));

              e.wd = e.width - hiff;

              if (animate) {
                  img.animate({
                      height   : height - (top*2),
                      zIndex   : mid-idx,
                      top      : top,          
                      left     : posx += (i < mid) ? diff : images[i-1].wd + diff - (e.width - hiff), 
                      opacity  : ((i+1) % mid) ? sin[j++]*0.8 : 1
                  }, options.animate, function() {
                      addDescription($(images[mid-1].img));
                  });
              }
              else
              {
                  img.css({
                      zIndex   : mid-idx,
                      height   : height - (top*2),
                      top      : top, 
                      left     : posx += (i < mid) ? diff : images[i-1].wd + diff - (e.width - hiff), 
                      opacity  : 0
                  }).show().animate({opacity: ((i+1) % mid) ? sin[j++]*0.8 : 1});

                  if (options.shadow)
                      img.addClass('shadow');
                  if (i == mid-1)
                      addDescription(img);
              }
          });
      };

      var addDescription = function(img) {
          var caption = img.closest('.slide').find('.carousel-caption');
          var position = img.position();

          caption.css('width', img.width()).css({
              top: position.top + img.height()-$(caption).height(),
              left: position.left,
              opacity: 0
          }).show().animate({opacity: 0.8});
          
      };

      this.initialize = function () {
          setupCarousel();
      };

      // Initialize the plugin
      return this.initialize();

  };

  $.fn.slidingCarousel.defaults = {
      hDiff: 15,
      wDiff: 124,
      shadow: true,
      animate: 250
  };

})(jQuery);
