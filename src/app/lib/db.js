import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt'; // Import bcrypt

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kes12359',
  database: 'task_management_system',
});

const fetchAccounts = async () => {
  try {
    const query = "select * from account";
    const [rows] = await connection.execute(query);
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data."); // Moved inside catch
  }
};

const verifyUserCredentials = async (username, password) => {
  try {
    const query = 'SELECT * FROM account WHERE Account_Username = ?';
    const [rows] = await connection.execute(query, [username]);

    if (rows.length === 0) {
      return false;
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.Account_Password); // Compare hashed passwords

    return passwordMatch;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to verify user credentials.');
  }
};

export { fetchAccounts, verifyUserCredentials };