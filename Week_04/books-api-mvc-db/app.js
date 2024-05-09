const express = require("express");
const bookController = require("./controllers/booksController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const validateBook = require("./middlewares/validateBook");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Use environment variable or default port 

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.get("/books", bookController.getAllBooks);
app.get("/books/:id", bookController.getBookById);
app.post("/books", validateBook, bookController.createBook);
app.put("/books/:id", validateBook, bookController.updateBook);
app.delete("/books/:id", bookController.deleteBook);

app.listen(port, async () =>{
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
        // ends with code 1, signifying an error
    }

    console.log(`Server listening on port ${port}`);
});

// sigint manages graceful shutdown 
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
    // ends with code 0, signifying a clean shutdown
})