/* CGTK site language: machine translation of the whole page with Google's website translator.
   The Google script is loaded only after a visitor picks a language other than English. */
(function(){
  var LANGS = {'English':'en','Français':'fr','Español':'es','العربية':'ar'};
  var KEY = 'cgtk-lang';
  function get(){ try { return localStorage.getItem(KEY) || 'en'; } catch(e){ return 'en'; } }
  function save(c){ try { localStorage.setItem(KEY, c); } catch(e){} }
  function setCookie(v){
    var host = location.hostname, exp = v ? '' : ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'googtrans=' + (v||'') + ';path=/' + exp;
    if (host.indexOf('.') > 0) document.cookie = 'googtrans=' + (v||'') + ';path=/;domain=' + host + exp;
  }
  var loaded = false;
  function load(){
    if (loaded) return; loaded = true;
    var box = document.createElement('div'); box.id = 'gt-el'; box.style.display = 'none'; document.body.appendChild(box);
    window.cgtkGtInit = function(){
      new google.translate.TranslateElement({pageLanguage:'en', includedLanguages:'fr,es,ar', autoDisplay:false}, 'gt-el');
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=cgtkGtInit';
    s.onerror = fallback;
    document.body.appendChild(s);
    setTimeout(function(){ if (!(window.google && google.translate)) fallback(); }, 8000);
  }
  function proxyUrl(code){
    var h = location.hostname.replace(/-/g,'--').replace(/\./g,'-');
    return 'https://' + h + '.translate.goog' + location.pathname + '?_x_tr_sl=en&_x_tr_tl=' + code + '&_x_tr_hl=' + code + location.hash;
  }
  function fallback(){
    var code = get(); if (code === 'en') return;
    note('The translator could not load here. <a href="' + proxyUrl(code) + '" rel="noopener">Open the machine-translated page</a> or <a href="#" id="mt-en">return to English</a>.');
    var a = document.getElementById('mt-en'); if (a) a.onclick = function(ev){ ev.preventDefault(); choose('en'); };
  }
  function note(msg){
    var n = document.getElementById('mt-note');
    if (!n){ n = document.createElement('div'); n.id = 'mt-note'; n.className = 'mt-note notranslate'; n.setAttribute('translate','no'); document.body.insertBefore(n, document.body.firstChild); }
    n.innerHTML = msg;
  }
  function apply(code){
    document.documentElement.setAttribute('lang', code);
    document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
    if (code === 'en') return;
    setCookie('/en/' + code);
    note('This page has been machine-translated from English and may contain errors. <a href="#" id="mt-en">Read the original in English</a>');
    var a = document.getElementById('mt-en'); if (a) a.onclick = function(ev){ ev.preventDefault(); choose('en'); };
    load();
  }
  function choose(code){
    save(code);
    if (code === 'en'){ setCookie(''); location.reload(); return; }
    if (loaded){ setCookie('/en/' + code); location.reload(); return; }
    syncSelects(code); apply(code);
  }
  function label(code){ for (var k in LANGS) if (LANGS[k] === code) return k; return 'English'; }
  function syncSelects(code){
    ['lang','asklang'].forEach(function(id){ var s = document.getElementById(id); if (s) s.value = label(code); });
  }
  function wire(){
    ['lang','asklang'].forEach(function(id){
      var s = document.getElementById(id);
      if (s && !s.dataset.wired){ s.dataset.wired = '1'; s.classList.add('notranslate'); s.setAttribute('translate','no');
        s.value = label(get()); s.addEventListener('change', function(){ choose(LANGS[s.value] || 'en'); }); }
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    var code = get();
    if (code !== 'en' && !LANGS[label(code)]) code = 'en';
    wire(); syncSelects(code);
    if (code !== 'en') apply(code); else setCookie('');
    // the Ask CGTK page is drawn later by app.js; wire its selector when it appears
    new MutationObserver(wire).observe(document.getElementById('app') || document.body, {childList:true, subtree:true});
  });
})();
