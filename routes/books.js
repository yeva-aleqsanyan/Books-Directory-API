const express = require('express');
const router = express.Router();
const booksData = require('../data/books.json');

router.get('/', (req, res) => {
    const formattedBooks = JSON.stringify(booksData, null, 4);
    res.type('json').send(formattedBooks);
});

router.get('/:id', (req, res) => {
    const book = booksData.find(book => book.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const formattedBook = JSON.stringify(book, null, 4);
    res.type('json').send(formattedBook);
});

router.post('/', (req, res) => {
    const newBook = req.body;
    booksData.push(newBook);
    res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    let index = booksData.findIndex(book => book.id === bookId);
    if (index !== -1) {
        booksData[index] = { ...booksData[index], ...updatedBook };
        res.json(booksData[index]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = booksData.findIndex(book => book.id === bookId);
    if (index !== -1) {
        booksData.splice(index, 1);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;