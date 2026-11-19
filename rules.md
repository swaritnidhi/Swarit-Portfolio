# Development Rules

## 1. General Principles

- Preserve existing working functionality.
- Prefer clean, maintainable solutions.
- Avoid unnecessary complexity.
- Do not introduce features without a clear purpose.
- Keep the website lightweight and performant.
- Follow the project's established design direction.

## 2. Before Making Changes

Before modifying code:

1. Understand the existing implementation.
2. Identify affected components and files.
3. Check for dependencies on existing functionality.
4. Consider responsive behavior and accessibility.
5. Explain significant changes before implementing them.

## 3. Code Quality

- Use TypeScript for application code.
- Prefer clear and descriptive names.
- Keep components focused on one responsibility.
- Avoid unnecessary duplication.
- Use reusable components where appropriate.
- Avoid excessive comments and unnecessary abstractions.
- Handle errors gracefully.

## 4. React and Next.js Rules

- Follow Next.js App Router conventions.
- Use Server Components by default.
- Add `"use client"` only when client-side functionality is required.
- Use React hooks correctly.
- Avoid unnecessary client-side JavaScript.
- Keep routing consistent with the existing project.
- Follow the conventions of the installed Next.js version.

## 5. Styling Rules

- Use Tailwind CSS consistently.
- Maintain the existing visual identity.
- Avoid random colors and inconsistent spacing.
- Keep dark and light modes functional.
- Use responsive design practices.
- Prefer subtle, purposeful animations.
- Avoid excessive glass effects or visual clutter.

## 6. Design Rules

- Maintain a futuristic, minimalist, professional aesthetic.
- Prioritize readability and usability.
- Use visual hierarchy intentionally.
- Keep interactions intuitive.
- Avoid generic template-like designs.
- Do not sacrifice accessibility for aesthetics.

## 7. Performance Rules

- Avoid unnecessary dependencies.
- Optimize images and other assets.
- Avoid heavy animations when lightweight alternatives work.
- Prevent unnecessary component re-renders.
- Keep bundle size reasonable.
- Test performance after major changes.

## 8. Security Rules

- Never expose private credentials.
- Never commit `.env.local`.
- Keep secrets server-side.
- Validate user input.
- Do not weaken authentication protections.
- Do not expose private preview credentials to client components.

## 9. Modification Rules

- Do not replace entire files unnecessarily.
- Preserve existing sections and functionality unless explicitly requested.
- Avoid unrelated changes.
- Explain any important architectural modifications.
- Verify imports and file paths.
- Ensure changes are compatible with the current project.

## 10. Testing Rules

After meaningful changes:

- Run `npm run build`.
- Check for TypeScript errors.
- Test the affected interface.
- Test responsive layouts.
- Verify existing functionality.
- Check both dark and light themes when applicable.

## 11. Documentation Rules

- Update `tasks.md` when work is completed or priorities change.
- Update `architecture.md` when architecture changes.
- Update `design.md` when design decisions change.
- Update `memory.md` with important decisions and project context.
- Keep documentation consistent with the actual codebase.

## 12. AI Assistant Rules

When working on this project, an AI assistant must:

1. Read relevant documentation before making changes.
2. Respect the existing project structure.
3. Avoid inventing project features or personal information.
4. Provide complete files when requested.
5. Explain terminal commands clearly.
6. Guide the developer step by step.
7. Preserve working features.
8. Ask before making major architectural changes.
9. Identify potential risks before destructive operations.
10. Verify changes whenever possible.

## 13. Final Quality Standard

Every change should improve at least one of the following:

- Functionality
- Usability
- Visual quality
- Accessibility
- Performance
- Maintainability
- Security

The project should remain professional, distinctive, lightweight, and reliable.
