
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
  var els = this.els
  var el = els[0]
  var animation = this.animation

  listen(el, event, function(e) {
    if (event !== 'end') return cb(e);

    els.forEach(function(el) {
      el.classList.remove(animation)
    })

    cb(e)
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

 setTimeout(function() {
   els.forEach(function(el) {
      el.classList.add(animation)
   })    
 }, 0) 
}

/**
 * Listen to an Event cross-browser.
 *
 * @param {DOMElement} el
 * @param {String} type
 * @param {Function} callback
 *
 * @api private
 */

function listen (el, type, callback) {
  type = 'Animation' + capitalize(type)

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

  el.addEventListener(type, function(e) {
    callback({
      name: e.animationName,
      type: e.type,
      time: e.elapsedTime
    })
  })
}

/**
 * Capitalize the first letter of a string.
 *
 * @param {String} str
 *
 * @api private
 */

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}