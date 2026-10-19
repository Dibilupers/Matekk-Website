# Push Change Log

Tracking begins 2026-10-17.

## 2026-10-19 — `main`

Merged `emman` as `5839b45`, including:

- `2ca9c8d` — Added the FortiOS learning dashboard, gradebook support, and FortiOS exam routes and formats.
- `b5c274e` — Scoped the FortiOS question-bank request to the `Fortinet FortiOS` module.
- `5839b45` — Merged the FortiOS program and exam updates into `main`.

Also added the shared Program Overview, Learning Focus, course-outline navigation, and certification badge cards to CCNA, CCNA Automation, CCNA Cybersecurity, and FortiOS.

Validation before push: targeted ESLint, frontend production build, and Git whitespace checks passed.

## 2026-10-19 — `main` (follow-up sync)

- `36da77c` — Marked the FortiOS merge entry as pushed.
- `44b4772` — Merged the latest `origin/main` updates into local `main`, including the CCNA offline exam changes, without conflicts.

Validation before push: frontend production build and Git whitespace checks passed. Targeted ESLint passed for FortiOS and dashboard files; the newly synced upstream `ccnaAllQuestionsExam.jsx` reports an unused `skippedCount` variable.

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

## 2026-10-19 — `Noah` (pending push)

- Added the supplied exhibit for CCNA question 1306 and converted its broadcast-address choices into numbered answer slots.
- Added the confirmed answer key A to CCNA question 720 so it is included in the usable bank.
- Corrected CCNA question 181 to use numbered matching instead of multi-select, and added its supplied image as an exhibit. Added question 608's image and numbered answer slots.
- Added the recovered image for CCNA question 382 and converted it into a gradable Ansible feature-matching question.
- Rebuilt CCNA question 481 as a native router topology followed by its prompt and a numbered static-route matching question.
- Added a reminder on the login verification screen to check the spam or junk folder if the code email is missing.
- Scoped all-question and regular question-bank requests to the selected course module, separating CCNA questions from CompTIA and other course banks.
- Included the separately labeled `CCNA 200-301 Set …` rows in the CCNA question bank so legacy CCNA questions aren't excluded by the course filter.
- Removed the skipped-question count warning from the student-facing CCNA all-questions exam; unsupported rows remain excluded from scoring and display.
- Converted 150 valid CCNA "Choose two/three" rows with stored multi-letter answer keys into graded multi-select questions.
- Converted CCNA Part 9, question 70 (database ID 289) from flattened QoS term definitions into the existing drag-and-drop matching interaction. The configured database contains 1,367 CCNA rows, and the current loader returns all 1,367 as usable.
