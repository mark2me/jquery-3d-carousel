# jQuery Sliding Carousel

This is a jQuery plugin that shows your images in a cover-flow fashion.

Here's a working example:

http://buczko.pl/jQuery-Sliding-Carousel/

#### Usage:

HTML markup:

```
<div id="carousel">
    <div class="slide">
        <a href="#"><img class="carousel-image" alt="Image Caption" src="images/carousel-1.jpg"></a>
        <div class="carousel-caption">
            <p>
                Lorem ipsum dolor sit amet, consectetur elit.
            </p>
        </div>
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
