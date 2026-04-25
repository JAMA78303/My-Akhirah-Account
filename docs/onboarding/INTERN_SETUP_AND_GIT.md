# Intern Setup, Git, and PR Workflow

This guide is the exact path a new team member should follow on a fresh computer.

## 1) Install Required Tools

Install these first:

- Git (required for version control)
- GitHub account access (required for forks and PRs)
- Bun (project package manager)
- Node.js LTS (recommended because some tooling depends on Node)
- VS Code or Cursor (recommended editor)

Check installations in a terminal:

```bash
git --version
node --version
bun --version
```

If any command fails, install that tool before continuing.

## 2) Fork and Clone the Repository

1. Open the main repository on GitHub.
2. Click **Fork** and create your own copy under your account.
3. Clone your fork to your computer:

```bash
git clone https://github.com/<your-username>/My-Akhirah-Account.git
cd My-Akhirah-Account
```

4. Add the original repository as `upstream` so you can pull latest changes:

```bash
git remote add upstream https://github.com/<main-org-or-owner>/My-Akhirah-Account.git
git remote -v
```

You should see:

- `origin` -> your fork
- `upstream` -> main team repository

## 3) Install Dependencies and Run Locally

```bash
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 4) Configure Environment Variables

Create `.env.local` using credentials provided by Mikhail/team manager.

Important:

- Never commit `.env.local` or real secrets.
- Use sandbox/test payment credentials unless explicitly approved for production testing.

## 5) Create a Branch Before Writing Code

Never work directly on `main`.

```bash
git checkout -b feature/short-description
```

Examples:

- `feature/campaign-filters`
- `fix/faq-mobile-spacing`
- `chore/update-about-copy`

## 6) Daily Git Workflow (Safe Beginner Flow)

Before starting your task each day:

```bash
git checkout main
git fetch upstream
git pull upstream main
git push origin main
git checkout <your-branch>
git rebase main
```

Then do your work and commit in small steps:

```bash
git add .
git commit -m "Add campaign filter chips to campaigns page"
git push origin <your-branch>
```

If `rebase` feels confusing, ask for help before forcing anything.

## 7) Pull Request Workflow

1. Push your branch to your fork.
2. Open GitHub and create a PR from your branch to the main repository `main`.
3. Assign Mikhail as reviewer.
4. Keep the PR focused on one feature or one bug.

Use this PR description template:

```md
## What changed
- ...

## Why
- ...

## How to test
- ...

## Screenshots (if UI change)
- ...
```

## 8) Git and PR Best Practices

- Pull latest `main` before starting new work.
- Commit small, meaningful changes instead of one huge commit.
- Write clear commit messages (`Add`, `Fix`, `Refactor`, `Docs`).
- Do not mix unrelated changes in one PR.
- Run checks before opening a PR:

```bash
bun run lint
bun run build
```

- Resolve review comments by pushing new commits (do not delete history).
- Ask for review early if your change touches shared components or data flow.
- Never push directly to `main`.
- Never commit secrets, keys, `.env.local`, or credentials.

## 9) Common Mistakes to Avoid

- Working on `main` instead of a feature branch
- Forgetting to sync latest `main` before coding
- Opening very large PRs that are hard to review
- Editing generated files in `convex/_generated/`
- Changing payment/auth/Convex/security logic without Mikhail review

## 10) When to Ask for Help Immediately

Ask Mikhail immediately if:

- You hit merge conflicts you do not understand
- Your branch diverges heavily from `main`
- You are unsure about payment, Clerk, Convex, admin permissions, or donor data handling
- You think you may have exposed a secret accidentally
