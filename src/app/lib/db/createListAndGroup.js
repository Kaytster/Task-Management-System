import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kes12359',
  database: 'task_management_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const createList = async (userId) => {
    try {
        const query = 'INSERT INTO individual_list WHERE user_ID = ?'
    }
};