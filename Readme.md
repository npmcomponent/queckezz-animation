# animation

  Simple css3 animation utility which provides hooks for start, iteration and end events.

## Installation

    $ component install queckezz/animation

## API

* <a href="#api-ctor"><code>new Animation()</code></a>
* <a href="#api-animation"><code>animation()</code></a>

### <a href="#api-events">Events</a>

* <a href="#api-events-start"><code>animation(start, cb)</code></a>
* <a href="#api-events-iteration"><code>animation(iteration, cb)</code></a>
* <a href="#api-events-end"><code>animation(end, cb)</code></a>

------------------------------------------------
<a name="api-ctor"></a>
### new Animation(class, ...elements)
Creates a new Animation() that appends `class` to the given `elements`.

Returns:

<a name="api-animation"></a>
### animation()
start the animation by adding the `animation`s class to the `els`.

------------------------------------------------
<a name="api-events"></a>
### Events

Each event returns these parameters on the given `callback`.

* <code>e.name</code> class name of the given animation. Needs to be defined in your css.
* <code>e.type</code> Type of the animation. Could be `AnimationStart`, `AnimationIteration` or `AnimationEnd`.
* <code>e.time</code> Current elapsed time.

<a name="api-events-start"></a>
### animation('start', callback)
Executes `callback` when an animation starts.

<a name="api-events-iteration"></a>
### animation('iteration', callback)
Executes `callback` when an animation cycle is done.

<a name="api-events-end"></a>
### animation('start', callback)
Executes `callback` when the animation has ended. Also removes `animation`s classes.

## Example

```js
var Animation = require('animation');
var el = document.getElementsByClassName('box')[0];

// create a new Animation
var flash = new Animation('flash', el);

flash('end', function(e) {
  console.log(e.name, e.type, e.time);
  console.log('animation ended.');
})

// start the animation
flash()
```

```css
@keyframes flash {
  50% { opacity: 0; }
}

.flash {
  animation: flash 1s ease 3;
}
```

For a complete example take a look at `example.html`.

## License

  MIT