// Giữ nguyên vị trí cuộn khi reload trang (thay vì luôn nhảy về đầu trang)
(function(){
  var KEY = 'portfolio-scroll-pos';

  if('scrollRestoration' in history){
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', function(){
    sessionStorage.setItem(KEY, String(window.scrollY));
  });

  window.addEventListener('DOMContentLoaded', function(){
    var saved = sessionStorage.getItem(KEY);
    if(saved === null) return;

    var y = parseInt(saved, 10);
    if(isNaN(y)) return;

    // tắt tạm smooth-scroll để nhảy thẳng tới vị trí cũ, không bị hiệu ứng "về đầu trang rồi trượt xuống"
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    requestAnimationFrame(function(){
      html.style.scrollBehavior = prev;
    });
  });
})();

// Scroll reveal: mỗi phần tử có class .reveal / .reveal-left / .reveal-right sẽ tự
// chạy hiệu ứng (mờ dần, trượt lên, hoặc trượt vào từ 2 bên) đúng vào thời điểm
// người dùng cuộn tới nó — không phải cả section bật cùng lúc, mà từng phần tử
// (chữ, card, nút...) xuất hiện lần lượt ngay khi lọt vào khung nhìn.
// Mỗi phần tử chỉ chạy 1 lần: sau khi hiện ra, nó giữ nguyên trạng thái hiển thị dù
// cuộn qua lại — hiệu ứng chỉ tái diễn khi trang được load/reload lại từ đầu.
(function(){
  var els = Array.prototype.slice.call(
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  );
  if(!els.length) return;

  if(!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -10% 0px'});

  els.forEach(function(el){ io.observe(el); });
})();

// Tools inventory marquee: auto-scrolls left, can be dragged with mouse/touch.
(function(){
  var wrap = document.querySelector('.marquee');
  var track = document.querySelector('.marquee-track');
  if(!wrap || !track) return;

  var offset = 0;          // current translateX in px
  var halfWidth = 0;       // width of one copy of the track (content is duplicated x2)
  var speed = 0.5;         // auto-scroll speed in px/frame, always moves left
  var dragging = false;
  var startX = 0;
  var startOffset = 0;

  function measure(){
    halfWidth = track.scrollWidth / 2;
  }
  measure();
  window.addEventListener('resize', measure);

  function wrapOffset(){
    if(halfWidth <= 0) return;
    while(offset <= -halfWidth) offset += halfWidth;
    while(offset > 0) offset -= halfWidth;
  }

  function apply(){
    track.style.transform = 'translateX(' + offset + 'px)';
  }

  function tick(){
    if(!dragging){
      offset -= speed;
      wrapOffset();
      apply();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function getX(e){
    return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
  }

  function dragStart(e){
    dragging = true;
    wrap.classList.add('dragging');
    startX = getX(e);
    startOffset = offset;
  }
  function dragMove(e){
    if(!dragging) return;
    var x = getX(e);
    offset = startOffset + (x - startX);
    wrapOffset();
    apply();
  }
  function dragEnd(){
    if(!dragging) return;
    dragging = false;
    wrap.classList.remove('dragging');
    // auto-scroll resumes from here, always continuing in the original (leftward) direction
  }

  wrap.addEventListener('mousedown', dragStart);
  window.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);

  wrap.addEventListener('touchstart', dragStart, {passive:true});
  window.addEventListener('touchmove', dragMove, {passive:true});
  window.addEventListener('touchend', dragEnd);

  wrap.addEventListener('dragstart', function(e){ e.preventDefault(); });
})();

// Best Works carousel: dot navigation, prev/next buttons, and press-to-drag.
// Card titles/descriptions are filled in from window.CASE_DATA so the project
// text only has to be maintained in one place (projects-data.js), in whichever
// language is currently active.
(function(){
  var track = document.querySelector('.works-track');
  var dotsWrap = document.querySelector('.works-dots');
  var prevBtn = document.querySelector('.works-prev');
  var nextBtn = document.querySelector('.works-next');
  if(!track || !dotsWrap) return;

  var CASE_DATA = window.CASE_DATA || [];
  var slides = Array.prototype.slice.call(track.querySelectorAll('.work-slide'));
  var current = 0;

  function renderCards(){
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    track.querySelectorAll('.work-card').forEach(function(card){
      var index = parseInt(card.getAttribute('data-project'), 10);
      var data = CASE_DATA[index];
      if(!data) return;
      var content = data[lang] || data.en;

      var titleEl = card.querySelector('.work-title');
      if(titleEl){
        var color = data.accentColor || '#f87171';
        titleEl.innerHTML = content.title1 + '<span class="accent" style="color:' + color + '">' + content.title2 + '</span>';
      }
      var descEl = card.querySelector('.work-desc');
      if(descEl){
        descEl.textContent = content.overview;
      }
    });
  }
  renderCards();
  document.addEventListener('i18n:change', renderCards);

  slides.forEach(function(slide, i){
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
    dot.addEventListener('click', function(){ goTo(i); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('button'));

  function setActive(i){
    current = i;
    slides.forEach(function(s, idx){ s.classList.toggle('active', idx === i); });
    dots.forEach(function(d, idx){ d.classList.toggle('active', idx === i); });
  }

  function goTo(i){
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  }

  if(prevBtn) prevBtn.addEventListener('click', function(){ goTo(current - 1); });
  if(nextBtn) nextBtn.addEventListener('click', function(){ goTo(current + 1); });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && entry.intersectionRatio > 0.6){
        setActive(slides.indexOf(entry.target));
      }
    });
  }, {root: track, threshold: [0.6]});
  slides.forEach(function(s){ io.observe(s); });

  setActive(0);

  // press-and-hold to drag the carousel left/right with the mouse
  // (touch already scrolls natively on phones/tablets)
  var isDown = false;
  var dragged = false;
  var startX = 0;
  var scrollStart = 0;

  track.addEventListener('mousedown', function(e){
    isDown = true;
    dragged = false;
    track.classList.add('pressing');
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });

  window.addEventListener('mousemove', function(e){
    if(!isDown) return;
    var dx = e.pageX - startX;
    if(Math.abs(dx) > 5 && !dragged){
      dragged = true;
      // only now — once it's a real drag, not just a click — do we
      // disable pointer-events on the cards, so plain clicks still work
      track.classList.add('dragging');
    }
    track.scrollLeft = scrollStart - dx;
  });

  window.addEventListener('mouseup', function(){
    if(!isDown) return;
    isDown = false;
    track.classList.remove('pressing');
    track.classList.remove('dragging');
  });

  // if the user actually dragged, swallow the click that follows
  // so it doesn't accidentally trigger "View Case Study" etc.
  track.addEventListener('click', function(e){
    if(dragged){
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    }
  }, true);

  track.querySelectorAll('img').forEach(function(img){
    img.addEventListener('dragstart', function(e){ e.preventDefault(); });
  });
})();

