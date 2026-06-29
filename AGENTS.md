# AGENTS.md

## Cursor Cloud specific instructions

### Repository status
As of this writing, the repository (`SAAS-LANDING`) is an empty placeholder: it contains
only `README.md` (a single `# SAAS-LANDING` heading) and no application code, package
manifests, lockfiles, source directories, build config, or services. There is nothing to
build, lint, test, or run yet.

### Environment / toolchain
The Cloud VM already provides the runtimes a future SaaS landing app is likely to need:
Node.js 22 (with `npm`, `pnpm`, `yarn`) and Python 3.12. No project-specific dependencies
exist to install.

### Update script (dependency refresh)
The configured update script is intentionally guarded so it is a safe no-op today and
auto-adapts once real scaffolding lands:
- If a JS manifest/lockfile appears (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`,
  or `package.json`), it installs JS dependencies with the matching package manager.
- If `requirements.txt` appears, it installs Python dependencies.

### When real code is added
Once an app is scaffolded (e.g. Next.js/Vite/React for a landing page), revisit this file:
document the dev server command (e.g. `npm run dev`), the lint/test/build commands, and any
non-obvious startup caveats so future agents can run the product end to end.
