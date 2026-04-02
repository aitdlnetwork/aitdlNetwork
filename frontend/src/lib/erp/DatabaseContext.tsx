/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Database, SqlJsStatic } from 'sql.js';

interface DatabaseContextType {
  db: Database | null;
  isReady: boolean;
  error: string | null;
  bootStatus: string;
  persistDB: () => void;
  lastUpdated: string;
  exportDatabase: () => void;
  importDatabase: (file: File) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

// LIGHTWEIGHT POLLING FOR THE GLOBAL SCRIPT (Injected in layout.tsx)
async function getSqlJs(): Promise<((config?: { wasmBinary: ArrayBuffer }) => Promise<SqlJsStatic>) | null> {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 20000;
    const check = () => {
      // Look for the global function provided by /sql-wasm.js
      const win = window as unknown as { initSqlJs?: (config?: { wasmBinary: ArrayBuffer }) => Promise<SqlJsStatic> };
      if (win.initSqlJs) {
        resolve(win.initSqlJs);
      } else if (Date.now() > deadline) {
        reject(new Error('Sovereign Engine Glue (initSqlJs) timed out. Check layout.tsx.'));
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

export const ERPDatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<Database | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bootStatus, setBootStatus] = useState<string>('Booting Sovereign Node...');

  useEffect(() => {
    let active = true;

    async function loadDB() {
      try {
        setBootStatus('Warming up Engine Glue...');
        const initFunc = await getSqlJs();
        if (!initFunc) throw new Error('Engine Glue (initSqlJs) is missing.');

        // Manual WASM Binary Fetch (Highest Reliability)
        setBootStatus('Fetching WASM Bytecode...');
        console.log('ERPEngine: Downloading WASM manually via fetch');
        
        // Use local with a version buster
        const wasmRes = await fetch(`/sql-wasm.wasm?v=${Date.now()}`);
        let wasmBinary: ArrayBuffer;
        
        if (wasmRes.ok) {
          wasmBinary = await wasmRes.arrayBuffer();
        } else {
          console.warn('ERPEngine: Local WASM failed, falling back to CDN');
          const cdnRes = await fetch('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.wasm');
          if (!cdnRes.ok) throw new Error('Could not fetch WASM from local or CDN.');
          wasmBinary = await cdnRes.arrayBuffer();
        }

        setBootStatus('Starting WASM Runtime...');
        console.log('ERPEngine: Starting WASM runtime with binary buffer');
        const SQL: SqlJsStatic = await initFunc({
          wasmBinary,
        }) as SqlJsStatic;

        if (!active) return;

        setBootStatus('Reading Local Storage...');
        const saved = localStorage.getItem('billforge_erp_db');
        let database: Database;

        if (saved) {
          try {
            // Decoding: atob is generally fast enough, but we use modern Uint8Array.from for safety if needed
            const binaryString = atob(saved);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            database = new SQL.Database(bytes);
          } catch (e) {
            console.error('ERPEngine: corrupt saved DB, creating fresh.', e);
            database = new SQL.Database();
          }
        } else {
          database = new SQL.Database();
        }

        setBootStatus('Standardizing Schema...');
        // Sovereign Schema v1.5 - Unified for Portability
        database.run(`CREATE TABLE IF NOT EXISTS business_profile (key TEXT PRIMARY KEY, value TEXT)`);
        
        // Ensure last_updated_at exists
        database.run(`INSERT OR IGNORE INTO business_profile (key, value) VALUES ('last_updated_at', datetime('now'))`);

        database.run(`CREATE TABLE IF NOT EXISTS clients (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, addr TEXT, email TEXT, phone TEXT, gst TEXT, contact TEXT, 
          created_at TEXT DEFAULT (datetime('now'))
        )`);

        database.run(`CREATE TABLE IF NOT EXISTS vendors (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, addr TEXT, email TEXT, phone TEXT, gst TEXT, contact TEXT, 
          created_at TEXT DEFAULT (datetime('now'))
        )`);

        database.run(`CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, description TEXT, category TEXT, sku TEXT, 
          purchase_rate REAL DEFAULT 0, default_rate REAL DEFAULT 0, 
          default_qty REAL DEFAULT 1, unit TEXT, min_stock REAL DEFAULT 0, 
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        )`);

        database.run(`CREATE TABLE IF NOT EXISTS bills (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bill_number TEXT UNIQUE, doc_type TEXT, status TEXT,
          from_name TEXT, from_tagline TEXT, from_addr TEXT,
          to_name TEXT, to_addr TEXT, client_id INTEGER,
          issue_date TEXT, due_date TEXT,
          discount REAL DEFAULT 0, tax REAL DEFAULT 0, currency TEXT DEFAULT '₹',
          subtotal REAL DEFAULT 0, total REAL DEFAULT 0,
          bank_name TEXT, bank_bank TEXT, bank_acc TEXT, bank_ifsc TEXT, bank_type TEXT, bank_branch TEXT, show_bank INTEGER DEFAULT 1,
          upi_id TEXT, upi_name TEXT, show_upi INTEGER DEFAULT 1,
          notes TEXT, footer_msg TEXT, sign_label TEXT,
          show_sign INTEGER DEFAULT 1, show_for_company INTEGER DEFAULT 1, show_aitdl INTEGER DEFAULT 1,
          items_json TEXT,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        )`);

        database.run(`CREATE TABLE IF NOT EXISTS purchases (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bill_number TEXT UNIQUE, doc_type TEXT, status TEXT,
          to_name TEXT, to_addr TEXT, vendor_id INTEGER,
          issue_date TEXT, due_date TEXT,
          discount REAL DEFAULT 0, tax REAL DEFAULT 0, currency TEXT DEFAULT '₹',
          subtotal REAL DEFAULT 0, total REAL DEFAULT 0,
          notes TEXT, items_json TEXT,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        )`);

        database.run(`CREATE TABLE IF NOT EXISTS inventory_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          type TEXT, -- IN, OUT
          reference_doc TEXT, -- Invoice or PO number
          qty REAL,
          created_at TEXT DEFAULT (datetime('now'))
        )`);

        database.run(`CREATE TABLE IF NOT EXISTS financial_ledger (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          entity_id INTEGER, -- Client or Vendor ID
          entity_type TEXT, -- CLIENT, VENDOR
          type TEXT, -- PAYMENT, RECEIPT, CREDIT_NOTE, DEBIT_NOTE
          amount REAL,
          currency TEXT DEFAULT '₹',
          reference_doc TEXT, -- Bill/Invoice Number
          notes TEXT,
          created_at TEXT DEFAULT (datetime('now'))
        )`);
        
        database.run(`CREATE TABLE IF NOT EXISTS smriti_notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          content TEXT, 
          priority TEXT DEFAULT 'low',
          due_date TEXT,
          category TEXT,
          description TEXT,
          status TEXT DEFAULT 'pending', 
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        )`);

        // Migration: Ensure new columns exist for existing databases
        try { database.run(`ALTER TABLE smriti_notes ADD COLUMN priority TEXT DEFAULT 'low'`); } catch(e) {}
        try { database.run(`ALTER TABLE smriti_notes ADD COLUMN due_date TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE smriti_notes ADD COLUMN category TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE smriti_notes ADD COLUMN description TEXT`); } catch(e) {}

        // Phase 2 Migration: Professional Document Fields
        try { database.run(`ALTER TABLE bills ADD COLUMN from_gstin TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE bills ADD COLUMN from_pan TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE bills ADD COLUMN to_gstin TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE bills ADD COLUMN to_pan TEXT`); } catch(e) {}
        
        try { database.run(`ALTER TABLE purchases ADD COLUMN from_gstin TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE purchases ADD COLUMN from_pan TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE purchases ADD COLUMN to_gstin TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE purchases ADD COLUMN to_pan TEXT`); } catch(e) {}

        try { database.run(`ALTER TABLE products ADD COLUMN hsn_code TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE products ADD COLUMN default_uom TEXT DEFAULT 'pcs'`); } catch(e) {}

        // Phase 3: Profile persistency
        try { database.run(`ALTER TABLE clients ADD COLUMN pan TEXT`); } catch(e) {}
        try { database.run(`ALTER TABLE vendors ADD COLUMN pan TEXT`); } catch(e) {}


        // DIAGNOSTICS: Verify engine is healthy
        try {
          const res = database.exec("SELECT name FROM sqlite_master WHERE type='table'");
          console.table(res[0]?.values?.map(v => ({ TableName: v[0] })) || []);
        } catch(e) { 
          console.warn("ERPEngine: Schema verification log failed", e); 
        }

        if (active) {
          setDb(database);
          setBootStatus('Workspace is Online');
          setIsReady(true);
        }
      } catch (e: unknown) {
        if (!active) return;
        const msg = (e instanceof Error) ? e.message : 'Unknown DB Error';
        console.error('ERPEngine: Critical Failure:', e);
        setError(msg);
      }
    }

    loadDB();
    return () => { active = false; };
  }, []);

  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Persistence logic - Simple and Direct
  useEffect(() => {
    if (!db || !isReady) return;
    
    // Initial fetch of last updated
    try {
      const res = db.exec("SELECT value FROM business_profile WHERE key='last_updated_at'");
      if (res[0]) {
        const val = res[0].values[0][0] as string;
        setTimeout(() => setLastUpdated(val), 0);
      }
    } catch(e) { console.error(e); }
    const persist = () => {
      if (!db || !isReady) return;
      try {
        console.log('ERPEngine: Persistence triggered');
        
        // Refresh meta timestamp
        const now = new Date().toISOString();
        db.run("UPDATE business_profile SET value=? WHERE key='last_updated_at'", [now]);
        setLastUpdated(now);

        // Optimized binary to base64 conversion using chunking to prevent stack overflow
        const data = db.export();
        const bytes = new Uint8Array(data);
        let binary = '';
        const chunkSize = 8192;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
        }
        localStorage.setItem('billforge_erp_db', btoa(binary));
      } catch (e: unknown) {
        console.error('ERPEngine: Persistence failed:', e);
      }
    };

    const interval = setInterval(persist, 30000); // 30s auto-save
    window.addEventListener('beforeunload', persist);
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', persist);
      persist(); // Final save on cleanup
    };
  }, [db, isReady]);

