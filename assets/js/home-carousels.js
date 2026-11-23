(function () {
  var carousels = document.querySelectorAll("[data-carousel]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  carousels.forEach(function (root) {
    var track = root.querySelector(".home-carousel-track");
    var slides = track ? track.children : [];
    var dotsWrap = root.querySelector("[data-carousel-dots]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    if (!track || !dotsWrap || !prev || !next || slides.length === 0) return;

    var index = 0;
    var timer = null;
    var touchStartX = 0;

    function render() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      Array.prototype.forEach.call(slides, function (slide, i) {
        var active = i === index;
        slide.inert = !active;
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      var dots = dotsWrap.querySelectorAll("button");
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        if (active) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

    function go(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      render();
    }

    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "home-carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show item " + (i + 1) + " of " + slides.length);
      if (i === 0) dot.setAttribute("aria-current", "true");
      dot.addEventListener("click", (function (n) {
        return function () {
          go(n);
          restart();
        };
      })(i));
      dotsWrap.appendChild(dot);
    }

    prev.addEventListener("click", function () {
      go(index - 1);
      restart();
    });
    next.addEventListener("click", function () {
      go(index + 1);
      restart();
    });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
        restart();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
        restart();
      }
    });

    root.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    root.addEventListener("touchend", function (event) {
      var delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 40) return;
      go(index + (delta < 0 ? 1 : -1));
      restart();
    }, { passive: true });

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function start() {
      if (reduceMotion || slides.length < 2) return;
      stop();
      timer = setInterval(function () {
        go(index + 1);
      }, 8000);
    }

    function restart() {
      stop();
      start();
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) start();
    });

    render();
    start();
  });
})();
