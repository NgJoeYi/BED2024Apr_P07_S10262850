const express = require("express");
const userController = require("./controllers/userController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");

const app = express();

const staticMiddleware = express.static("public"); // Path to the public folder

const port = 3000; // Use environment variable or default port 

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

// User routes
app.get("/users", userController.getAllUsers);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updatedUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users/search", userController.searchUsers);

app.listen(port, async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Ends with code 1, signifying an error
    }

    console.log(`Server listening on port ${port}`);
});

// SIGINT manages graceful shutdown 
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0); // Ends with code 0, signifying a clean shutdown
});

module.exports = app;
