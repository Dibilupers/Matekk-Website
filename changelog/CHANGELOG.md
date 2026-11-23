# Push Change Log

Tracking begins 2026-10-17.

## 2026-11-23 - main

Commits included in this push:

- `6a8abae1` - Resolve CCNA exhibit mappings by prompt when live database IDs
  differ, restore five source-matched image exhibits, and clarify Q24's
  alternate-route details.

Validation before push: 48 CCNA composite tests, 151 CCNA bank-converter tests,
and `git diff --check` passed.

## 2026-11-23 - main

Commits included in this push:

- `89e4bd8` - Restore question 624's partially reconstructed OSPF terminal in
  the legacy and database-backed banks, strip its unsupported exhibit lead-in,
  and preserve its options and answer.

Validation before push: all 150 `ccnaBankConverter.test.js` tests, targeted
ESLint, `npm run build`, and `git diff --check` passed.

## 2026-11-23 - main

Commits included in this push:

- `beff369` - Remove the unsupported exhibit lead-ins from self-contained CCNA
  questions 702 and 809 in the database-backed bank, and restore question
  1148's recreated terminal in the legacy/offline bank.

Validation before push: focused CCNA suites, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-23 - main

Commits included in this push:

- Pending commit - Added a React render error boundary and replaced the empty
  unknown-route page with a responsive 404 screen, preventing routing and
  hydration failures from leaving users on a blank view.

Validation before push: production build passed; targeted changes verify the
application root and unknown-route fallback.

## 2026-11-22 - main

Commits included in this push:

- `37d9cfa` - Restored the original matching question type for all 13 legacy
  questions marked with unused options or values, removed the drag-and-drop
  progression override, and bumped the offline question cache to v6.

Validation before push: 192 focused CCNA tests, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `680ce50` - Let grouped drag-and-drop questions advance once each category
  has an assignment, while retaining original unused-option wording and
  grading incomplete mappings as incorrect.

Validation before push: 193 focused CCNA tests, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `83e191c` - Prefer bundled exhibit images over stale database URLs for mapped
  CCNA exhibit questions and bump the offline question-bank cache to v5.

Validation before push: 147 focused CCNA tests, targeted ESLint, and
`npm run build` passed. The build emitted a non-fatal chunk-size warning.

## 2026-11-22 - main

Commits included in this push:

- `2aa65bc` - Converted 13 legacy matching questions that mark unused options,
  values, commands, or answers into drag-and-drop while preserving their
  answer mappings and offline behavior.

