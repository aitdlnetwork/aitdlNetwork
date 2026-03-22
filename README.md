# AITDL Network - Intelligent Systems

A modern, high-conversion React application designed for AITDL Network. This project provides a showcase for enterprise-grade AI solutions, education platforms (LMS), POS billing software, and custom software architecture.

## 🚀 Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (v3.4), Custom Glassmorphism UI
- **Routing:** React Router DOM
- **Icons & Typography:** Material Symbols, Space Grotesk, Outfit

## 🛡️ 5-Layer Security & Branding Architecture

This project implements a robust set of security and authorship validations:

1. **Git Pre-Commit Hook (Auto Signature):** Automatically injects the AITDL Network authorship header into all supported source files upon commit via `enforce-signature.js`.
2. **Runtime Watermark:** A subtle, fixed DOM element that enforces the brand visually on the client side (Anti-Copy Psychology).
3. **Code Fingerprinting (Advanced):** Generates and logs a unique SHA-256 build hash in the browser console using the Web Crypto API.
4. **License Enforcement Check:** Verifies the runtime hostname. Warns the console if the application is hosted outside of authorized domains (`aitdl.com`, `localhost`).
5. **AI Rule & Code Enforcement Combo:** The unified approach of all the above features ensuring maximum brand adherence.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

- `frontend/src/pages/` - Core views (`Home.jsx`, `Services.jsx`, `Contact.jsx`)
- `frontend/src/components/` - Shared layout components (`Header.jsx`, `Footer.jsx`)
- `enforce-signature.js` - Node script for the pre-commit signature injection hook.
- `.git/hooks/pre-commit` - Executable Git hook trigger.

---

*Designed & Architected by AITDL NETWORK*
*© 2026 | Vikram Samvat 2083*
