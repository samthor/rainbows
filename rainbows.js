
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
    meta = meta || loadMeta();
    meta.content = raw;
  };

  var holder = document.createElement('div');
  holder.style.height = '50px'
  holder.style.width = '50px';
  holder.style.position = 'fixed';
  holder.style.right = 0;
  holder.style.top = 0;
  window.addEventListener('load', function() {
    document.body.appendChild(holder);
  });

  var activeAnims = 0;
  function update() {
    var s = window.getComputedStyle(holder);
    updateColor(s.backgroundColor);
    activeAnims && window.requestAnimationFrame(update);
  }

  return {
    set default(v) {
      holder.style.background = v;
      update();
    },
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