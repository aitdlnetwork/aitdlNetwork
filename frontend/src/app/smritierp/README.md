# AITDL SmritiERP 

A sovereign, offline-first Enterprise Resource Planning engine built directly into the browser. 

## Architectural Overview
Unlike traditional web-based ERP systems (which rely on a Node.js/Python backend and an external Postgres/MySQL database), the **AITDL SmritiERP runs entirely client-side.**

It leverages **sql.js (SQLite WebAssembly)** to compile a C-based SQL database engine directly into the browser. 
- **Zero Latency:** Queries execute instantly since there is no network round-trip.
- **Zero Cloud Dependence:** Private business data never leaves the user's local machine.
- **Data Persistence:** The binary SQLite database is compressed using Base64 chunking and periodically flushed to the browser's `localStorage` (`billforge_erp_db`).

## Core Modules (`/components`)

1. **`BusinessProfile.tsx`**
   - Configures the business identity (Tagline, Address) and banking details that populate invoices.
   - Handles the core **Sovereign Backup & Restore** mechanics (Export `.sqlite` / Import `.sqlite`).
   - Configures the global `Focus Mode` shortcut key.

2. **`ClientsPanel.tsx` (CRM & Entities)**
   - Manages Network Entities (Clients for incoming revenue, Vendors for outgoing payments).
   - Stores contact details, billing addresses, and taxation numbers (GST).

3. **`ProductsPanel.tsx` (Inventory Master)**
   - Manages the central catalog of Products and Services.
   - Defines Unit of Measurements, Purchase Cost, and Selling Rates.
   - Calculates real-time total stock by dynamically aggregating records from the `inventory_ledger`.

4. **`SalesPanel.tsx` & `InvoiceEditor.tsx` (Accounts Receivable)**
   - Dashboard mapping generated Tax Invoices, Quotations, and Proformas.
   - Built with a print-ready PDF layout.
   - Records Incoming Receipts directly to the `financial_ledger`.
   - Records Stock Outflows directly to the `inventory_ledger`.

5. **`PurchasesPanel.tsx` & `PurchaseEditor.tsx` (Accounts Payable)**
   - Manages Purchase Orders and tracks incoming vendor bills.
   - Settles Vendor Payments (logs Outflows to `financial_ledger`).
   - Automatically credits stock based on items received (logs Inflows to `inventory_ledger`).

6. **`LedgerPanel.tsx`**
   - Provides visualization of raw database operations.
   - **Financial Cashbook:** Chronological log of Receipts and Payments.
   - **Stock Movements:** Chronological log of Inventory ins and outs.

## Engine Initialization & Globals (`/lib/erp`)

The database is fundamentally injected dynamically into the Next.js `layout.tsx` to pre-wire the WASM bundle. 
In `DatabaseContext.tsx`:
- The engine fetches the `sql-wasm.wasm` static file.
- Unpacks the user's most recent sync from `localStorage`.
- Automatically executes the v1.5 DDL Schema standardizing (`CREATE TABLE IF NOT EXISTS`).
- Polling saves the binary dump down to `localStorage` every 30 seconds to prevent data loss.

*Please see `DATABASE_EXPANSION_GUIDE.md` for strict rules regarding safe SQL schema expansions.*
