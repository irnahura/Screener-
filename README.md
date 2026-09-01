# RIOM

RIOM is a local-first desktop activity journal: it helps you remember what you
have seen on your computer. While recording is enabled, RIOM observes screen
changes, optionally extracts visible text, and turns that activity into a
searchable local timeline.

The central idea is simple: your computer already contains the context you
need, but that context is usually scattered across windows and lost as soon as
you move on. RIOM keeps a private, time-ordered record so you can revisit an
event, find text from something you saw, and understand what was happening at a
particular point in time.

## What it does

- Captures screen activity when you start recording and supports pausing or
  stopping capture.
- Processes captured activity into events and metadata.
- Extracts text through OCR and accessibility integrations when enabled and
  available on the platform.
- Stores captured data and the searchable index in a local SQLite database.
- Provides a desktop timeline, search, event detail views, onboarding, and
  recording/privacy controls.
- Keeps the MVP focused on local capture, text, metadata, storage, and search.

## How it works

```text
Screen changes
      │
      ▼
Capture + optional OCR/accessibility text
      │
      ▼
Rust processing and event pipeline
      │
      ▼
Local SQLite store and search index
      │
      ▼
Tauri desktop UI: timeline, search, and event details
```

The repository is organized as a Rust workspace plus a Tauri desktop client:

| Area | Purpose |
| --- | --- |
| `crates/screener-capture`, `screener-screen` | Screen capture and platform-specific capture support |
| `crates/screener-a11y`, `screener-redact` | Accessibility text and privacy-conscious text/image processing |
| `crates/screener-engine`, `screener-events`, `screener-resource` | Capture orchestration, processing, and event models |
| `crates/screener-db`, `screener-sqlite-*` | SQLite persistence, coordination, and recovery |
| `apps/screener-app-tauri` | Tauri shell, Rust commands, and the React/Next.js interface |

## Privacy model

RIOM is designed around local ownership. Captured frames, extracted text, and
metadata are written to the local machine and are used by the local desktop
app. Recording is explicit and controllable, and the app includes settings for
capture, privacy, storage, and permissions.

Because screen activity can contain sensitive information, review your
operating-system capture permissions, configure privacy/redaction settings for
your workflow, and pause or stop recording whenever capture is not appropriate.

## Current scope

RIOM is currently a native desktop MVP. Capture and OCR/accessibility behavior
varies by operating system and requires the relevant permissions. Audio,
cloud-sync workflows, browser extensions, agents, and release infrastructure
are not part of the MVP’s core promise.

## Requirements

- Rust and the toolchain specified in `rust-toolchain.toml`
- Node.js and [Bun](https://bun.sh/)
- A desktop environment with screen-capture permissions

## Run locally

From the repository root:

```bash
cargo check --workspace
cargo test --workspace --no-fail-fast
```

Then start the desktop app:

```bash
cd apps/screener-app-tauri
bun install
bun run tauri dev
```

Useful frontend commands, run from `apps/screener-app-tauri`:

```bash
bun run typecheck
bun run build
```

## Validate a change

Before submitting Rust changes:

```bash
cargo fmt --all -- --check
cargo check --workspace
cargo test --workspace --no-fail-fast
```

Before submitting frontend changes:

```bash
cd apps/screener-app-tauri
bun run typecheck
bun run build
```

To create a release build, run `bun x tauri build` from the Tauri app
directory. Generated `target`, `dist`, and installer files should remain
uncommitted.

## Project status and lineage

This repository is an independent RIOM/Screener implementation. It draws
product and UX inspiration from [Retrace](https://github.com/haseab/retrace),
[Windrecorder](https://github.com/yuka-friends/Windrecorder), and
[DeskMate](https://github.com/zhaohb/deskmate). Its historical lineage is
documented in the original [Screenpipe project](https://github.com/screenpipe/screenpipe),
but RIOM’s source and release artifacts are maintained separately.

## License

See [LICENSE.md](LICENSE.md).
