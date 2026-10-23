# Push Change Log

Tracking begins 2026-10-17.

## 2026-10-17 — `main`

Pushed merge commit `7a82e8e` (`Merge origin/main into main`), including merge commit `851d5d5` (`Merge jhonard into main`) and branch commits `31c0189` and `f012548`.

Changes included in the push:

- Expanded CCNA Automation study content and curriculum for objectives 2.1–7.9, with dedicated lessons covering APIs, Cisco platforms, application deployment and security, infrastructure automation, and network fundamentals.
- Added offline module access using a 4–6 digit PIN, including admin-only online provisioning, backend validation/configuration, offline route gating, and setup documentation.
- Added Packet Tracer lab downloads and updated the Practice Lab download flow for context files and Packet Tracer files.
- Updated shared program and CCNA exam interfaces, module study-content rendering, gradebook handling, and related quiz/progress behavior.
- Integrated the remote `origin/main` commit `e76d544` (`bug fixed`) before pushing, preserving its CompTIA Network+ and Security+ exam updates.

Validation before push: frontend production build, server build, 19 focused server tests, targeted ESLint, and Git whitespace checks passed.

## 2026-10-17 — `main`

- Merged `a92cb7f` as `b107654` (`Merge changelog instructions into main`), adding the repository Copilot push-log instructions and the initial changelog.
- Added repository Copilot instructions requiring a dated changelog entry before assistant-prepared pushes.
- Added the `changelog/` folder and initialized this push log.

Documentation-only changes; no build or test run was needed.

## 2026-10-23 — FortiOS offline exam (uncommitted)

- Added a FortiOS offline exam route and offline entry with a bundled bank of 90 questions, including matching questions and exhibit references.
- Added a FortiOS-only exhibit URL loader and service-worker image cache flow. When online, the exam requests signed exhibit URLs from the existing `GET /questions/bank` endpoint, then caches the images for offline use.
- Updated frontend routing and offline access gating for the FortiOS exam. Existing CCNA source files and CCNA-specific image caching behavior were not changed.
- No backend code, schema, or API behavior was changed; the existing question-bank endpoint is consumed as-is.

Validation: targeted ESLint, production build, and `git diff --check` passed. Browser validation against the deployed API and offline image loading remains pending. These changes are not committed or pushed.
