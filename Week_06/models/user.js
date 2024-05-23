const sql = require('mssql');
const dbConfig = require('../dbConfig');

class User {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static async createUser(user) {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `
    INSERT INTO Users (username, email) 
    VALUES (@username, @email); 
    SELECT SCOPE_IDENTITY() AS id;
    `;
    const request = connection.request();
    request.input('username', sql.VarChar, user.username);
    request.input('email', sql.VarChar, user.email);
    const result = await request.query(sqlQuery);
    const userId = result.recordset[0].id;
    const createdUser = await this.getUserById(userId);
    connection.close();
    return createdUser;
  }

  static async getUserById(id) {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `SELECT * FROM Users WHERE id = @id`;
    const request = connection.request();
    request.input('id', sql.Int, id);
    const result = await request.query(sqlQuery);
    connection.close();
    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      return new User(user.id, user.username, user.email);
    } else {
      return null;
    }
  }

  static async getAllUsers() {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `SELECT * FROM Users`;
    const request = connection.request();
    const result = await request.query(sqlQuery);
    connection.close();
    return result.recordset.map(row => new User(row.id, row.username, row.email));
  }

  static async updateUser(id, updatedUser) {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`;
    const request = connection.request();
    request.input("id", sql.Int, id);
    request.input("username", sql.VarChar, updatedUser.username || null);
    request.input("email", sql.VarChar, updatedUser.email || null);
    await request.query(sqlQuery);
    connection.close();
    return this.getUserById(id);
  }

  static async deleteUser(id) {
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `DELETE FROM Users WHERE id = @id`;
    const request = connection.request();
    request.input("id", sql.Int, id);
    const result = await request.query(sqlQuery);
    connection.close();
    return result.rowsAffected[0] > 0;
  }

  static async searchUsers(searchTerm) {
    const connection = await sql.connect(dbConfig);
    try {
      const query = `
        SELECT *
        FROM Users
        WHERE username LIKE '%${searchTerm}%'
          OR email LIKE '%${searchTerm}%'
      `;
      const result = await connection.request().query(query);
      return result.recordset;
    } catch (error) {
      throw new Error("Error searching users");
    } finally {
      await connection.close();
    }
  }
}

module.exports = User;
