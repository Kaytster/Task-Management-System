import mysql from 'mysql2/promise';

// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_SCHEMA,
//   });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kes12359',
  database: 'task_management_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//The most recently created list
  const recentList = async () => {
    try {
      const query = "SELECT * from individual_list ORDER BY IndList_ID DESC LIMIT 1 "; 
      const [rows] = await pool.execute(query); 
      return rows[0];
    } catch (error) {
      console.error("Database Error:", error); 
      throw new Error("Failed to fetch data.");
    }
  };

//The tasks within the recent list
// il = Individual_List
// it = Individual_Task
// ilt = Individual_Link
  const recentListTasks = async () => {
    try {
        const query = `
          SELECT 
            il.IndList_ID, 
            il.IndList_Name, 
            il.IndList_Status, 
            it.IndTask_ID, 
            it.IndTask_Name, 
            it.IndTask_Content, 
            it.IndTask_Status 
          FROM 
            individual_list il
          LEFT JOIN 
            individual_link ilt ON il.IndList_ID = ilt.IndList_ID
          LEFT JOIN 
            individual_task it ON ilt.IndTask_ID = it.IndTask_ID
          WHERE 
            il.IndList_ID = (SELECT MAX(IndList_ID) FROM individual_list)
        `;
    
        const [rows] = await pool.execute(query);
        return rows;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data.");
      }
    };

  export {recentList, recentListTasks};
