
var loadImage = require('load-image');

/**
 * Expose watermark
 */

exports = module.exports = watermark;

/**
 * Most practical usage of `Watermark`
 *
 * @api public
 * @param {HTMLImageElement|String} img
 * @param {HTMLImageElement|String} mark
 * @param {Number} x
 * @param {Number} y
 * @param {Function} fn
 */

function watermark(img, mark, x, y, fn) {
  if ('string' == typeof img) {
    loadImage(img, function (err, img) {
      if (err) return fn(err);
      render(img);
    });
  } else {
    render(img);
  }

  function render(img) {
    new Watermark(img)
      .set('x', x)
      .set('y', y)
      .set('mark', mark)
      .render(fn);
  }
}

/**
 * Expose Watermark
 */

exports.Watermark = Watermark;

/**
 * Create a new Watermark instance with `img`
 *
 * @api public
 * @param {HTMLImageElement} img
 * @param {Object} [opts]
 */

function Watermark(img, opts) {
  if (!img) throw new Error('an image is required');
  this.img = img;
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
      self.mark = img;
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
  var x = this.get('x') || 10;
  var y = this.get('y') || 10;

  this.canvas.width = this.img.width || this.img.offsetWidth;
  this.canvas.height = this.img.height || this.img.offsetHeight;
  this.ctx.drawImage(this.img, 0, 0);
  this.ctx.drawImage(this.mark, x, y);
  this.img.src = this.canvas.toDataURL();
  cb(null, this.img);
};

/**
 * No operation
 */

function noop() {}
