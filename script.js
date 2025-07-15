let creditosTotales = 0;

async function cargarMalla() {
  const res = await fetch('malla.json');
  const data = await res.json();
  const container = document.getElementById('malla-container');

  data.forEach((sem, i) => {
    const divSem = document.createElement('div');
    divSem.className = 'semestre';
    divSem.innerHTML = `<h2>Semestre ${i+1}</h2>`;
    sem.forEach(c => {
      const div = document.createElement('div');
      div.className = `curso ${c.tipo}`;
      div.textContent = `${c.nombre} (${c.creditos} cr)`;
      div.dataset.id = c.id;
      div.dataset.pr = JSON.stringify(c.prerequisitos);
      div.addEventListener('click', () => toggleCurso(div, c.creditos));
      divSem.appendChild(div);
    });
    container.appendChild(divSem);
  });
  habilitarCursos();
  actualizarCreditos();
}

function toggleCurso(el, cred) {
  if (el.classList.contains('bloqueado')) return;
  if (el.classList.contains('aprobado')) {
    el.classList.remove('aprobado');
    creditosTotales -= cred;
  } else {
    el.classList.add('aprobado');
    creditosTotales += cred;
  }
  actualizarCreditos();
  habilitarCursos();
}

function habilitarCursos() {
  const aprobados = Array.from(document.querySelectorAll('.curso.aprobado'))
                         .map(e => e.dataset.id);
  document.querySelectorAll('.curso').forEach(el => {
    const prereqs = JSON.parse(el.dataset.pr);
    if (el.classList.contains('aprobado')) {
      el.classList.remove('bloqueado');
    } else {
      const ok = prereqs.every(r => aprobados.includes(r));
      el.classList.toggle('bloqueado', !ok);
    }
  });
}

function actualizarCreditos() {
  document.getElementById('creditos-totales').textContent = `Créditos aprobados: ${creditosTotales}`;
}

document.addEventListener('DOMContentLoaded', cargarMalla);

