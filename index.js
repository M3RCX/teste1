import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const API_KEY = 'ce20ac06fb3262b6ef00dd5c451648f1'; // Substitua com sua chave de API do The Movie DB

// Configurar o middleware cors
app.use(cors());

app.get('/filmes', async (req, res) => {
    const { page = 1 } = req.query;
    console.log(page);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&watch_region=BR&with_watch_monetization_types=flatrate`;

    try {       
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
});

app.get('/tv', async (req, res) => {
    const { page = 1 } = req.query;
    console.log(page);
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&watch_region=BR&with_watch_monetization_types=flatrate`;

    try {       
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
        console.log(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar serie' });
    }
});

// Endpoint para buscar provedor do filme
// Endpoint para buscar provedor do filme
app.get('/provedores/tv', async (req, res) => {
    const { id } = req.query;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`);
        console.log('url do provider');
        console.log(response);
        const data = await response.json();
        console.log(data);
        const { flatrate } = data.results.BR;
        const { logo_path, provider_name } = flatrate[0];
        res.json({ logo_path, provider_name });
        console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar provedor do filme' });
    }
});

app.get('/provedores/movies', async (req, res) => {
    const { id } = req.query;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`);
        console.log('url do provider');
        console.log(response);
        const data = await response.json();
        console.log(data);
        const { flatrate } = data.results.BR;
        const { logo_path, provider_name } = flatrate[0];
        res.json({ logo_path, provider_name });
        console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar provedor do filme' });
    }
});
  
  

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});