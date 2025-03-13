import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { connection } from 'next/server';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kes12359',
  database: 'task_management_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


const showData = async () => {
  try {
      const query = "SELECT * FROM account"; // Use SELECT for consistency
      const [rows] = await pool.execute(query); // Use pool.execute
      return rows;
  } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch data.");
  }
};

async function execute(query, params) {
  let connection;

  try {
    connection = await pool.getConnection();

    if (
      query === 'START TRANSACTION' ||
      query === 'COMMIT' ||
      query === 'ROLLBACK'
    ) {
      await connection.query(query);
    } else {
      const [rows, fields] = await connection.execute(query, params); // Include fields
      return [rows, fields]; // Return an array with rows and fields
    }
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

const fetchAccounts = async () => {
  try {
    const query = 'select * from account';
    return await execute(query);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
};

const verifyUserCredentials = async (username, password) => {
  try {
    const query = 'SELECT * FROM account WHERE Account_Username = ?';
    const [rows] = await execute(query, [username]);

    if (rows.length === 0) {
      return false;
    }

    const user = rows[0];
    return await bcrypt.compare(password, user.Account_Password);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to verify user credentials.');
  }
};

const verifyAccountCreation = async (
  firstname,
  lastname,
  email,
  username,
  hashedPassword,
  type
) => {
  try {
    await execute('START TRANSACTION');

    try {
      const insertAccountQuery = `
        INSERT INTO Account (Account_Email, Account_Username, Account_Password, Account_Type) 
        VALUES (?, ?, ?, ?)
      `;

      const [result] = await execute(insertAccountQuery, [
        email,
        username,
        hashedPassword,
        type,
      ]);
      console.log('Result from execute:', result);

      console.log('Account insertion result:', result);

      const getAccountIdQuery = 'SELECT LAST_INSERT_ID()';
      const [accountIdResult] = await execute(getAccountIdQuery);
      const accountId = accountIdResult[0]['LAST_INSERT_ID()'];

      console.log('Account ID:', accountId);

      const insertUserQuery =
        'INSERT INTO user (User_Fname, User_Lname, Account_ID) VALUES (?, ?, ?)';
        const [userResult] = await execute(insertUserQuery, [firstname, lastname, accountId]); // Get the result
        const userId = userResult.insertId; // Get the generated User_ID
        console.log('User ID:', userId); // Log the User_ID
      

      await execute('COMMIT');
      return true;
    } catch (error) {
      console.error('Database error during account creation:', error);
      await execute('ROLLBACK');
      return false;
    }
  } catch (error) {
    console.error('Transaction error:', error);
    return false;
  }
};

const createTaskList = async (listID, listName, listStatus, userID) => {
  try {
    const query = 'INSERT INTO individual_list (IndList_Name) VALUES (?)';
    await execute(query, [listName]);
    console.log('Database inserts successful');
    return true;
  } catch (error) {
    console.log('Rolling back transaction due to error:', error);
    await execute('ROLLBACK');
    console.error('Database Error:', error);
    return false;
  }
};

export {
  showData,
  fetchAccounts,
  verifyUserCredentials,
  verifyAccountCreation,
  createTaskList,
};