Validation before push: 192 focused CCNA tests, `npm run build`, and
`git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `3d93d79` - Initially changed repeated-answer dropdowns to drag-and-drop.
- `b39487c` - Reverted that interaction change; repeated-answer questions use
  the existing numbered input mode.
- `2ddc245` - Expanded legacy 39's two-switch configuration exhibit to fill its
  display box.
- `6b65e71` - Removed a redundant offline interaction override.

Validation before push: 190 focused CCNA tests, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `d98e525` - Fixed the DC-1/HQ-1 Question 299 live and offline drag-and-drop
  rendering and bumped the offline CCNA bank cache so stale dropdown data is
  refreshed.

Validation before push: 189 focused CCNA tests, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `3888ec1` - Reverted the overbroad drag-and-drop normalization changelog.
- `e498434` - Reverted the overbroad conversion of prompts containing drag
  instructions. Numbered and instruction-only matching questions remain unchanged.
- `a30e235` - Preserved the image-based DC-1/HQ-1 Question 299 as drag-and-drop
  across live and offline banks.

Validation before push: 189 focused CCNA tests, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `27dbd44` - Fixed legacy 617's drag-and-drop interaction, removed duplicated
  text from five mapped exhibits, and changed the SW11 VLAN exhibit canvas to
  white.

Validation before push: 43 CCNA exhibit tests, 146 bank-converter tests,
targeted ESLint, `npm run build`, and `git diff --check` passed.

## 2026-11-22 - main

Commits included in this push:

- `5568021` - Completed the CCNA CLI terminal-exhibit audit across the
  All Questions and offline paths, corrected legacy 909/816/1159 handling,
  redrew legacy 50/59, and preserved answer data.

Validation before push: 187 focused CCNA tests, targeted ESLint,
`git diff --check`, and the production build passed. The build emitted
non-fatal chunk warnings.

## 2026-11-22 - main

Commits included in this push:

- `6bd8d62` - Completed the CCNA exhibit corrections, including matching
  exhibits and offline bank rendering/grading fixes.

Validation before push: 196 CCNA tests, `npm run build`, and the production
offline-cache check passed (789/789 image assets cached; 20 CCNA exhibit
images rendered with network access disabled). The authenticated exam route
could not be verified because the test browser had no valid session.

## 2026-11-21 - main

Commits included in this push:

- `c7fd1d2` - Prewarm the complete CCNA question bank when users open the
  CCNA page while online, so database-backed offline exams are prepared
  without requiring the All Questions exam to be opened first.

Validation before push: targeted ESLint and production build passed.

## 2026-11-21 - main

Commits included in this push:

- `aed7bc7` - Merged the completed Noah CCNA exhibit rollout into main.
- `b675698` - Fixed stale offline cached-bank and saved-session exhibits.
- `fa76c09` - Completed and aligned the refer-to-exhibit audit fixes.
- `7f84f2d` - Aligned Noah's exhibit subsystem with main and added cache
  invalidation for offline CCNA exams.
- `6e9c729` - Clarified the remaining partial exhibit/source conflicts.

Validation before push: 139 CCNA bank-converter tests, 37 shared exhibit
tests, targeted ESLint, production build, and `git diff --check` passed.

## 2026-11-21 - main

Commits included in this push:

- `c594b56` - Completed the CCNA refer-to-exhibit audit fixes across the
  offline, live/legacy, and shared exam paths. Hid mismatched raw exhibits,
  added source-backed and clearly labeled partial redraws, and added focused
  375-item bank consistency regressions.

Validation before push: 137 CCNA bank-converter tests, 37 shared exhibit
tests, targeted ESLint, production build, and `git diff --check` passed.

## 2026-11-21 - main

Commits included in this push:

- `a64fd79` - Removed the Refer-to-Exhibit offline exam card and its
  availability note from the CCNA exam selector; the audit route remains
  development-only.

Validation before push: targeted ESLint, `npm run build`, and
`git diff --check` passed. Verified the production bundle contains no
Refer-to-Exhibit card or offline-availability message.

## 2026-11-21 - main

Commits included in this push:

- `74d1156` - Completed the CCNA exhibit redraw audit, added source-backed
  topology and terminal corrections with regression tests, and redrew the
  R14–R86 PC10 host-route exhibit from the supplied screenshot. Kept the
  audit-only exam route development-gated.

Validation before push: 136 focused CCNA tests, targeted ESLint,
`npm run build`, and `git diff --check` passed.

## 2026-11-20 - main

Commits included in this push:

- `ce17cc8` - Hid the Refer-to-Exhibit card and route from production builds
  while keeping them available in development.

Validation before push: focused exam-route tests, targeted ESLint, production
build, and `git diff --check` passed. The production bundle contains neither
the offline-exhibit route nor its exam-card summary.

## 2026-11-20 - Noah

Commits included in this push:

- `9c59c37` - Bundled the supplied CCNA exhibit images and mapped them to the
  offline Refer-to-Exhibit question bank.
- `d45d827` - Recorded the rebased offline exhibit push.
- `7accf1a` - Added the Refer-to-Exhibit exam card and route to main.
- `398dbc4` - Kept the Refer-to-Exhibit exam offline-only on main.
- `c58277a` - Added corrected exhibit panels and legacy image mappings,
  redrew native exam exhibits, and aligned live and offline question data.
- `aa7c59c` - Merged the latest main exam rollout into Noah.

Validation before push: 83 focused CCNA tests, targeted ESLint, production
build, and `git diff --check` passed. ESLint disabled the existing
`react-refresh/only-export-components` rule for the CCNA question-bank module.

## 2026-11-20 - main

Commits included in this push:

- `c58277a` - Added corrected exhibit panels and legacy image mappings,
  redrew native exam exhibits, and aligned live and offline question data.
- `aa7c59c` - Merged the latest main exam rollout into Noah.

Validation before push: 83 focused CCNA tests, targeted ESLint, production
build, and `git diff --check` passed. ESLint disabled the existing
`react-refresh/only-export-components` rule for the CCNA question-bank module.

## 2026-11-20 - main

Commits included in this push:

- Restored Refer to Exhibit as an offline-only main-deployment exam; hidden when the app is online.

- Bundled Refer to Exhibit exam on public main deployments, including the CCNA exam card and route.

- `9c59c37` - Bundled the localhost/offline-only CCNA exhibit images and mapped them to the Refer-to-Exhibit question bank.

Validation before push: `npm run build` passed. Focused CCNA tests passed 47 of 48 checks; the remaining question 1321 PAT assertion is unrelated to the offline exhibit mapping.

## 2026-11-20 - main

Commits included in this push:

- `0d73e7b` - Simplified CCNA practice-lab cards to show titles and descriptions
  without difficulty, lab-number, or bonus badges, and removed the topology
  difficulty badge.

Validation before push: 17 practice-lab regression tests, targeted ESLint, and
the production build passed. Vite reported a large-bundle warning.

## 2026-11-20 - main

Commits included in this push:

- `967854a` - Added device-local autosave and restoration for CCNA practice
  labs and the topology sandbox, preserved separate worksheet and terminal
  attempts when switching views, and surfaced local-storage failures.

Validation before push: 21 practice-lab and storage tests, targeted ESLint,
production build, and browser checks for worksheet drafts, terminal state, and
sandbox topology surviving reloads passed. Vite reported a large-bundle warning.

## 2026-11-20 - main

Commits included in this push:

- `ad08531` - Featured Labs 6-11, kept the worksheet as the default, added
  draggable sandbox devices, and blocked unsupported same-device connections.

Validation before push: all 17 practice-lab tests, targeted ESLint, production
build, Packet Tracer build-guide setup and solution replay for all 11 labs
(featured Labs 6-11 first), and browser checks for lab ordering, grid layout,
and connection handling passed.

## 2026-11-20 - main

Commits included in this push:

- `436e69a` - Corrected CCNA practice-lab topology and setup guidance, improved
  Packet Tracer preconfiguration, and expanded topology and simulator regression coverage.
- `5db117d` - Added model-specific device recommendations, cable/interface
  mappings, Packet Tracer notes, and build-guide tests for all 11 labs.
- `15396e9` - Recorded the Packet Tracer build-guide changes in the changelog.
- `00c38ec` - Completed the lab audit and fixes, added matching-question report
  output, and expanded topology, worksheet, and solution regression tests.
- `8dcc9c0` - Integrated the latest main while preserving CCNA exam and
  offline-exhibit changes.

Validation before push: 17 practice-lab tests, CCNA classifier tests, targeted
ESLint, production build, and Git whitespace checks passed.

## 2026-11-20 - fix/ccna-recreate-exhibit-images

Commits included in this push:

- `5db117d` - Improved the Packet Tracer build steps for all 11 CCNA practice
  labs with model-specific device recommendations, cable and interface
  mappings, Lab 11 router-ID corrections, and focused build-guide regression
  coverage.

Validation before push: 15 focused practice-lab tests, production build, and
Git whitespace checks passed.

## 2026-11-16 - main

Commits included in this push:

- `5cf2c9c` - Corrected CCNA practice-lab topology and verification instructions,
  added missing VLAN setup, and removed nonexistent default gateways from the
  Packet Tracer setup guide.

Validation before push: 14 practice-lab tests, targeted ESLint, production
build, and Git whitespace checks passed. Vite reported its large-chunk advisory.
