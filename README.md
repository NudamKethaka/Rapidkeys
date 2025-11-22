# Rapidkeys ⚡⌨️

<br />

<div align="center">

  **A modern Tech Store application powered by React and Google Gemini AI.**

  [Live Demo](https://rapidkeys.vercel.app) · [Report Bug](https://github.com/NudamKethaka/Rapidkeys/issues) · [Request Feature](https://github.com/NudamKethaka/Rapidkeys/issues)

</div>

---

## 📖 About The Project

**Rapidkeys** is a modern web application designed as a Tech Store. Built with performance and user experience in mind, it leverages the power of **React** and **Vite** for a lightning-fast frontend. 

What sets Rapidkeys apart is its integration with **Google's Gemini AI**, enabling intelligent features within the application. Whether you are looking for the latest keyboards or tech accessories, Rapidkeys provides a streamlined shopping experience.

### ✨ Key Features

*   **⚡ High Performance:** Built on Vite and React for instant page loads and smooth interactions.
*   **🤖 AI Powered:** Integrated with Google Gemini API for intelligent content generation/assistance.
*   **🛍️ Modern UI:** Clean and responsive interface designed for tech enthusiasts.
*   **📱 Fully Responsive:** Optimized for desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

This project is built using the following technologies:

*   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
*   [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
*   [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
*   [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have Node.js installed on your machine.
*   **Node.js** (v16 or higher recommended)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/NudamKethaka/Rapidkeys.git
    cd Rapidkeys
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    This project requires a Google Gemini API key to function correctly.
    
    *   Create a file named `.env.local` in the root directory.
    *   Add your API key:
        ```env
        VITE_GEMINI_API_KEY=your_api_key_here
        # Note: Check if the code expects 'GEMINI_API_KEY' or 'VITE_GEMINI_API_KEY'
        ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

---

## 📂 Project Structure

```text
Rapidkeys/
├── components/       # Reusable UI components
├── services/         # API services (Gemini AI integration)
├── App.tsx           # Main application component
├── main.tsx          # Entry point
├── constants.ts      # Global constants
└── ...
