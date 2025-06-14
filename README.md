# Nexus-Setu

**Nexus-Setu** is an AI-powered infrastructure coordination platform designed to help government and public organizations visualize, schedule, and optimize infrastructure projects.

## Features

- Interactive map for visualizing infrastructure projects
- Project creation and management workflow
- AI-powered conflict detection and scheduling suggestions
- Modern and responsive UI with React and TailwindCSS

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Lucide-React, React Router DOM, TypeScript
- **Build Tools:** Vite, ESLint
- **AI Integration:** (Planned) Bolt AI APIs / OpenAI

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Di49v/nexus-setu.git
cd nexus-setu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Lint the codebase

## Project Structure

```
nexus-setu/
├── .bolt/                  # Bolt configuration and deployment files
├── src/                    # Main application source code
│   ├── assets/             # Images and static resources
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-based page components
│   ├── App.tsx             # Main app component with routes/layout
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles (TailwindCSS)
├── index.html              # HTML entry point
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── eslint.config.js        # ESLint configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app configuration
├── tsconfig.node.json      # TypeScript node configuration
├── vite.config.ts          # Vite build tool configuration
├── .gitignore
└── README.md               # This file
```

[See the full file list here.](https://github.com/Di49v/nexus-setu/tree/main/)

## Deployment

- Built for deployment on [Bolt.new](https://bolt.new/), Vercel, or Netlify.
- [Optional] Add your custom domain after deployment.

## Demo

- [Add your YouTube/Vimeo demo video link here]

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## Team

- Di49v [Divleen Kaur](https://github.com/Di49v/)
- Gurnadarkaur471 [Gurnadar Kaur](https://github.com/Gurnadarkaur471/)

## License

[MIT](LICENSE)
