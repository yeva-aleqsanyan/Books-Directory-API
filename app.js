const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/books', require('./routes/books'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
