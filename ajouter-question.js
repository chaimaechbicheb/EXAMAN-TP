document.getElementById('add-proposition').addEventListener('click', () => {
  const container = document.createElement('div');
  container.className = "d-flex mb-2";

  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.className = "me-2";

  const input = document.createElement('input');
  input.type = "text";
  input.placeholder = "Texte de la proposition";
  input.className = "form-control";

  container.appendChild(checkbox);
  container.appendChild(input);
  document.getElementById('propositions').appendChild(container);
});
document.getElementById('form-question').addEventListener('submit', function(e) {
  e.preventDefault();

  const enonce = document.getElementById('enonce').value;
  const duree = document.getElementById('duree-q').value;
  const points = document.getElementById('points').value;
  const nomExamen = document.getElementById('nom-examen').value;
  const propExamen = document.getElementById('prop-examen').value;

  const propositions = [];
  document.querySelectorAll('#propositions div').forEach(div => {
    propositions.push({
      texte: div.querySelector('input[type="text"]').value,
      correct: div.querySelector('input[type="checkbox"]').checked
    });
  });

  const key = "examens_" + propExamen;
  let examens = JSON.parse(localStorage.getItem(key)) || [];

  let exam = examens.find(ex => ex.nom === nomExamen);

  if (!exam) { 
    alert("Examen introuvable !");
    return; 
  } 

  const nouvelleQuestion = { enonce, duree, points, propositions };
  exam.questions.push(nouvelleQuestion);
  localStorage.setItem(key, JSON.stringify(examens));

  alert('Question ajoutée avec succès !'); 
  this.reset(); 
  
  document.getElementById('propositions').innerHTML = ''; 
});
const btnAfficher = document.getElementById('btn-afficher');
btnAfficher.addEventListener('click', () => {
  const prop = document.getElementById('prop-search').value;
  const key = "examens_" + prop;
  const examens = JSON.parse(localStorage.getItem(key)) || [];
  
  const container = document.getElementById('list-examens');
  container.innerHTML = "";

  if(examens.length === 0) {
      container.innerHTML = "<p>Aucun examen trouvé.</p>";
      return;
  }

  examens.forEach(ex => {
    const div = document.createElement('div');
    div.className = "card mb-3 p-3";
    div.innerHTML = `
      <h3>${ex.nom} (${ex.duree} min)</h3>
      <p>${ex.description}</p>
      <ul>
        ${ex.questions.map(q => `<li>${q.enonce} (${q.points} pts)</li>`).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
});
