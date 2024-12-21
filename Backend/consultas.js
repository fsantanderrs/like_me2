// Configuración conexión base datos PostgreSQL
const { Pool } = require('pg');

// Datos conexión
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'likeme',
    allowExitOnIdle: true, // Cierra conexiones inactivas automáticamente.
});

// Función: Conseguir los posts
const conseguirPost = async () => {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
};

// Función: Crear nuevo post
const crearPost = async (titulo, img, descripcion) => {
    const query = 'INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *';
    const values = [titulo, img, descripcion];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Función: Actualizar un post
const actualizarPost = async (id, titulo, img, descripcion) => {
    const query = 'UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4';
    const values = [titulo, img, descripcion, id];
    await pool.query(query, values);
};

// Función: Eliminar un post
const eliminarPost = async (id) => {
    const query = 'DELETE FROM posts WHERE id = $1';
    const values = [id];
    await pool.query(query, values);
};

module.exports = { conseguirPost, crearPost, actualizarPost, eliminarPost };
