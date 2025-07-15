fetch('malla.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');
    const creditosDiv = document.getElementById('creditos-totales');
    let creditos = 0;

    data.semestres.forEach((semestre) => {
      const divSemestre = document.createElement('div');
      divSemestre.className = 'semestre';
      divSemestre.innerHTML = `<h2>Semestre ${semestre.numero}</h2>`;

      semestre.cursos.forEach(curso => {
        const divCurso = document.createElement('div');
        divCurso.className = `curso ${curso.tipo}`;
        divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        divCurso.addEventListener('click', () => {
          if (!divCurso.classList.contains('aprobado')) {
            divCurso.classList.add('aprobado');
            creditos += curso.creditos;
          } else {
            divCurso.classList.remove('aprobado');
            creditos -= curso.creditos;
          }
          creditosDiv.textContent = `Créditos Aprobados: ${creditos}`;
        });

        divSemestre.appendChild(divCurso);
      });

      container.appendChild(divSemestre);
    });
  })
  .catch(error => {
    console.error("Error cargando la malla:", error);
  });
