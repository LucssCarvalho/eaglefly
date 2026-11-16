(function(){
  var h=document.querySelector('.site-header');
  function sc(){h&&h.classList.toggle('solid',window.scrollY>40)}
  sc();window.addEventListener('scroll',sc,{passive:true});
  var b=document.querySelector('.burger'),m=document.querySelector('.menu');
  if(b){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}})}
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else els.forEach(function(e){e.classList.add('in')});
  // lightbox
  var links=[].slice.call(document.querySelectorAll('[data-lb]'));
  if(links.length){
    var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Galeria');
    lb.innerHTML='<button class="x" aria-label="Fechar">×</button><button class="p" aria-label="Anterior">‹</button><img alt=""><button class="n" aria-label="Próxima">›</button>';
    document.body.appendChild(lb);
    var img=lb.querySelector('img'),i=0;
    function show(n){i=(n+links.length)%links.length;img.src=links[i].href;img.alt=links[i].querySelector('img').alt}
    links.forEach(function(a,n){a.addEventListener('click',function(e){e.preventDefault();show(n);lb.classList.add('open')})});
    lb.querySelector('.x').onclick=function(){lb.classList.remove('open')};
    lb.querySelector('.p').onclick=function(){show(i-1)};
    lb.querySelector('.n').onclick=function(){show(i+1)};
    lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('open')});
    document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
      if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
  }
  // contact form -> WhatsApp
  var f=document.getElementById('form-wa');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();
    var d=new FormData(f);
    var t='Olá, Eagle Fly! Meu nome é '+d.get('nome')+'.\nInteresse: '+d.get('interesse')+'.\nPessoas: '+d.get('pessoas')+'.\n'+(d.get('msg')||'');
    window.open('https://wa.me/5511947547331?text='+encodeURIComponent(t),'_blank','noopener')})}
})();
