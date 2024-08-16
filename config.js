import mysql from 'mysql2';

const DEFAULT_CONFIG = {
  host: 'bvujrglb0mttpgu3xvcd-mysql.services.clever-cloud.com',
  user: 'uzvvr21jvwb1em53',
  port: 3306,
  password: 'CBr2skYnSbsBlQJFaspQ',
  database: 'bvujrglb0mttpgu3xvcd'
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

export const db = await mysql.createConnection(connectionString);