
# watermark

  Watermark your images like what

## Installation

  Install with [component(1)](http://component.io):

    $ component install stephenmathieson/watermark

## API

### `watermark(img, mark, x, y, fn)`

  Shorthand watermark

### `new watermark.Watermark(img, [opts])`

  Create a watermark on top of `img`

#### `Watermark#set(key, val)`

  Set `key=val`

#### `Watermark#get(key)`

  Get `key`

#### `Watermark#render([cb])`

  Render the watermark, invoking `cb(img)`


## Examples

  Simple usage

```js
var watermark = require('watermark');
watermark('/penguin.jpg', '/star.png', 200, 30, function (err, img) {
  // do stuff
});
```

  Using the constructor

```js
var Watermark = require('watermark').Watermark;
var w = new Watermark(document.querySelector('img'));
w.set('mark', '/star.png');
w.set('x', 200);
w.set('y', 30);
w.render(function (err, img) {
  // do stuff
});
```

## License

  MIT
