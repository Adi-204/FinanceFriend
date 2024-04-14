import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
  connectionString : process.env.connectionString
});

const db = {
  query: (text, params) => {
    return pool.query(text, params);
  }
};

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database!');
  } catch (error) {
    console.error('PostgreSQL db connection failed:', error);
  }
};

export { db, connectDB };