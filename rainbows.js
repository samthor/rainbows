
/**
 * RColor allows control of theme-color via Web Animations (polyfill not
 * included, see http://caniuse.com/#feat=web-animation for support).
 */
var RColor = (function() {
  var meta = null;

  function loadMeta() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta == null) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    return meta;
  };

  function updateColor(raw) {
    if (!raw) {
      if (meta) {
        meta.parentNode.removeChild(meta);
        meta = null;
      }
      return;
    }
    meta = meta || loadMeta();
    meta.content = raw;
  };

  var holder = document.createElement('div');
  var defaultStyle = 'visibility: hidden; display: none';
  holder.setAttribute('style', defaultStyle);
  window.addEventListener('load', function() {
    document.body.appendChild(holder);
  });

  var activeAnims = 0;
  function update() {
    if (activeAnims) {
      var s = window.getComputedStyle(holder);
      updateColor(s.backgroundColor);
      window.requestAnimationFrame(update);
    } else {
      updateColor(holder.style.background);  // default uses background css
    }
  }

  return {
    /**
     * @param {boolean} enabled whether debug enabled
     */
    set debug(enabled) {
      if (enabled) {
        holder.setAttribute('style', 'width: 50px; height: 50px; ' +
            'position: fixed; right: 0; top: 0')
      } else {
        holder.setAttribute('style', defaultStyle);
      }
    },

    /**
     * Sets the default theme color while no animations are running.
     *
     * @param {string|number} v theme color to set as default
     */
    set default(v) {
      holder.style.background = '' + v;
      update();
    },

    /**
     * As per Element.animate() in Web Animations. Passed steps to animate
     * between, and a timing object. The property used is 'background', or
     * steps can be passed as simple objects, e.g.: ['red', 'blue'].
     *
     * @param {!Array.<!Object>} steps to animate
     * @param {!Object} timing to use 
     */
    animate: function(steps, timing) {
      steps = steps.map(function(x) {
        if (typeof x == 'string') {
          return {'background': x};
        }
        return x;
      });

      var anim = holder.animate(steps, timing);
      ++activeAnims;

      // TODO: fill {forwards,both} will mean that we continually call update()

      // Steal anim.onfinish: run our own handler, and call whatever was set
      // in user-space.
      var _finish = null;
      anim.onfinish = function() {
        --activeAnims;
        _finish && _finish();
      };
      Object.defineProperty(anim, 'onfinish', {
        get: function() { return _finish },
        set: function(v) { _finish = v; }
      });

      update();
      return anim;
    }
  };
}());

