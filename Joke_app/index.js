import express from "express";
import axios from "axios";
const app = express();
const PORT = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Handle requests for the home page
app.get('/', async (req, res) => {
    try {
        // Fetch joke data from JokeAPI
        const { data } = await axios.get('https://v2.jokeapi.dev/joke/Programming');
        const joke = data.type === 'single' ? data.joke : `${data.setup}<br>${data.delivery}`;
        
        // Render EJS template with joke data
        res.render('index.ejs', { joke });
    } catch (error) {
        console.error('Error fetching joke:', error.message);
        res.status(500).send('Error fetching joke');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
