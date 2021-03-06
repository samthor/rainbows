Helper to animate the `theme-color` meta tag using Web Animations. [Video](http://youtu.be/wolnA7rgHUM) or [demo](https://cdn.rawgit.com/samthor/rainbows/v0.1.1/rainbows.html) (Chrome 36+, Android only for now).

## Install

Optional install with Bower:

    $ bower install rainbows

Requires [Web Animations](http://caniuse.com/#feat=web-animation) or a [suitable polyfill](https://github.com/web-animations/web-animations-js).

## Usage

```html
<script src="bower_components/rainbows/rainbows.js"></script>
```

Or, if you'd like to just link to the CDN:

```html
<script src="https://cdn.rawgit.com/samthor/rainbows/v0.1.1/rainbows.html"></script>
```

```js

RColor.default = 'pink';

var steps = [{ background: 'red' }, { background: 'blue' }];
var anim = RColor.animate(steps, { duration: 2000, iterations: 2 });
anim.onfinish = function() {
  console.info('done!');
};

var steps = ['rgb(255, 128, 0)', 'hsl(128, 80%, 100%)'];
var anim = RColor.animate(steps, { duration: 1500, direction: 'reverse' });
window.setTimeout(function() {
  anim.pause();
  window.setTimeout(function() {
    anim.cancel();
  }, 500);
}, 500);

```

The `animate` method is called as per the `Element.animate()` in Web Animations, except that a step consisting of just a string is automatically converted to animate the `background` property (see the second example).
