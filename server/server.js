const express = require ('express');
const app = express();
const path = require ('path');
const router = require('./routers/mainRouter');


app.use(express.static(path.join(__dirname, '../')));

app.use('/', router)

app.listen(3000);