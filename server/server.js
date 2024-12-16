const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const app = express();

app.use(cors());

const pool = mariadb.createPool({
  host: 'mariadb',
  user: 'ask',
  password: 'ask',
  database: 'mydatabase',
  port: 3306,
  connectionLimit: 5,
});

// Reste du code inchangé


app.get('/', (req, res) => {
  res.send('Serveur en marche!');
});

// Route pour tester la connexion MariaDB
app.get('/test-db', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const databases = await conn.query('SHOW DATABASES');
    console.log('Bases de données trouvées:', databases);
    res.json(databases);
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
}); 

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});