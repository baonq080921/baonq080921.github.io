// Applies window.I18N translations to any element tagged with:
//   data-i18n         -> sets textContent
//   data-i18n-html     -> sets innerHTML (trusted content authored in i18n-data.js)
//   data-i18n-aria      -> sets aria-label
// Persists the chosen language in localStorage and re-applies on load.
// Other modules (work cards, case-study modal) listen for the 'i18n:change'
// event on `document` to re-render dynamic content in the new language.
(function(){
  var STORAGE_KEY = 'portfolio-lang';
  var DEFAULT_LANG = 'en';

  function getLang(){
    var saved = localStorage.getItem(STORAGE_KEY);
    return (saved === 'en' || saved === 'vi') ? saved : DEFAULT_LANG;
  }

  function t(key, lang){
    lang = lang || getLang();
    var dict = window.I18N && window.I18N[lang];
    if(dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    return key;
  }

  function applyTranslations(lang){
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      el.innerHTML = t(el.getAttribute('data-i18n-html'), lang);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'), lang));
    });

    document.querySelectorAll('.lang-btn').forEach(function(btn){
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    document.dispatchEvent(new CustomEvent('i18n:change', {detail:{lang:lang}}));
  }

  function setLang(lang){
    if(lang !== 'en' && lang !== 'vi') return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  window.i18n = {
    getLang: getLang,
    t: t,
    setLang: setLang,
    applyTranslations: applyTranslations
  };

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        setLang(btn.getAttribute('data-lang'));
      });
    });
    applyTranslations(getLang());
  });
})();
