# Sanket (संकेत)

Sanket is a React and TypeScript well-operations intelligence prototype built with Vite. This README describes its codebase and local development workflow.

## Development stack

- **React** and **React DOM** for the application UI
- **TypeScript** for application code and data types
- **Vite** for the development server and production build
- **Tailwind CSS** and `src/styles.css` for styling
- **Recharts** for charts
- **Lucide React** for icons

Dependency versions and npm scripts are defined in `package.json`.

## Source layout

```text
src/
├── main.tsx                   # Creates the React root and loads global styles
├── App.tsx                    # App shell, page navigation, session state, and shared screens
├── styles.css                 # Tailwind directives, design tokens, and component styles
├── data/
│   └── mockData.ts            # Seed data used by the local prototype
├── pages/
│   ├── OperationsMap.tsx      # Map interactions and add-well form
│   ├── ProgressiveViews.tsx   # Overview and subsurface views
│   └── WellDetail.tsx         # Well summary and expandable details
├── services/
│   └── mockServices.ts        # Mock service functions and well-record creation
└── types/
    └── index.ts               # Shared TypeScript data models
```

The app shell owns shared state and navigation. The Overview map provides one viewport with switchable Surface and 2.5D views. It shares well selection, search, status/event filters, relevance, and formation/event layers with the Operations map; pan and zoom remain local to each canvas. Offset wells and evidence are reached from the active-well workflow. The sidebar groups search and document ingestion under Knowledge & documents, with Review queue, Analytics & audit, and Settings available as direct navigation items. Mock data, service behavior, and shared types stay separate so the data layer can later be replaced without coupling it to the UI.

## Local development

Requirements: Node.js 20 or newer and npm.

Install dependencies and start Vite from the project directory:

```bash
npm install
npm run dev
```

Vite prints the local preview address after it starts. To check a production build and serve it locally:

```bash
npm run build
npm run preview
```

## Data and prototype limits

The interface uses simulated well, telemetry, report, alert, and analytics data with in-memory session state. Changes made through the interface are not persisted after the session. This project is not connected to OIL systems or a production API, and its map coordinates and subsurface geometry are illustrative.