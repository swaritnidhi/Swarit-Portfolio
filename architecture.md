# Architecture Document

## 1. Overview

The portfolio is built using Next.js App Router and TypeScript.

The architecture prioritizes maintainability, reusable components, performance, and a clear separation between interface, application logic, and configuration.

## 2. Technology Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| UI Library | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | Next.js App Router |
| Form Handling | Formspree |
| Source Control | Git / GitHub |
| Hosting | Vercel |

## 3. Application Structure

```text
swarit-portfolio/
├── app/
│   ├── api/
│   │   └── preview-auth/
│   │       └── route.ts
│   ├── maintenance/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── public/
│   └── static assets
├── proxy.ts
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
├── prd.md
├── architecture.md
├── rules.md
├── design.md
├── tasks.md
└── memory.md
```

Note: The exact application structure may evolve during development.

## 4. Routing

### Main Portfolio

- `/` — Main portfolio page

### Maintenance

- `/maintenance` — Temporary maintenance interface

### Preview Authentication

- `/api/preview-auth` — Private preview authentication endpoint

## 5. Component Architecture

The interface should be organized into reusable components as the project grows.

Potential component organization:

- Navigation
- Hero
- About
- Projects
- Skills
- Contact
- Footer
- Theme toggle

Each component should have a clear responsibility.

## 6. Styling Architecture

- Tailwind CSS handles utility-based styling.
- Global styles are defined in `app/globals.css`.
- Shared design patterns should remain consistent.
- Dark and light themes should use a coherent design system.
- Responsive layouts should support mobile, tablet, and desktop.

## 7. State Management

Use React state for local interactions.

Examples:

- Theme selection
- Mobile navigation
- Contact form status
- Interactive UI elements

Avoid introducing a global state library unless the application genuinely requires it.

## 8. Contact Form Flow

1. Visitor enters contact information.
2. Client-side form handler prevents the default submission.
3. Form data is sent to Formspree.
4. Submission status is processed.
5. Success or error feedback is displayed.
6. Successful submissions reset the form.

## 9. Private Preview Flow

When maintenance mode is enabled:

1. Visitor requests the portfolio.
2. `proxy.ts` checks maintenance configuration.
3. Visitors without a valid preview cookie are redirected to `/maintenance`.
4. The maintenance page provides password authentication.
5. The authentication API validates the password.
6. A signed preview cookie is issued.
7. Authorized visitors can access the portfolio.

Maintenance mode is controlled using environment variables.

## 10. Deployment Architecture

### Development

- Local Next.js development server
- Local environment variables
- Local testing and debugging

### Production

- GitHub repository stores source code.
- Vercel builds and deploys the application.
- Production environment variables are configured in Vercel.
- GitHub pushes trigger deployments.

## 11. Security Architecture

- Private credentials are stored in environment variables.
- Authentication credentials remain server-side.
- Preview access uses an HTTP-only cookie.
- Production cookies use secure settings.
- Sensitive configuration must not be committed to GitHub.

## 12. Architecture Principles

- Prefer simple solutions.
- Reuse components.
- Keep responsibilities clear.
- Minimize unnecessary dependencies.
- Optimize for maintainability.
- Protect user data.
- Keep the application performant.