  // Handle manual save from UI components
  const persistDB = () => {
    if (!db || !isReady) return;
    try {
      const now = new Date().toISOString();
      db.run("UPDATE business_profile SET value=? WHERE key='last_updated_at'", [now]);
      setLastUpdated(now);

      const data = db.export();
      const bytes = new Uint8Array(data);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
      }
      localStorage.setItem('billforge_erp_db', btoa(binary));
      console.log('ERPEngine: Manual save completed.');
    } catch(e) {
      console.error('ERPEngine: Manual save failed:', e);
    }
  };

  // Export the raw SQLite binary for portability
  const exportDatabase = () => {
    if (!db || !isReady) return;
    try {
      const data = db.export();
      const now = new Date();
      const datePart = now.toISOString().split('T')[0];
      const timePart = now.getHours().toString().padStart(2, '0') + 
                      now.getMinutes().toString().padStart(2, '0') + 
                      now.getSeconds().toString().padStart(2, '0');
      const vsYear = now.getFullYear() + 57; // Vikram Samvat approximation

      const filename = `aitdl_in_${datePart}_${timePart}_VS${vsYear}.sqlite`;

      // Use BlobPart[] to resolve TS conflicts without using 'any'
      const blob = new Blob([data as unknown as BlobPart], { type: 'application/x-sqlite3' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      console.log(`ERPEngine: Database exported as ${filename}`);
    } catch(e) {
      console.error('ERPEngine: Export failed:', e);
    }
  };

  // Import/Restore a .sqlite backup
  const importDatabase = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(result);
          let binary = '';
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64 = btoa(binary);
          localStorage.setItem('billforge_erp_db', base64);
          window.location.reload(); // Reload to boot with new data
        }
      };
      reader.readAsArrayBuffer(file);
    } catch(e) {
      console.error('ERPEngine: Import failed:', e);
      throw e;
    }
  };

  return (
    <DatabaseContext.Provider value={{ db, isReady, error, bootStatus, persistDB, lastUpdated, exportDatabase, importDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useERPDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useERPDatabase must be used within an ERPDatabaseProvider');
  }
  return context;
};
