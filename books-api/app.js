const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
 ];

 app.use(express.json());
 app.use(bodyParser.urlencoded({extended: true}));

 app.get('/books', (req, res) =>
{
    res.json(books);
});