// Case study modal: fills content from window.CASE_DATA (projects-data.js) and
// wires up open/close interactions.
(function(){
  var modal = document.getElementById('caseModal');
  if(!modal) return;

  var CASE_DATA = window.CASE_DATA || [];

  var titleEl = document.getElementById('caseModalTitle');
  var tagsEl = document.getElementById('caseTags');
  var screenshotEl = document.getElementById('caseScreenshot');
  var videoWrapEl = document.getElementById('caseVideoWrap');
  var overviewEl = document.getElementById('caseOverview');
  var highlightsEl = document.getElementById('caseHighlights');
  var featuresEl = document.getElementById('caseFeatures');
  var footerEl = document.getElementById('caseFooter');

  var openIndex = null;        // data-project index of the currently open case, or null
  var openScreenshot = '';     // screenshot src of the currently open case

  function t(key){
    return window.i18n ? window.i18n.t(key) : key;
  }

  function getYouTubeId(url){
    if(!url) return null;
    var m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function fillVideo(src){
    videoWrapEl.innerHTML = '';
    var ytId = getYouTubeId(src);
    if(ytId){
      var embed = document.createElement('div');
      embed.className = 'case-video-embed';
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + ytId;
      iframe.title = t('modal.demoVideo');
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      embed.appendChild(iframe);
      videoWrapEl.appendChild(embed);
    } else {
      videoWrapEl.innerHTML =
        '<div class="case-video-placeholder">' +
          '<div class="case-video-play">▶</div>' +
          '<span>' + t('modal.comingSoon') + '</span>' +
        '</div>';
    }
  }

  function fillList(el, items, withLabel){
    el.innerHTML = '';
    items.forEach(function(item){
      var li = document.createElement('li');
      if(withLabel){
        li.innerHTML = '<b>' + item[0] + ':</b> ' + item[1];
      } else {
        li.textContent = item;
      }
      el.appendChild(li);
    });
  }

  function openCase(index, screenshotSrc){
    var data = CASE_DATA[index];
    if(!data) return;
    var lang = window.i18n ? window.i18n.getLang() : 'en';
    var content = data[lang] || data.en;

    openIndex = index;
    openScreenshot = screenshotSrc || openScreenshot;

    titleEl.innerHTML = content.title1 + '<span class="accent" style="color:' + (data.accentColor || '#f87171') + '">' + content.title2 + '</span>';

    tagsEl.innerHTML = '';
    data.tags.forEach(function(tag){
      var span = document.createElement('span');
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
    tagsEl.style.display = data.tags.length ? 'flex' : 'none';

    screenshotEl.src = openScreenshot;
    screenshotEl.alt = t('modal.screenshotAlt');
    fillVideo(data.video);
    overviewEl.textContent = content.overview;
    fillList(highlightsEl, content.highlights, true);
    fillList(featuresEl, content.features, false);

    footerEl.innerHTML = '';
    if(data.liveUrl){
      var live = document.createElement('a');
      live.className = 'case-btn live';
      live.href = data.liveUrl;
      live.target = '_blank';
      live.rel = 'noopener';
      live.innerHTML = t('modal.liveDemo');
      footerEl.appendChild(live);
    }
    if(data.codeUrl){
      var code = document.createElement('a');
      code.className = 'case-btn code';
      code.href = data.codeUrl;
      code.target = '_blank';
      code.rel = 'noopener';
      code.textContent = t('modal.viewCode');
      footerEl.appendChild(code);
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.case-modal-scroll').scrollTop = 0;
  }

  function closeCase(){
    openIndex = null;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // clearing the wrap stops playback for both local <video> and YouTube <iframe>
    videoWrapEl.innerHTML = '';
  }

  function openFromCard(card){
    var index = parseInt(card.getAttribute('data-project'), 10);
    var img = card.querySelector('.work-image');
    openCase(index, img ? img.src : '');
  }

  // if the modal is open when the language switches, re-render its content in place
  document.addEventListener('i18n:change', function(){
    if(openIndex !== null) openCase(openIndex, openScreenshot);
  });

  // clicking the button opens the case study...
  document.querySelectorAll('.work-case-btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      openFromCard(btn.closest('.work-card'));
    });
  });

  // ...and so does clicking anywhere else on the card, not just the button
  document.querySelectorAll('.work-card').forEach(function(card){
    card.addEventListener('click', function(){
      openFromCard(card);
    });
  });

  modal.querySelectorAll('[data-close]').forEach(function(el){
    el.addEventListener('click', closeCase);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('open')) closeCase();
  });
})();
