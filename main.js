(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header: ombra leggera dopo lo scroll
  var header = document.querySelector('.header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Comparsa morbida delle sezioni
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
    // sicurezza: tutto visibile dopo 2,5 s anche senza scroll
    setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Galleria con ingrandimento
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var lastBtn = null;
    document.querySelectorAll('.gallery button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        lbImg.src = img.src; lbImg.alt = img.alt;
        lbCap.textContent = btn.dataset.caption || img.alt;
        lb.hidden = false; lastBtn = btn;
        lb.querySelector('.lb-close').focus();
      });
    });
    var close = function () { lb.hidden = true; if (lastBtn) lastBtn.focus(); };
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) close(); });
  }

  // Modulo contatti: prepara un'email all'azienda scelta
  var form = document.querySelector('form.contact');
  if (form) {
    var note = form.querySelector('.form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.willValidate) el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true');
      });
      if (!form.checkValidity()) {
        note.hidden = false; note.className = 'form-note err';
        note.textContent = 'Compila i campi obbligatori segnati con * e accetta l’informativa privacy.';
        form.reportValidity();
        return;
      }
      var d = new FormData(form);
      var to = d.get('azienda_dest') === 'cameco' ? 'camecosrl2008@gmail.com' : 'info@cametal.eu';
      var subject = 'Richiesta dal sito: ' + d.get('servizio');
      var body = [
        'Nome: ' + d.get('nome'),
        'Azienda: ' + (d.get('azienda') || '-'),
        'Email: ' + d.get('email'),
        'Telefono: ' + (d.get('telefono') || '-'),
        'Servizio: ' + d.get('servizio'),
        '',
        d.get('messaggio')
      ].join('\n');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      note.hidden = false; note.className = 'form-note';
      note.textContent = 'Abbiamo preparato la tua email per ' + to + ': controlla il tuo programma di posta e premi Invia.';
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
