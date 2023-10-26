const express = require('express');
const api_routes = require('./controllers/api_routes'); 
const db = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use('/api', api_routes);

db.on('open', () => {
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
