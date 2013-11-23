# animation

  Simple css3 animation utility which provides hooks for start, iteration and end events. You can chain animations.

## Installation

    $ component install queckezz/animation

## Examples

### Basic

```js
var Animation = require('animation')
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

### Chaining

  You can chain animations together with [batch](https://github.com/visionmedia/batch).

```js
var Animation = require('animation')
var Batch = require('batch')

var boxes = document.getElementsByClassName('box')
var flash = new Animation('flash', boxes[1])
var rotate = new Animation('rotate', boxes[0])
var flash2 = new Animation('flash', boxes[1])
var sequence = new Batch;

sequence.concurrency(1)

sequence
  .push(rotate)
  .push(flash2)
  .push(rotate)
  .push(flash)
```

For complete examples take a look the examples folder.

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

## License

  MIT