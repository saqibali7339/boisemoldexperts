(function(){
  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-mobile a').forEach(function(a){
    a.addEventListener('click', function(){ var d = a.closest('details'); if(d) d.removeAttribute('open'); });
  });

  // Decision flows: <div class="tool" data-flow="id"> + <script type="application/json" id="flow-id">
  document.querySelectorAll('[data-flow]').forEach(function(root){
    var src = document.getElementById('flow-' + root.getAttribute('data-flow'));
    if(!src) return;
    var data = JSON.parse(src.textContent);
    var body = root.querySelector('.tool-body');
    var res = root.querySelector('.result');
    var trail = [];
    function show(id){
      var n = data.nodes[id];
      if(n.r){
        body.innerHTML = trail.length ? '<div class="path">' + trail.map(function(t){ return '<span>' + t + '</span>'; }).join('') + '</div>' : '';
        res.hidden = false;
        res.innerHTML = '<span class="kicker">' + (n.k || 'Our read') + '</span><h3>' + n.r + '</h3><p>' + n.p + '</p>' +
          '<a class="btn btn-call" href="' + document.querySelector('[data-call]').getAttribute('href') + '">' + (n.cta || 'Call to talk it through') + '</a> ' +
          '<button class="reset" type="button">Start over</button>';
        res.querySelector('.reset').onclick = function(){ trail = []; res.hidden = true; show(data.start); };
        return;
      }
      res.hidden = true;
      body.innerHTML = (trail.length ? '<div class="path">' + trail.map(function(t){ return '<span>' + t + '</span>'; }).join('') + '</div>' : '') +
        '<p class="q">' + n.q + '</p><div class="opts">' + n.o.map(function(o, i){ return '<button type="button" class="opt" data-i="' + i + '">' + o[0] + '</button>'; }).join('') + '</div>';
      body.querySelectorAll('.opt').forEach(function(b){
        b.onclick = function(){ var o = n.o[+b.dataset.i]; trail.push(o[0]); show(o[1]); };
      });
    }
    show(data.start);
  });

  // Area estimator (range input with tiers)
  document.querySelectorAll('[data-area]').forEach(function(root){
    var input = root.querySelector('input');
    var out = root.querySelector('.big');
    var tiers = JSON.parse(root.querySelector('script').textContent);
    var tgt = root.querySelector('.result');
    function upd(){
      var v = +input.value;
      out.textContent = v + ' sq ft';
      var t = tiers.filter(function(x){ return v <= x.max; })[0] || tiers[tiers.length-1];
      tgt.innerHTML = '<span class="kicker">' + t.k + '</span><h3>' + t.h + '</h3><p class="mb0">' + t.p + '</p>';
    }
    input.addEventListener('input', upd); upd();
  });

  // Calendar: mark current month
  var m = new Date().getMonth();
  document.querySelectorAll('.cal .m[data-m="' + m + '"]').forEach(function(el){ el.classList.add('now'); });

  // Reveal on scroll
  if('IntersectionObserver' in window){
    var els = document.querySelectorAll('.section .card, .section .sit, .timeline li, .hours .row, .scale .lvl, .layers .ly, .checks li, .cal .m, .specs div, .related a, .twoway .side');
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin:'0px 0px -6% 0px'});
    setTimeout(function(){ els.forEach(function(el){ el.classList.add('in'); }); }, 2500);
    els.forEach(function(el, i){ var r = el.getBoundingClientRect(); if(r.top < innerHeight) return; el.classList.add('reveal'); el.style.transitionDelay = ((i % 6) * 50) + 'ms'; io.observe(el); });
  }
})();
