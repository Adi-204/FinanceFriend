import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
      require : true
    },
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