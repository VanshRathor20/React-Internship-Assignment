### 🎨 React Internship Assignment – Artwork Data Table
---
## 📌 Overview

This project is a React + TypeScript application built using Vite. It displays artwork data from the Art Institute of Chicago API using the PrimeReact DataTable component.

## 🌐 Live Demo
🔗 Live URL: 

---

The application implements:

- Server-side pagination
- Checkbox-based row selection
- Select all (current page only)
- Custom row selection overlay
- Persistent selection across pages
- No prefetching or mass data storage

The project strictly follows all assignment constraints.

---

## 🚀 Tech Stack

- React
- TypeScript
- Vite
- PrimeReact
- Tailwind CSS
- Axios
- 
---
## 📂 Project Structure

```
├── 📁 api
│   └── 📄 artworkApi.ts
├── 📁 assets
│   └── 🖼️ react.svg
├── 📁 components
│   ├── 📄 ArtworkTable.tsx
│   ├── 📄 CustomSelectionOverlay.tsx
│   └── 📄 Home.tsx
├── 📁 types
│   └── 📄 Artwork.ts
├── 📄 App.tsx
├── 🎨 index.css
└── 📄 main.tsx
```
---

### 📦 Folder Explanation

## 📁 api

- Contains API-related logic.

- artworkApi.ts → Handles API requests using Axios.

## 📁 components

Contains UI components.

- ArtworkTable.tsx → Main DataTable implementation.

- CustomSelectionOverlay.tsx → Overlay for selecting N rows.

- Home.tsx → Wrapper or landing component.

## 📁 types

- Contains TypeScript interfaces.

- Artwork.ts → Defines artwork data structure.

## 📄 App.tsx

- Main application container.

## 📄 main.tsx

- Application entry point.

## 🎨 index.css

- Global styles and PrimeReact overrides.

---

### 🔄 Server-Side Pagination

 - Data is fetched per page from:
```
https://api.artic.edu/api/v1/artworks?page=1
```
- API is called whenever the page changes.

- Only current page data is stored in state.

---
## ☑️ Row Selection

- Users can select/deselect individual rows.

- "Select All" applies only to the current page.

- Custom overlay allows selecting a specific number of rows.

- Only row IDs are stored using Set<number>

---

## 🔐 Persistent Selection Strategy

- No prefetching of other pages.

- No storing full row objects.

- Only selected row IDs are stored.

- When navigating back to a page, selection is restored by matching row IDs.

- This ensures compliance with assignment rules and prevents memory or performance issues.

---

## 🛠️ Installation & Setup

```
npm install
npm run dev
```

## 📤 Deployment
- Netlify 

## ✅ Assignment Compliance

Vite used for project setup

- TypeScript implemented

- PrimeReact DataTable used

- Server-side pagination implemented

- Persistent row selection implemented

- No mass data storage

- No multi-page prefetching

---

## ⭐ Feedback & Contributions
- If you have suggestions or want to help improve the project
- feel free to open an issue or submit a pull request!

---
## 👤 Author
- Vansh
