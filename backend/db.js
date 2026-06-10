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
      category VARCHAR(80) NOT NULL DEFAULT 'Geral',
      message TEXT NOT NULL,
      attachment_name VARCHAR(180),
      attachment_type VARCHAR(120),
      attachment_data LONGTEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'aberto',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrations = [
    "ALTER TABLE contacts ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'aberto'",
    "ALTER TABLE contacts ADD COLUMN category VARCHAR(80) NOT NULL DEFAULT 'Geral'",
    "ALTER TABLE contacts ADD COLUMN attachment_name VARCHAR(180)",
    "ALTER TABLE contacts ADD COLUMN attachment_type VARCHAR(120)",
    "ALTER TABLE contacts ADD COLUMN attachment_data LONGTEXT",
  ];

  for (const migration of migrations) {
    try {
      await connectionPool.execute(migration);
    } catch (error) {
      if (error.code !== "ER_DUP_FIELDNAME") {
        throw error;
      }
    }
  }

  isReady = true;
}

async function saveContact({ name, email, category, message, attachment }) {
  const connectionPool = getPool();

  if (!connectionPool) {
    return null;
  }

  await initDatabase();

  const [result] = await connectionPool.execute(
    "INSERT INTO contacts (name, email, category, message, attachment_name, attachment_type, attachment_data) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      email,
      category || "Geral",
      message,
      attachment?.name || null,
      attachment?.type || null,
      attachment?.data || null,
    ]
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
    "SELECT id, name, email, category, message, attachment_name, attachment_type, attachment_data, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 80"
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
