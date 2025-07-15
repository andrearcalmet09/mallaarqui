fetch('malla.json')
  .then(r=>r.json()).then(data=>{
    const cont=document.getElementById('malla-container');
    const credEl=document.getElementById('creditos-totales');
    let totalCred=0;
    data.semestres.forEach(s=>{
      const box=document.createElement('div');
      box.className='semestre';
      box.innerHTML=`<h2>Semestre ${s.numero}</h2>`;
      s.cursos.forEach(c=>{
        const el=document.createElement('div');
        el.className=`curso ${c.tipo}`;
        el.textContent=`${c.nombre} (${c.creditos} créditos)`;
        const tip=document.createElement('span');
        tip.className='tooltip';
        tip.textContent=c.tipo==='electivo'? 'Electivo' : 'Obligatorio';
        el.appendChild(tip);
        el.addEventListener('click',()=>{
          el.classList.toggle('aprobado');
          totalCred += el.classList.contains('aprobado') ? c.creditos : -c.creditos;
          credEl.textContent=`Créditos Aprobados: ${totalCred}`;
        });
        box.appendChild(el);
      });
      cont.appendChild(box);
    });
  })
  .catch(e=>console.error(e));
