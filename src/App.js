import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [databases, setDatabases] = useState([]); // État pour stocker les bases de données

  useEffect(() => {
    // Appel à l'API backend pour récupérer les bases de données
    axios.get('http://localhost:5000/test-db')
      .then((response) => {
        setDatabases(response.data); // Mettre les données dans l'état
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des bases :', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Bases de Données</h1>
      <ul>
        {databases.map((db, index) => (
          <li key={index}>{db.Database}</li> // Affiche le nom de chaque base
        ))}
      </ul>
    </div>
  );
}

export default App;
