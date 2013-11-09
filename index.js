
var loadImage = require('load-image');

/**
 * Expose Watermark
 */

module.exports = Watermark;


/**
 * Create a new Watermark instance with `img`
 *
 * @api public
 * @param {HTMLImageElement|String} img
 * @param {Object} [opts]
 */

function Watermark(img, opts) {
  if (!img) throw new Error('an image is required');

  this.img = 'string' === typeof img
    ? document.querySelector(img)
    : img;

  this.opts = opts || {};

  var canvas = this.canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:none';
  this.ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);
}

/**
 * Set `key=val`
 *
 * @api public
 * @param {String} key
 * @param {Mixed} val
 * @return {Watermark}
 */

Watermark.prototype.set = function (key, val) {
  this.opts[key] = val;
  return this;
};

/**
 * Get `key`
 *
 * @api public
 * @param {String} key
 * @return {Mixed}
 */

Watermark.prototype.get = function (key) {
  return this.opts[key];
};


/**
 * Render the watermark, invoking `cb(img)`
 *
 * @api public
 * @param {Function} cb
 * @return {Watermark}
 */

Watermark.prototype.render = function (cb) {
  cb = cb || noop;

  var opts = this.opts;
  if (!opts.mark) throw new TypeError('missing watermark');

  if ('string' === typeof opts.mark) {
    var self = this;
    loadImage(opts.mark, function (err, img) {
      if (err) return cb(err);
      self.makr = img;
      self.reallyRender(cb);
    });
  } else {
    this.mark = opts.mark;
    this.reallyRender(cb);
  }

  return this;
};

/**
 * Actually render the watermark
 *
 * @api private
 * @param {Function} cb
 */

Watermark.prototype.reallyRender = function (cb) {
  var opts = this.opts;
  var x = opts.x || 10;
  var y = opts.y || 10;

  this.canvas.width = this.img.width || this.img.offsetWidth;
  this.canvas.height = this.img.height || this.img.offsetHeight;
  this.ctx.drawImage(this.img, 0, 0);
  this.ctx.drawImage(this.mark, x, y);
  this.img.src = this.canvas.toDataURL();
  cb(this.img);
};

/**
 * No operation
 */

function noop() {}
