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
const recentList = async (userId) => {
  try {
      const query =
          'SELECT * from individual_list WHERE User_ID = ? ORDER BY IndList_ID DESC LIMIT 1';
      console.log('SQL Query:', query); // Show the query
      console.log('User ID for query:', userId); // Show the userId
      const [rows] = await pool.execute(query, [userId]);
      console.log('Database rows:', rows); // Show the results from the database
      if (rows.length > 0) {
          return rows[0];
      } else {
          return null;
      }
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch data.');
  }
};

//The tasks within the recent list
// il = Individual_List
// it = Individual_Task
// ilt = Individual_Link
const recentListTasks = async (IndList_ID) => {
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
              il.IndList_ID = ?
      `;

      const [rows] = await pool.execute(query, [IndList_ID]); // Corrected line!
      return rows;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data.");
  }
};

//The most recent group
// g = group
// gm = group members
const recentGroup = async (userId) => {
  try {
      const query = `
          SELECT g.* FROM \`group\` g
          JOIN group_members gm ON g.Group_ID = gm.Group_ID
          WHERE gm.User_ID = ?
          ORDER BY g.Group_ID DESC
          LIMIT 1
      `;
      console.log('SQL Query:', query);
      console.log('User ID for query:', userId);
      const [rows] = await pool.execute(query, [userId]);
      console.log('Database rows:', rows);
      if (rows.length > 0) {
          return rows[0];
      } else {
          return null;
      }
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch data.');
  }
};

const getGroupMembers = async (groupId) => {
  try {
      const query = `
          SELECT a.Account_Username
          FROM account a
          JOIN user u ON a.Account_ID = u.Account_ID 
          JOIN group_members gm ON u.User_ID = gm.User_ID 
          WHERE gm.Group_ID = ?
      `;
      const [rows] = await pool.execute(query, [groupId]);
      return rows;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch data.');
  }
};

const getGroupListsAndTasks = async (groupId) => {
  try {
      const query = `
          SELECT gl.*, gt.*
          FROM group_list gl
          LEFT JOIN group_link glk ON gl.GrpList_ID = glk.GrpList_ID
          LEFT JOIN group_task gt ON glk.GrpTask_ID = gt.GrpTask_ID
          WHERE gl.Group_ID = ?
      `;
      const [rows] = await pool.execute(query, [groupId]);
      return rows;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch data.');
  }
};

const showLists = async (userId) => {
    try {
      const query = `
        SELECT * FROM individual_list 
        WHERE User_ID = ?
      `;
      const [rows] = await pool.execute(query, [userId]);
      return rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch lists.');
    }
  };

  export {recentList, recentListTasks, recentGroup, getGroupMembers, getGroupListsAndTasks, showLists};
