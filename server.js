// to start the server "npm start"
// url = http://localhost:3000/

const express = require('express');
const path = require("path");

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

const app = express();

const staticDir = path.join(__dirname, 'js');
app.use('/js', express.static(staticDir));

app
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
