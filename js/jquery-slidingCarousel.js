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
              total  = images.length,
              result = [],
              loaded = 0;

          images.each(function (index, element) {
			  var img = new Image();

              $(img).bind('load error', function () {
                  loaded++;

                  // push loaded images into regular array
                  result.push(element);

                  // need ratio for calculating new widths
                  element.ratio = this.width / this.height;
                  element.origH = this.height;

                  if (loaded == total) {
                      var mid = ~~(total / 2)+(total % 2);

                      pluginData.mIndex = mid;
                      pluginData.images = result;

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
              height = images[mid-1].origH, top, idx, j=1;

          // hide description before doing layout
          pluginData.container.find('.carousel-caption').hide();

          $.each(images, function(i, img) {
              idx = Math.abs(i+1-mid);
              top = idx * options.hDiff;

              diff = sin[i] * options.wDiff;

              // calculating new width and caching it for later use
              img.cWidth = (height-(top*2)) * img.ratio;

              if (animate) {
                  $(img).animate({
                      height   : height - (top*2),
                      zIndex   : mid-idx,
                      top      : top,          
                      left     : posx += (i < mid) ? diff : images[i-1].cWidth + diff - img.cWidth, 
                      opacity  : sin[j++]*0.8
                  }, options.animate, function() {
                      if (i == mid-1)
                          addDescription($(img).css('opacity',1));
                  });
              }
              else
              {
                  $(img).css({
                      zIndex   : mid-idx,
                      height   : height - (top*2),
                      top      : top, 
                      left     : posx += (i < mid) ? diff : images[i-1].cWidth + diff - img.cWidth,
                      opacity  : 0
                  }).show().animate({opacity: ((i+1) % mid) ? sin[j++]*0.8 : 1});

                  if (options.shadow)
                      $(img).addClass('shadow');
                  if (i == mid-1)
                      addDescription($(img));
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
