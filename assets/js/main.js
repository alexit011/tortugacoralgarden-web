/* Tortuga Coral Garden — interacciones */
(function(){
  'use strict';

  // ---- Menú móvil ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.classList.remove('open'); });
    });
  }

  // ---- Scroll reveal ----
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---- Donut count-up ----
  var donut = document.querySelector('.donut');
  if(donut){
    var target = parseInt(donut.getAttribute('data-val')||'87',10);
    var numEl = donut.querySelector('b');
    var started = false;
    var dio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !started){
          started = true;
          var cur = 0;
          var step = function(){
            cur += Math.max(1, Math.round(target/40));
            if(cur >= target){ cur = target; }
            donut.style.setProperty('--val', cur);
            if(numEl) numEl.textContent = cur + '%';
            if(cur < target) requestAnimationFrame(step);
          };
          step();
        }
      });
    }, {threshold:0.4});
    dio.observe(donut);
  }

  // ---- FAQ acordeón ----
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.closest('.faq-item');
      var ans = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      ans.style.maxHeight = open ? (ans.scrollHeight + 'px') : '0';
    });
  });

  // ---- Año dinámico en footer ----
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
