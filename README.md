# parallax-animation

version 1.0.0


# How to use

```html
<!--include js-->
<script src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
<script src="jquery-parallax-animation.js"></script>

<div class="parallax-animate" data-parallax-multiplier="0.6" data-parallax-direction="down" data-parallax-positionType="absolute">
    <h1 class="giant taiwan">Taiwan</h1>
</div>

<script>
	$(function(){
	    var parallax = $('.parallax-animate').parallaxAnimation();
	});
</script>
```

# Other 

```html
<!-- add button-->
<button id="pause">pause</button>
<button id="restart">restart</button>

<script>
	$(function(){
	    var parallax = $('.parallax-animate').parallaxAnimation();

	    $('#pause').click(function(){
		    parallax.pause();
		});

		$('#restart').click(function(){
		    parallax.restart();
		});
	});
</script>
```