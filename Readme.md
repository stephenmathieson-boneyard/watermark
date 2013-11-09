
# watermark

  Watermark your images like what

## Installation

  Install with [component(1)](http://component.io):

    $ component install stephenmathieson/watermark

## API

### `new Watermark(img, [opts])`

  Create a watermark on top of `img`

### `Watermark#set(key, val)`

  Set `key=val`

### `Watermark#get(key)`

  Get `key`

### `Watermark#render([cb])`

  Render the watermark, invoking `cb(img)`


## Example Usage

```js
var Watermark = require('watermark');
var w = new Watermark('#my-favorite-image');
w.set('mark', './star.png');
w.set('x', 200);
w.set('y', 30);
w.render(function (img) {
  // do stuff
});
```

## License

  MIT
