// Importar
const express = require('express');
const cors = require('cors');
const { conseguirPost, crearPost, actualizarPost, eliminarPost } = require('./consultas');

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Ruta GET: Obtener posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await conseguirPost();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta POST: Crear nuevo post
app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    try {
        const nuevoPost = await crearPost(titulo, img, descripcion);
        res.status(201).json(nuevoPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta PUT: Actualizar un post
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, img, descripcion } = req.body;
    try {
        await actualizarPost(id, titulo, img, descripcion);
        res.status(200).send('Post actualizado correctamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta DELETE: Eliminar un post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarPost(id);
        res.status(200).send('Post eliminado correctamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
