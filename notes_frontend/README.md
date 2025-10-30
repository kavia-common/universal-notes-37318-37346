# Notes Frontend (Angular)

A responsive Angular UI for creating, viewing, editing, and deleting notes. Styled with the Ocean Professional theme.

## Quick Start

- Install dependencies:
  npm install

- Start dev server (the preview runs on port 3000 automatically):
  npm start
  Then open http://localhost:3000

## Routes

- /              Notes list with search/filter
- /notes/new     Create a note
- /notes/:id     Edit an existing note

## Theme

Ocean Professional:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

The app uses a card-based layout with a sidebar and a main panel.

## Environment Variables

The app reads API base URL from:
- NG_APP_API_BASE (preferred)
- NG_APP_BACKEND_URL (fallback)

If neither is set, the app uses an in-memory mock service and logs a TODO in the console.

Optionally supported:
- NG_APP_FRONTEND_URL
- NG_APP_NODE_ENV
- NG_APP_ENABLE_SOURCE_MAPS
- NG_APP_PORT (preview uses 3000; angular.json already configured)

Set these via your environment before building/serving. For local development, you can export them in your shell:
export NG_APP_API_BASE="https://your-backend.example.com"

## Switching to Real API

- Ensure NG_APP_API_BASE (or NG_APP_BACKEND_URL) points to your backend (expected endpoints: GET /notes, GET /notes/:id, POST /notes, PUT /notes/:id, DELETE /notes/:id).
- The NotesService automatically uses the real API when a base URL is present.
- Remove or ignore the in-memory mock when backend is ready.

## Components

- SidebarComponent: Navigation
- HeaderComponent: Page header with search and new-note action
- NotesListComponent: Displays notes grid with search and delete
- NoteEditorComponent: Create/edit form with validation

## Services

- NotesService: CRUD operations; selects API or mock based on env vars
- NotesMockService: In-memory CRUD with sessionStorage persistence
- ToastService: Lightweight notifications

## Build

- Production build:
  npm run build

Artifacts are output to dist/angular.

## Testing

- Unit tests:
  npm test

## Notes

- The dev server is configured to listen on port 3000 for compatibility with the preview environment.
- SSR files exist but are not required for local development.
