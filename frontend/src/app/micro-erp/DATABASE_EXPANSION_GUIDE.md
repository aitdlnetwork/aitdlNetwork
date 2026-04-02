# AITDL Micro-ERP: Database Expansion & Migration Guide

The AITDL Micro-ERP uses a **Sovereign WASM Engine** (sql.js). The database is generated entirely in the client's browser, and its binary data is persisted as a Base64-encoded string in the browser's `localStorage` (`billforge_erp_db`). 

Because user data never touches a central cloud server, **you cannot run traditional database migrations via a backend script.** 

To guarantee you **never break existing user databases or cause data loss** when expanding this app in the future, follow these strict architectural rules.

## Core Rule 1: Never DROP or Modify Existing Columns
SQLite WASM has limited `ALTER TABLE` support. Never delete existing columns or rename them. If you no longer need a column, simply stop querying it in your React components.
- **NEVER DO:** `ALTER TABLE products DROP COLUMN sku;`
- If you made a mistake on a column's purpose, just leave the data dormant. Storage space on text/null is virtually zero.

## Core Rule 2: Adding New Tables Safely
When adding entirely new modules (e.g., HR/Payroll, Time Tracking), always use the `IF NOT EXISTS` clause. This ensures that a new user gets the table, while an returning user's existing tables are not overwritten.

```sql
// In lib/erp/DatabaseContext.tsx > loadDB()
database.run(`CREATE TABLE IF NOT EXISTS payroll (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  employee_name TEXT,
  salary REAL,
  created_at TEXT DEFAULT (datetime('now'))
)`);
```

## Core Rule 3: Adding New Columns to Existing Tables (Schema Migration)
If you need to add a new column to an existing table (e.g., adding `tax_number` to `products`), you must gracefully handle the migration using SQLite's `PRAGMA table_info` or a `try-catch` block.

**Recommended Pattern for Column Additions:**
Place this block inside `DatabaseContext.tsx` right after the `CREATE TABLE IF NOT EXISTS` blocks.

```ts
// How to safely add a new column for existing users:
try {
  // If the column already exists, this throws an expected error, which we catch and ignore.
  // If it doesn't exist (returning user), it successfully adds the column.
  database.run(`ALTER TABLE products ADD COLUMN is_taxable INTEGER DEFAULT 1`);
} catch(e) { /* Column already exists, safe to ignore */ }
```

## Core Rule 4: Data Type Forgiveness
JSON text blobs are incredibly powerful for future-proofing in this architecture.
Notice how `items_json` in the `bills` and `purchases` tables stores all the line-item details. If you ever need to add a new line-item property (e.g., `item_discount`), you don't need a database migration! You just start writing the new JSON key into the `items_json` object. The React UI can easily handle missing keys using `obj.item_discount || 0`.

## Core Rule 5: User Backups Before Major Upgrades
Before pushing a major UI update that fundamentally changes how data is read/written to the ledger, prompt users to export their `.sqlite` file. 
If an update hypothetically breaks their local app, they can simply hit **Clear & Reset Workspace** on the boot screen and upload their `.sqlite` file to resume exactly where they left off.

## Summary Checklist for New Features
1. [ ] Did I use `IF NOT EXISTS` on new tables?
2. [ ] If adding new columns to old tables, did I use `try/catch` with `ALTER TABLE ADD COLUMN`?
3. [ ] Are my React components handling `undefined` or `null` values gracefully for older records that don't have the new data fields?
4. [ ] Did I avoid renaming/dropping anything in `DatabaseContext.tsx`?

Stick to these rules, and your offline-first AITDL module will scale elegantly for years without causing issues for early adopters.
