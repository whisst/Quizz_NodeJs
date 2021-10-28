const path = require('path');
const express = require('express');
const morgan = require('morgan')
const handlebar = require('express-handlebars')
const app = express();
const port = 3001;

const db = require('./config/db');
db.connect();
// app.use(morgan('combined'));
app.engine('hbs', handlebar({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

const route = require('./routes')

route(app);

app.listen(port, () => {
    console.log(`App listen at http://localhost:${port}`)
})

