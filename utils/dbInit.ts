import {SQLiteDatabase} from 'expo-sqlite';

export const initDatabase = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  if ((result?.user_version || 0) > 0) {
    return;
  }
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      category_name TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      creation_date TEXT NOT NULL,           -- ISO-8601 date string
      text TEXT NOT NULL,
      amount REAL NOT NULL,
      item_type INTEGER NOT NULL,        -- 0 = expense, 1 = income
    
      FOREIGN KEY (category_id) REFERENCES category(id)
    );
  `);
  
  await db.execAsync(`
      INSERT INTO category (icon, category_name) VALUES
        ('restaurant', 'Food'),
        ('directions-car', 'Transport'),
        ('shopping-cart', 'Shopping'),
        ('home', 'Housing'),
        ('local-hospital', 'Health'),
        ('sports-esports', 'Entertainment'),
        ('school', 'Education'),
        ('phone-android', 'Phone'),
        ('wifi', 'Internet'),
        ('electric-bolt', 'Utilities'),

        -- income categories
        ('work', 'Salary'),
        ('account-balance', 'Bank'),
        ('attach-money', 'Other Income');
  `)
  
  await db.execAsync(`PRAGMA user_version = 1`);
}