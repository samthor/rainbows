Helper to animate the `theme-color` meta tag using Web Animations.

## Usage

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
