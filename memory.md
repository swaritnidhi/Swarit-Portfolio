# Project Memory — Swarit Portfolio

## 1. Project Identity

- Project: Swarit Portfolio
- Type: Personal portfolio website
- Purpose: Showcase personal identity, skills, projects, and contact information
- Repository: https://github.com/swaritnidhi/Swarit-Portfolio
- Deployment: https://swarit-portfolio-nine.vercel.app/

## 2. Development Environment

- Operating System: Zorin OS
- Editor: Visual Studio Code
- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Package Manager: npm
- Hosting: Vercel
- Version Control: Git and GitHub

## 3. Project Structure

- `app/page.tsx` — Main portfolio page
- `app/layout.tsx` — Root layout
- `app/globals.css` — Global styles
- `app/maintenance/page.tsx` — Maintenance page
- `app/api/preview-auth/route.ts` — Preview authentication API
- `proxy.ts` — Maintenance mode and preview access control
- `.env.local` — Local environment variables
- `prd.md` — Product requirements
- `architecture.md` — Technical architecture
- `rules.md` — Development rules
- `design.md` — Design system
- `tasks.md` — Project tasks
- `memory.md` — Project memory

## 4. Important Project Decisions

- Preserve the existing portfolio implementation.
- Avoid unnecessary rewrites.
- Maintain both dark and light themes.
- Keep the design futuristic, minimalist, and professional.
- Use lightweight solutions where possible.
- Keep the website responsive.
- Protect private preview access with authentication.

## 5. Maintenance Mode

- Maintenance mode is controlled by `MAINTENANCE_MODE`.
- Preview access uses `PREVIEW_SECRET` and `PREVIEW_PASSWORD`.
- Secrets must never be committed to Git.
- Local and production environment variables are configured separately.
- Verify production behavior after deployment.

## 6. Development Workflow

1. Understand the requested change.
2. Review relevant documentation.
3. Inspect existing implementation.
4. Make focused changes.
5. Test locally.
6. Run the production build.
7. Commit changes.
8. Push to GitHub.
9. Verify Vercel deployment.

## 7. Current Project Status

- Portfolio implemented and deployed.
- GitHub integration established.
- Vercel deployment established.
- Contact form implemented.
- Maintenance mode implementation exists.
- Production maintenance deployment requires verification.
- Documentation is being completed.

## 8. Instructions for Future AI Assistants

- Read this document before making major changes.
- Read `rules.md` before modifying code.
- Read `architecture.md` before changing project structure.
- Read `design.md` before modifying visual design.
- Read `tasks.md` to understand current progress.
- Read `prd.md` to understand project goals.
- Preserve existing functionality.
- Provide complete replacement files when necessary.
- Explain commands step by step.
- Never expose or request private secrets unnecessarily.
- Avoid inventing completed features.

## 9. Updating Project Memory

- Update this document when architecture or important decisions change.
- Keep project status accurate.
- Record important technical discoveries.
- Remove outdated information.
- Keep documentation useful and concise.

