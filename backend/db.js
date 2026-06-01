const mysql = require("mysql2/promise");

const databaseUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

let pool;
let isReady = false;

function hasDatabase() {
  return Boolean(databaseUrl);
}

function getPool() {
  if (!databaseUrl) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool(databaseUrl);
  }

  return pool;
}

async function initDatabase() {
  const connectionPool = getPool();

  if (!connectionPool || isReady) {
    return;
  }

  await connectionPool.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(180) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  isReady = true;
}

async function saveContact({ name, email, message }) {
  const connectionPool = getPool();

  if (!connectionPool) {
    return null;
  }

  await initDatabase();

  const [result] = await connectionPool.execute(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );

  return result.insertId;
}

async function checkDatabase() {
  const connectionPool = getPool();

  if (!connectionPool) {
    return { configured: false, connected: false };
  }

  await initDatabase();
  await connectionPool.query("SELECT 1");

  return { configured: true, connected: true };
}

module.exports = {
  checkDatabase,
  hasDatabase,
  initDatabase,
  saveContact,
};
