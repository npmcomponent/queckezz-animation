
/**
 * Module dependencies.
 */

var vendor = require('vendor')
var slice = require('sliced')

/**
 * Expose `Animation`.
 */

module.exports = Animation

/**
 * Get vendor.
 */

var browser = vendor()

/**
 * Initialize a new `Animation`.
 *
 * @param {DOMElement} el
 * @param {String} animation
 *
 * @api public
 */

function Animation(animation) {
  var self = this
  var els = slice(arguments).slice(1)

  this.els = els
  this.animation = animation

  return function(event, cb) {
    if (event && cb) return self.listen(event, cb);
    self.animate()
  }
}

/**
 * Listen on `event` and execute callback when fired.
 * Additionally, on the `end` event it will remove the animation class when fired.
 *
 * @param {String} event
 * @param {Function} cb
 *
 * @api private
 */

Animation.prototype.listen = function (event, cb) {
  var self = this
  var els = this.els
  var el = els[0]
  var type = prefix(event)

  el.addEventListener(type, function listener (params) {
    params = {
      name: params.animationName,
      type: params.type,
      time: params.elapsedTime
    }

    switch (event) {
      case 'start':
        this.removeEventListener(type, listener)
        break

      case 'iteration':
        //TODO: ugly, refactor maybe
        self.iterationListener = listener
        break

      case 'end':
        this.removeEventListener(type, listener)
        this.removeEventListener(prefix('iteration'), self.iterationListener)
        break
    }

    if (event !== 'end') return cb(params);

    els.forEach(function(el) {
      el.classList.remove(self.animation)
    })

    cb(params)
  })
}

/**
 * Add the `animation`s class for each of the `els`
 *
 * @api private
 */

Animation.prototype.animate = function () {
  var els = this.els
  var animation = this.animation

  setTimeout(function () {
    els.forEach(function(el) {
      el.classList.add(animation)
    })    
  }, 0) 
}

/**
 * Returns the prefixed event.
 *
 * @param {String} type
 *
 * @api private
 */

function prefix(type) {
  type = 'Animation' + type[0].toUpperCase() + type.slice(1)

  switch (browser) {
    case 'webkit':
      type = 'webkit' + type
      break

    case 'ms':
      type = 'MS' + type
      break

    case 'moz':
      type = type.toLowerCase()
      break
  }

  return type
}