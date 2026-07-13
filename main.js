 document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
    });
  });

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