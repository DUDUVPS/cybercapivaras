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
      source VARCHAR(30) NOT NULL DEFAULT 'contato',
      message TEXT NOT NULL,
      attachment_name VARCHAR(180),
      attachment_type VARCHAR(120),
      attachment_data LONGTEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'aberto',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connectionPool.execute(`
    CREATE TABLE IF NOT EXISTS site_content (
      content_key VARCHAR(80) PRIMARY KEY,
      content_json LONGTEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connectionPool.execute(`
    CREATE TABLE IF NOT EXISTS app_users (
      email VARCHAR(180) PRIMARY KEY,
      name VARCHAR(140) NOT NULL,
      role VARCHAR(80) NOT NULL DEFAULT 'Membro',
      picture LONGTEXT,
      last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const migrations = [
    "ALTER TABLE contacts ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'aberto'",
    "ALTER TABLE contacts ADD COLUMN category VARCHAR(80) NOT NULL DEFAULT 'Geral'",
    "ALTER TABLE contacts ADD COLUMN source VARCHAR(30) NOT NULL DEFAULT 'contato'",
    "ALTER TABLE contacts ADD COLUMN attachment_name VARCHAR(180)",
    "ALTER TABLE contacts ADD COLUMN attachment_type VARCHAR(120)",
    "ALTER TABLE contacts ADD COLUMN attachment_data LONGTEXT",
    "ALTER TABLE app_users ADD COLUMN role VARCHAR(80) NOT NULL DEFAULT 'Membro'",
    "ALTER TABLE app_users ADD COLUMN picture LONGTEXT",
    "ALTER TABLE app_users ADD COLUMN last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
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

async function saveContact({ name, email, category, source, message, attachment }) {
  const connectionPool = getPool();

  if (!connectionPool) {
    return null;
  }

  await initDatabase();

  const [result] = await connectionPool.execute(
    "INSERT INTO contacts (name, email, category, source, message, attachment_name, attachment_type, attachment_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      email,
      category || "Geral",
      source || "contato",
      message,
      attachment?.name || null,
      attachment?.type || null,
      attachment?.data || null,
    ]
  );

  return result.insertId;
}

async function listContacts(source = "chamado") {
  const connectionPool = getPool();

  if (!connectionPool) {
    return [];
  }

  await initDatabase();

  const [rows] = await connectionPool.execute(
    "SELECT id, name, email, category, source, message, attachment_name, attachment_type, attachment_data, status, created_at FROM contacts WHERE source = ? ORDER BY created_at DESC LIMIT 80",
    [source]
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

async function getSiteContent() {
  const connectionPool = getPool();

  if (!connectionPool) {
    return null;
  }

  await initDatabase();

  const [rows] = await connectionPool.execute(
    "SELECT content_json FROM site_content WHERE content_key = ? LIMIT 1",
    ["public"]
  );

  if (!rows.length) {
    return null;
  }

  try {
    return JSON.parse(rows[0].content_json);
  } catch {
    return null;
  }
}

async function saveSiteContent(content) {
  const connectionPool = getPool();

  if (!connectionPool) {
    return false;
  }

  await initDatabase();

  await connectionPool.execute(
    "INSERT INTO site_content (content_key, content_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_json = VALUES(content_json)",
    ["public", JSON.stringify(content)]
  );

  return true;
}

async function saveAppUser({ name, email, role, picture }) {
  const connectionPool = getPool();

  if (!connectionPool || !email) {
    return false;
  }

  await initDatabase();

  await connectionPool.execute(
    "INSERT INTO app_users (email, name, role, picture) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), picture = COALESCE(VALUES(picture), picture), last_seen = CURRENT_TIMESTAMP",
    [email, name || email, role || "Membro", picture || null]
  );

  return true;
}

async function listAppUsers() {
  const connectionPool = getPool();

  if (!connectionPool) {
    return [];
  }

  await initDatabase();

  const [rows] = await connectionPool.execute(
    "SELECT name, email, role, picture, last_seen FROM app_users ORDER BY last_seen DESC LIMIT 200"
  );

  return rows;
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
  getSiteContent,
  listAppUsers,
  saveContact,
  saveAppUser,
  saveSiteContent,
  updateContactStatus,
};
