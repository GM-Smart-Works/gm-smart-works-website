document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
    });
  });

  document.querySelectorAll('.service-toggle').forEach(button=>{
    button.addEventListener('click', ()=>{
      const card = button.closest('.service-card');
      const details = card?.querySelector('.service-more');
      if(!card || !details) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      details.hidden = isExpanded;
      card.classList.toggle('is-open', !isExpanded);
      const label = button.querySelector('span');
      if(label){
        label.textContent = isExpanded ? 'READ MORE →' : 'SHOW LESS ←';
      }
    });
  });

  (function(){
    const header = document.getElementById('siteHeader');
    if(!header) return;
    let isCompact = false;
    const compactAt = 80;
    const expandAt = 44;

    const updateHeaderState = ()=>{
      const shouldCompact = isCompact ? window.scrollY > expandAt : window.scrollY > compactAt;
      if(shouldCompact === isCompact) return;
      isCompact = shouldCompact;
      header.classList.toggle('is-compact', isCompact);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, {passive:true});
    window.addEventListener('resize', updateHeaderState);
  })();

  // Floating WhatsApp button
  (function(){
    const waNumber = '27696359724';
    const waMessage = "Hi GM Smart Works, I'd like to get a quote for a structural steel project.";
    const fab = document.getElementById('waFab');
    const popup = document.getElementById('waPopup');
    const closeBtn = document.getElementById('waClose');
    const startBtn = document.getElementById('waStart');

    startBtn.href = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(waMessage);

    fab.addEventListener('click', ()=>{
      popup.classList.toggle('open');
    });
    closeBtn.addEventListener('click', ()=>{
      popup.classList.remove('open');
    });
    document.addEventListener('click', (e)=>{
      if(!popup.contains(e.target) && !fab.contains(e.target)){
        popup.classList.remove('open');
      }
    });
  })();