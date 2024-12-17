const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());
app.use(express.json());



const pool = mariadb.createPool({
  host: 'mariadb',
  user: 'ask',
  password: 'ask',
  database: 'mydatabase',
  port: 3306,
  connectionLimit: 5,
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation API Node.js',
      version: '1.0.0',
      description: 'Documentation générée avec Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./server.js'], // Path vers les annotations des routes
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
  res.send('Serveur en marche!');
});


app.get('/data', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM your_table'); // Remplacez "your_table" par le nom de votre table
    res.json(rows); // Retourne les données au format JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end();
  }
});


/**
 * @swagger
 * /test-db:
 *   get:
 *     summary: Retourne la liste des bases de données
 *     responses:
 *       200:
 *         description: Liste des bases de données
 *       500:
 *         description: Erreur de connexion à la base de données
 */
app.get('/test-db', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const databases = await conn.query('SHOW DATABASES');
    res.json(databases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (conn) conn.release();
  }
});


const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
});




