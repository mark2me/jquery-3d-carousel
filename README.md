# jQuery Sliding Carousel

This is a jQuery plugin that shows your images in a cover-flow fashion.

Here's a [nice demo](http://labs.devnode.pl/jQuery-Sliding-Carousel/).

#### Usage:

HTML markup:

```
<div id="carousel">
    <div class="slide">
        <p>
            <a href="#"><img alt="Image Caption" src="images/carousel-1.jpg"></a>
            <span> Lorem ipsum dolor sit amet, consectetur elit. </span>
        </p>
    </div>
    <div class="slide">
       ...
    </div>
    <div class="slide">
       ...
    </div>
</div>
```

Javascript:

```
$("#carousel").slidingCarousel({
     squeeze : 100,
     animate : 250,
     shadow  : true
 });
```

#### Options:

```
   squeeze - slides "squeeze" ratio.
   animate - duration of animated rotation.
   shadow  - true for visible shadow, false otherwise.
```
