# Push Change Log

Tracking begins 2026-10-17.

## 2026-10-24 — `main`

Commits included in this push:

- `9c20772` — Randomized questions in All Questions Exams and improved shared exam topology/image exhibits with clearer labels, spacing, and framing.
- `2448a9f` — Added the changelog entry for this push.
- `f04b84d` — Merged the latest `main` changes before publishing.

Validation before push: targeted ESLint on the exam changes, frontend production build, focused all-question shuffle check, and Git whitespace checks passed. A broader ESLint run also reports an existing unused `shuffle` helper and hook-dependency warning in `FortiOSOfflineExam.jsx`; these are unrelated to the exam exhibit changes.

## 2026-10-24 — `main`

Commits included in this push:

- `35b68e3` — Removed the exact `module=CCNA` bank request filter so the all-questions exam can load CCNA submodule questions from backend deployments that only support exact module matching.

Validation before push: frontend production build, targeted ESLint, and Git whitespace checks passed. No production API endpoint was called.

## 2026-10-24 — `main`

Commits included in this push:

- `dc9a609` — Scoped the all-questions request and backend bank query to CCNA modules, retained images on multi-answer questions, and removed the skipped-question warning from the exam.

Validation before push: 37 focused question-service tests, backend build, frontend production build, frontend ESLint, and Git whitespace checks passed. No production API endpoint was called.

## 2026-10-23 — `main`

Commits included in this push:

- `dfad973` — Reverted the raw-row CCNA frontend conversion, restoring the existing all-usable question-bank behavior (1,211 CCNA questions). No API or backend changes.

Validation before push: authenticated production check confirmed the existing all-usable route returns 1,211 CCNA questions; targeted CCNA module tests and ESLint passed.

## 2026-10-23 — `main`

Commits included in this push:

- `800c22f` — Normalize CCNA database choices stored as records with IDs and text, and resolve correct answers by choice ID.
- `71c42fb` — Restore the frontend all-questions bank loading path and retain usable CCNA rows, including questions with unavailable exhibits. No API or backend changes.

Validation before push: 14 focused CCNA conversion/module tests, frontend production build, targeted ESLint, and CRLF-aware Git whitespace checks passed. Production question-count verification remains pending.

## 2026-10-23 — `main`

- `4a56bf4` — Reverted the frontend CCNA all-questions conversion after production returned only 6 questions and reported 1,361 skipped. Restored the previous all-usable question-bank path; no API or backend changes.

Validation before push: frontend production build, targeted ESLint, and Git whitespace checks passed.

## 2026-10-23 — `main`

Commits included in this push:

- `fb9edf0` — Load all usable CCNA questions from the existing unfiltered question-bank endpoint, convert and filter them in the frontend, and retain questions that reference unavailable exhibits. No API or backend changes.

Validation before push: 12 focused CCNA conversion/module tests, frontend production build, targeted ESLint, and Git whitespace checks passed.

## 2026-10-23 — `main`

Commits included in this push:

- `0c1c976` — Added a separate FortiOS offline exam route with a bundled 90-question bank and a FortiOS-specific signed-image cache flow. No backend code or CCNA source files were changed by this commit.
- `74dbb3f` — Merged the latest `origin/main` into `jhonard` before integrating the FortiOS offline route.

Validation before push: frontend production build, targeted ESLint for the changed route/cache files, and Git whitespace checks passed. Browser validation against the deployed API and offline image loading remains pending.

## 2026-10-23 — `main`

- `74ff021` — Restricted FortiOS multiple-select parsing to FortiOS-filtered bank requests so other course banks remain unchanged.

Validation before push: 36 targeted question-service tests, backend build, targeted Oxlint, and Git whitespace checks passed.

## 2026-10-23 — `main`

Commits included in this push:

- `2a1b948` — Added more Fortinet FortiOS exam questions.
- `7e9c697` — Merged the latest remote `main` changes into `emman`.
- `a2baf4e` — Fixed FortiOS question formats and the exam timer.
- `a952276` — Merged the exam UI updates into `main`, keeping the backend unchanged in the merge.
- `8439b41` — Added FortiOS choice-ID parsing, multiple-select/order support, and course-specific question-bank filtering while preserving CCNA grading.

Validation before push: 36 targeted question-service tests, backend build, targeted Oxlint, frontend production build, targeted ESLint, and Git whitespace checks passed.

## 2026-10-23 — `main`

- `cec88b2` — Restored graded CCNA multi-answer questions and special question formats, including drag-and-drop questions 289, 382, 481, 608, and 1306, plus the confirmed answer for 720. Only backend conversion/grading changed; endpoint wiring, API client, proxy, routing, and course filtering were left unchanged. The remaining 25 image exhibits are not included.

Validation before push: 14 targeted question-service tests, backend build, frontend production build, targeted ESLint/Oxlint, and Git whitespace checks passed. The full service spec still has one pre-existing failure: a module-filter test expects an argument not accepted by the current endpoint method.

## 2026-10-23 — `main`

Commits included in this push:

- `9b41ea5` — Filtered the all-questions exam to CCNA modules only without changing the live API path.
- `59f31e0` — Documented the CCNA filter push to `Noah`.
- `18cb9c1` — Merged the reviewed CCNA filter changes from `Noah` into the latest `main`.
- `79fc536` — Preserved the existing skipped-question count notice in the CCNA all-questions exam.

Validation before push: 9 targeted filter tests, ESLint on changed files, frontend production build, and Git whitespace checks passed.

## 2026-10-23 — `Noah`

- `9b41ea5` — Filtered the all-questions exam to CCNA modules only without changing the live API path.

Validation before push: 9 targeted filter tests, ESLint on changed files, frontend production build, and Git whitespace checks passed.

## 2026-10-19 — `main`

- Reverted commit `9888be7` (`Filter all-question banks by course`) at the user's request.

## 2026-10-19 — `main`

- Reverted commit `6366191` (`Fix CCNA question-bank filtering`) at the user's request.

## 2026-10-19 — `main`

Merged `emman` into the latest `main` as `99d8b21`, including:

- `96da371` — Added a Fortinet → FortiOS shortcut to the My Gradebook program chooser.
- `99d8b21` — Merged the FortiOS gradebook shortcut into `main`.

Validation before push: targeted ESLint, frontend production build, and Git whitespace checks passed.

## 2026-10-19 — Backend deployment compatibility

- Load Helmet through Node's CommonJS bridge with its declared middleware type to avoid Vercel's incorrect default-import typing.

Validation: backend TypeScript check, NestJS build, and Git whitespace checks passed locally.

## 2026-10-19 — `main`

Merged `emman` into `main` as `3cf8955`, including:

- `22b044f` — Updated CompTIA mobile layouts and FortiOS dashboards, exam formats, timeout notices, and gradebook handling.
- `3cf8955` — Merged the `emman` branch into the latest `origin/main`.

Validation before push: targeted ESLint, frontend production build, and Git whitespace checks passed.

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
- Added a confirmation step and a fresh-start retry option to the completed CCNA all-questions exam.

## 2026-10-19 — `main`

- Reverted the changes introduced by merge commit `1701c01` while preserving other mainline commits and subsequent independent changes. Retained four CCNA images required by the later offline exam bank.
