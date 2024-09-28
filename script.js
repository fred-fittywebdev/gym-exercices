const apiKey = '22b7217e76mshc48353be167cd16p1cf4e7jsn759db3faa75a'; // Remplacez par votre clé API
const apiUrl = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart';
let allExercises = [];

document.getElementById('fetchExercises').addEventListener('click', fetchExercises);
document.getElementById('searchInput').addEventListener('input', searchExercises);

function fetchExercises() {
    const exerciseList = document.getElementById('exerciseList');
    const bodyPart = document.getElementById('bodyPartSelect').value;
    const url = `${apiUrl}/${bodyPart}?limit=10&offset=0`;
    exerciseList.innerHTML = '<p>Chargement...</p>';

    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(exercises => {
        allExercises = exercises;
        displayExercises(exercises);
    })
    .catch(error => {
        console.error('Erreur:', error);
        exerciseList.innerHTML = '<p>Une erreur est survenue lors de la récupération des exercices.</p>';
    });
}

function displayExercises(exercises) {
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';

    exercises.forEach(exercise => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise-item';
        exerciseElement.innerHTML = `
            <div class="exercise-info">
                <h3>${exercise.name}</h3>
                <p>Équipement: ${exercise.equipment}</p>
                <p>Partie du corps ciblée: ${exercise.bodyPart}</p>
            </div>
            <img src="${exercise.gifUrl}" alt="${exercise.name}" class="exercise-gif">
        `;
        exerciseList.appendChild(exerciseElement);
    });
}

function searchExercises() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredExercises = allExercises.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm) ||
        exercise.equipment.toLowerCase().includes(searchTerm) ||
        exercise.bodyPart.toLowerCase().includes(searchTerm)
    );
    displayExercises(filteredExercises);
}