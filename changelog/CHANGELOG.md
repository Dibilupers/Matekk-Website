# Push Change Log

Tracking begins 2026-10-17.

## 2026-11-20 - main

Commits included in this push:

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
