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

    const proprietaire = document.getElementById('proprietaire').value;

    const nomExamen = document.getElementById('nomExamen').value;

    const enonce = document.getElementById('enonce').value;

    const duree = document.getElementById('duree').value;

    const points = document.getElementById('points').value;

    const propositions = [];

    document.querySelectorAll('#propositions div').forEach(div => {

        const checkbox = div.querySelector('input[type="checkbox"]');

        const input = div.querySelector('input[type="text"]');

        propositions.push({
            texte: input.value,
            correcte: checkbox.checked
        });
    });

    const key = 'examens_' + proprietaire;

    const exams = JSON.parse(localStorage.getItem(key)) || [];

    const exam = exams.find(e => e.nom === nomExamen);

    if (!exam) {
        alert('Examen introuvable');
        return;
    }

    const question = {
        enonce: enonce,
        duree: duree,
        points: points,
        propositions: propositions
    };

    exam.questions.push(question);

  
    localStorage.setItem(key, JSON.stringify(exams));

    alert('Question ajoutée avec succès !');

    this.reset();

    document.getElementById('propositions').innerHTML = '';
});
