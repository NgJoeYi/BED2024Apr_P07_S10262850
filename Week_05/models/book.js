const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    // retrieve all books
    static async getAllBooks() {
        // wait for connection to establish
        const connection = await sql.connect(dbConfig);
        // executing this command through vsc when sqlQuery is called upon
        const sqlQuery = `SELECT * FROM Books`
        // cue for connection to establish now when request is called upon
        const request = connection.request();
        // when i call out result, the query will be sent
        const result = await request.query(sqlQuery);
        connection.close();

        // recordset is used to hold records from database
        return result.recordset.map(
            (row) => new Book(row.id, row.title, row.author)
        );
    }
    static async getBookById(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Books WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        // i dont understand the below code 
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new Book(
              result.recordset[0].id,
              result.recordset[0].title,
              result.recordset[0].author
            )
          : null; // Handle book not found
        }

        static async updateBook(id, newBookData) {
            const connection = await sql.connect(dbConfig);
        
            const sqlQuery = `UPDATE Books SET title = @title, author = @author WHERE id = @id`; // Parameterized query
        
            const request = connection.request();
            request.input("id", id);
            request.input("title", newBookData.title || null); // Handle optional fields
            request.input("author", newBookData.author || null);
        
            await request.query(sqlQuery);
        
            connection.close();
        
            return this.getBookById(id); // returning the updated book data
          }

    static async deleteBook(id) {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `DELETE FROM Books WHERE id = @id;`;
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
        connection.close();

        return result.rowsAffected > 0;
    }

    static async createBook(newBookData){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`;

        const request = connection.request();
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);

        const result = await request.query(sqlQuery);
        connection.close();
        return this.getBookById(result.recordset[0].id);
    }
}
module.exports = Book; // so other files can import this 