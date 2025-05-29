# AMRC Quiz Portal

This project is a web-based quiz portal for Avyakt Murli Readers Club (AMRC), built with React, Vite, and Firebase. It allows users to participate in quizzes, view instructions, check their results, and see the leaderboard. Admins can update quiz settings, instructions, and manage quiz data via a secure admin panel.

## Features

- **User Portal:**  
  - Home page with inspirational quotes and image carousel  
  - Quiz instructions and timer-based quiz participation  
  - Result lookup by name, phone, and location  
  - Public leaderboard

- **Admin Panel:**  
  - Secure login for admins  
  - Update quiz Google Form URL, Google Sheet ID, instructions, duration, and daily thought  
  - All settings are stored in Firebase Firestore

- **Tech Stack:**  
  - React + Vite for fast frontend development  
  - Tailwind CSS for styling  
  - Firebase Firestore for configuration and data  
  - Google Forms and Google Sheets integration for quiz and results

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Access the app at [http://localhost:5173](http://localhost:5173)

## Folder Structure

- `src/Pages/` – Main pages (Home, Quiz, Instructions, Result, Leaderboard, Admin)
- `src/components/` – Reusable components (AdminForm, etc.)
- `src/Context/` – React context for configuration
- `src/Firebase/` – Firebase configuration

## Customization

- Update quiz settings and instructions via the Admin panel (`/admin` route)
- Quiz and results are managed via Google Forms and Sheets (integrated using [opensheet.elk.sh](https://opensheet.elk.sh/))

## License

MIT
