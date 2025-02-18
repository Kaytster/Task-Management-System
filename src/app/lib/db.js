import mysql from "mysql2/promise";

// connect to the database
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

  export { fetchAccounts };