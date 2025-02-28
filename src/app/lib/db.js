import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'; // bcrypt is used to hash the passwords in the database

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
    throw new Error("Failed to fetch data."); 
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
    const passwordMatch = await bcrypt.compare(password, user.Account_Password); // Compare the hashed passwords

    return passwordMatch;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to verify user credentials.');
  }
};

const verifyAccountCreation = async (firstname, lastname, email, username, password, type) => {
  try {
      // Start a transaction
      await connection.beginTransaction();

      // Insert into the 'user' table
      const query1 = 'INSERT INTO user (User_Fname, User_Lname) VALUES (?, ?)';
      await connection.execute(query1, [firstname, lastname]);

      // Insert into the 'account' table
      const accountId = uuidv4();
      const query2 = 'INSERT INTO account (Account_ID Account_Email, Account_Username, Account_Password, Account_Type) VALUES (?, ?, ?, ?)';
      await connection.execute(query2, [accountID, email, username, password, type]);

      // Commit the transaction
      await connection.commit();

      console.log("Database inserts successful");
      return true;

  } catch (error) {
      // Rollback the transaction if any error occurs
      console.log("Rolling back transaction due to error:", error); // Add this line
      await connection.rollback();

      console.error('Database Error:', error);
      return false;
  }
};

const createTaskList = async (listID, listName, listStatus, userID ) => {
  try{
        const query = 'INSERT INTO individual_list (IndList_Name) VALUES (?)';
        await connection.execute(query, [/*listID,*/ listName/*, listStatus, userID*/]);
        console.log("Database inserts successful");
        return true;
  } catch (error) {
    // Rollback the transaction if any error occurs
    console.log("Rolling back transaction due to error:", error); // Add this line
    await connection.rollback();

    console.error('Database Error:', error);
    return false;
}
};

export { fetchAccounts, verifyUserCredentials, verifyAccountCreation, createTaskList };