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
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

// LIGHTWEIGHT POLLING FOR THE GLOBAL SCRIPT (Injected in layout.tsx)
async function getSqlJs(): Promise<any> {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 20000;
    const check = () => {
      // Look for the global function provided by /sql-wasm.js
      if ((window as any).initSqlJs) {
        resolve((window as any).initSqlJs);
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
            setBootStatus('Parsing Database...');
            // Decoding in chunks (already tested working)
            const binaryString = atob(saved);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
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
        // Inline basic schema check
        database.run(`CREATE TABLE IF NOT EXISTS business_profile (key TEXT PRIMARY KEY, value TEXT)`);
        database.run(`CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, addr TEXT, email TEXT, phone TEXT, gst TEXT, contact TEXT, created_at TEXT DEFAULT (datetime('now')))`);
        database.run(`CREATE TABLE IF NOT EXISTS vendors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, addr TEXT, email TEXT, phone TEXT, gst TEXT, contact TEXT, created_at TEXT DEFAULT (datetime('now')))`);
        database.run(`CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, sku TEXT, current_stock REAL DEFAULT 0, unit TEXT, min_stock REAL DEFAULT 0, last_updated TEXT DEFAULT (datetime('now')))`);
        database.run(`CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER, doc_date TEXT, total_amount REAL, tax_amount REAL, discount REAL, status TEXT, created_at TEXT DEFAULT (datetime('now')))`);
        database.run(`CREATE TABLE IF NOT EXISTS purchases (id INTEGER PRIMARY KEY AUTOINCREMENT, vendor_id INTEGER, doc_date TEXT, total_amount REAL, tax_amount REAL, status TEXT, created_at TEXT DEFAULT (datetime('now')))`);
        database.run(`CREATE TABLE IF NOT EXISTS ledger (id INTEGER PRIMARY KEY AUTOINCREMENT, entity_type TEXT, entity_id INTEGER, item_name TEXT, qty REAL, rate REAL, amount REAL, type TEXT, doc_type TEXT, doc_id INTEGER, created_at TEXT DEFAULT (datetime('now')))`);

        // DIAGNOSTICS: Verify engine is healthy
        try {
          const res = database.exec("SELECT name FROM sqlite_master WHERE type='table'");
          console.table(res[0]?.values?.map(v => ({ TableName: v[0] })) || []);
        } catch(e) { 
          console.warn("ERPEngine: Schema verification log failed", e); 
        }

        if (active) {
          setDb(database);
          setBootStatus('Engine is Online');
          setIsReady(true);
        }
      } catch (e: any) {
        if (!active) return;
        console.error('ERPEngine: Critical Failure:', e);
        setError(e.message || 'Failed to initialize database');
      }
    }

    loadDB();
    return () => { active = false; };
  }, []);

  // Persistence logic - Simple and Direct
  useEffect(() => {
    if (!db || !isReady) return;
    
    const persist = () => {
      if (!db || !isReady) return;
      try {
        console.log('ERPEngine: Persistence triggered');
        const data = db.export();
        let binary = '';
        const bytes = new Uint8Array(data);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        localStorage.setItem('billforge_erp_db', btoa(binary));
      } catch (e) {
        console.error('ERPEngine: Persistence failed:', e);
      }
    };

    const interval = setInterval(persist, 20000); // 20s auto-save (better for large DBs)
    window.addEventListener('beforeunload', persist);
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', persist);
    };
  }, [db, isReady]);

  // Handle manual save from UI components
  const persistDB = () => {
    if (!db || !isReady) return;
    try {
      const data = db.export();
      let binary = '';
      const bytes = new Uint8Array(data);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      localStorage.setItem('billforge_erp_db', btoa(binary));
      console.log('ERPEngine: Manual save completed.');
    } catch(e) {
      console.error('ERPEngine: Manual save failed:', e);
    }
  };

  return (
    <DatabaseContext.Provider value={{ db, isReady, error, bootStatus, persistDB }}>
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
