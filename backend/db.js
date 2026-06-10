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
      status VARCHAR(30) NOT NULL DEFAULT 'aberto',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try {
    await connectionPool.execute("ALTER TABLE contacts ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'aberto'");
  } catch (error) {
    if (error.code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }

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

async function listContacts() {
  const connectionPool = getPool();

  if (!connectionPool) {
    return [];
  }

  await initDatabase();

  const [rows] = await connectionPool.execute(
    "SELECT id, name, email, message, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 50"
  );

  return rows;
}

async function updateContactStatus(id, status) {
  const connectionPool = getPool();

  if (!connectionPool) {
    return false;
  }

  await initDatabase();

  const [result] = await connectionPool.execute("UPDATE contacts SET status = ? WHERE id = ?", [status, id]);

  return result.affectedRows > 0;
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
  listContacts,
  saveContact,
  updateContactStatus,
};
