
/**
 * Module dependencies.
 */

var vendor = require('vendor')
var slice = require('sliced')
var is = require('is')

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
  this.callbacks = {}

  this.register('end')

  return function(event, cb) {
    if (event && !is.fn(event)) return self.register(event, cb)

    var done = event || noop

    self.listen(done)
    self.animate()
  }
}

/**
 * Listen on all events that have a registered callback.
 *
 * @api private
 */

Animation.prototype.listen = function (done) {
  var self = this
  var els = this.els
  var el = els[0]  
  var events = Object.keys(this.callbacks)

  events.forEach(function(event) {
    el.addEventListener(prefix(event), function listener (params) {
      params = {
        name: params.animationName,
        type: params.type,
        time: params.elapsedTime
      }

      var cb = self.callbacks[event]

      cb(params)
      self[event](el, event, listener)

      done()
    })
  })
}

/**
 * Hook for `start` event after custom hook is done.
 *
 * @param {DOMElement} el
 * @param {String} event
 * @param {Function} fn
 */

Animation.prototype.start = function (el, event, fn) {
  el.removeEventListener(prefix(event), fn)
}

/**
 * Hook for `iteration` event after custom hook is done.
 *
 * @param {DOMElement} el
 * @param {String} event
 * @param {Function} fn
 */

Animation.prototype.iteration = function (el, event, fn) {
  this.iterationListener = fn
}

/**
 * Hook for `end` event after custom hook is done.
 *
 * @param {DOMElement} el
 * @param {String} event
 * @param {Function} fn
 */

Animation.prototype.end = function (el, event, fn) {
  var self = this

  el.removeEventListener(prefix(event), fn)
  el.removeEventListener(prefix('iteration'), this.iterationListener)

  this.els.forEach(function(el) {
    el.classList.remove(self.animation)
  })
}

/**
 * Register an `event` with a given `callback`.
 *
 * @param {String} event
 * @param {Function} cb
 *
 * @api private
 */

Animation.prototype.register = function (event, cb) {
  if (!cb) cb = noop;
  this.callbacks[event] = cb
};

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

/**
 * Noop function.
 *
 * @api private
 */

function noop () {}