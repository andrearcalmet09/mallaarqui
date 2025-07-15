let totalCreditos = 0;
let creditosMaximos = 0;

fetch('malla.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');
    const creditosDiv = document.getElementById('creditos-totales');
    const barra = document.getElementById('barra-interna');

    data.semestres.forEach((semestre) => {
      const divSemestre = document.createElement('div');
      divSemestre.className = 'semestre';
      divSemestre.innerHTML = `<h2>Semestre ${semestre.numero}</h2>`;

      semestre.cursos.forEach(curso => {
        creditosMaximos += curso.creditos;

        const divCurso = document.createElement('div');
        divCurso.className = `curso ${curso.tipo}`;
        divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        // Tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = curso.tipo === 'electivo' ? 'Curso electivo' : 'Curso obligatorio';
        divCurso.appendChild(tooltip);

        // Hover: mostrar prerrequisitos resaltados
        divCurso.addEventListener('mouseover', () => {
          if (curso.requisitos) {
            document.querySelectorAll('.curso').forEach(c => {
              const nombreCurso = c.textContent.split(' (')[0];
              if (curso.requisitos.includes(nombreCurso)) {
                c.classList.add('destacado');
              }
            });
          }
        });

        divCurso.addEventListener('mouseout', () => {
          document.querySelectorAll('.curso.destacado').forEach(c => {
            c.classList.remove('destacado');
          });
        });

        // Click para marcar como aprobado
        divCurso.addEventListener('click', () => {
          const aprobado = divCurso.classList.toggle('aprobado');
          totalCreditos += aprobado ? curso.creditos : -curso.creditos;

          creditosDiv.textContent = `Créditos Aprobados: ${totalCreditos}`;
          const porcentaje = (totalCreditos / creditosMaximos) * 100;
          barra.style.width = `${porcentaje}%`;
        });

        divSemestre.appendChild(divCurso);
      });

      container.appendChild(divSemestre);
    });
  })
  .catch(error => {
    console.error("Error cargando la malla:", error);
  });

// Filtro por tipo de curso
function filtrarCursos(tipo) {
  document.querySelectorAll('.curso').forEach(curso => {
    if (tipo === 'todos') {
      curso.style.display = 'block';
    } else {
      curso.style.display = curso.classList.contains(tipo) ? 'block' : 'none';
    }
  });
}
