# Campus Canteen Admin Dashboard

A professional, fully responsive Admin Dashboard for a College Canteen Management System. Built with React 19, Vite, TypeScript, Tailwind CSS, and TanStack Router.

## Features

- **Dashboard Overview** — Real-time KPI cards (today's orders, revenue, pending orders, best-selling item) with trend indicators
- **Order Management** — Full orders table with search, filtering, status badges, and a detail modal for inspection
- **Revenue Analytics** — Interactive charts showing revenue trends and order volume over time (powered by Recharts)
- **Menu Performance** — Top-selling items breakdown with category filters and sales metrics
- **Payments Overview** — Cash vs. UPI transaction breakdown with detailed payment history
- **Settings** — Canteen metadata management (hours, contact info) and appearance preferences
- **Light / Dark Theme** — Seamless theme toggle with CSS variable-based design tokens
- **Responsive Layout** — Collapsible sidebar for mobile, adaptive grid layouts, and touch-friendly UI

## Tech Stack

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| React 19              | UI library                       |
| Vite                  | Build tool & dev server          |
| TypeScript            | Static typing (strict mode)      |
| TanStack Router       | File-based routing               |
| TanStack Query        | Server-state & data fetching     |
| Tailwind CSS v4       | Utility-first styling            |
| shadcn/ui             | Accessible UI components         |
| Recharts              | Data visualization               |
| Lucide React          | Icon library                     |
| React Context API     | Theme & canteen state management |

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── analytics/        # Charts & analytics widgets
│   │   ├── common/           # Reusable UI (StatCard, SearchBar, StatusBadge, etc.)
│   │   ├── dashboard/        # Dashboard-specific widgets
│   │   ├── layout/           # AppLayout, Sidebar, Navbar
│   │   ├── orders/           # Orders table & detail modal
│   │   ├── payments/         # Payment table components
│   │   └── ui/               # shadcn/ui primitive components
│   ├── context/
│   │   ├── CanteenContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── menuPerformance.ts
│   │   ├── orders.ts
│   │   ├── payments.ts
│   │   └── revenue.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Orders.tsx
│   │   ├── Payments.tsx
│   │   ├── RevenueAnalytics.tsx
│   │   ├── MenuPerformance.tsx
│   │   └── Settings.tsx
│   ├── routes/               # TanStack file-based routes
│   │   ├── __root.tsx        # Root layout (providers + shell)
│   │   ├── index.tsx         # / (Dashboard)
│   │   ├── orders.tsx        # /orders
│   │   ├── payments.tsx      # /payments
│   │   ├── revenue.tsx       # /revenue
│   │   ├── menu.tsx          # /menu
│   │   └── settings.tsx      # /settings
│   ├── types/
│   │   └── index.ts          # Shared TypeScript interfaces
│   ├── utils/
│   │   └── format.ts         # Currency & date formatters
│   ├── styles.css            # Global styles & CSS variables
│   └── router.tsx            # Router configuration
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (or [Bun](https://bun.sh) 1.2+)
- A code editor such as [VS Code](https://code.visualstudio.com/)

### Installation

1. **Extract the project** (if you received a ZIP):
   ```bash
   unzip campus-canteen-admin.zip
   cd campus-canteen-admin
   ```

2. **Install dependencies** using **npm** (recommended if Bun is unavailable):
   ```bash
   npm install
   ```
   Or, if you have Bun installed:
   ```bash
   bun install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Or with Bun:
   ```bash
   bun run dev
   ```

4. **Open in browser** — navigate to the URL shown in the terminal (typically `http://localhost:8080`).

### Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

| Script           | Command           | Description                          |
| ---------------- | ----------------- | ------------------------------------ |
| `dev`            | `npm run dev`     | Start Vite dev server with HMR       |
| `build`          | `npm run build`   | Build optimized production bundle    |
| `build:dev`      | `npm run build:dev` | Build in development mode          |
| `preview`        | `npm run preview` | Preview production build locally     |
| `lint`           | `npm run lint`    | Run ESLint across the project        |
| `format`         | `npm run format`  | Auto-format code with Prettier       |

## Routes

| Path          | Page / Feature              |
| ------------- | --------------------------- |
| `/`           | Dashboard (home)            |
| `/orders`     | Order management table      |
| `/payments`   | Payment history & breakdown |
| `/revenue`    | Revenue analytics charts    |
| `/menu`       | Menu performance stats      |
| `/settings`   | App settings & preferences  |

## Theming

The app uses CSS custom properties for a fully customizable light/dark mode:

- **Primary color:** Emerald green (`#10B981`)
- **Background:** Light `#FFFFFF` / Dark `#0F172A`
- Toggle the theme via the sun/moon icon in the navbar.

All shadcn/ui components respect these tokens, ensuring consistent colors across every screen.

## Key Design Decisions

1. **File-based routing** — TanStack Router conventions keep routing co-located with page components. No manual route tables.
2. **Mock data** — All orders, payments, revenue, and menu stats are served from local static datasets. No backend is required.
3. **Context-based state** — Theme and canteen settings live in React Context to avoid prop drilling without adding Redux complexity.
4. **Strict TypeScript** — Every prop, state, and mock object is fully typed. The project compiles with `strict: true`.

## License

This project is intended for academic evaluation and demonstration purposes.
