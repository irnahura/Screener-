# SCREENER

SCREENER is a local-first desktop activity journal. It captures screen changes,
extracts text when OCR is enabled, stores events in local SQLite, and makes
those events searchable from the desktop app.

## Architecture

The Tauri desktop app coordinates the retained capture, processing, metadata,
and SQLite components. The UI reads the same local store used by the capture
pipeline; no remote backend is required.

## Requirements

- Rust and the toolchain in `rust-toolchain.toml`
- Node.js and Bun for the Tauri frontend
- Native desktop screen-capture permissions

## Run locally

```bash
cargo check
cargo test
cargo build
cd apps/screener-app-tauri
bun install
bun run tauri dev
```

## Validate and build

```bash
cargo fmt --all -- --check
cargo check --workspace
cargo test --workspace --no-fail-fast
cargo build --workspace --release
cd apps/screener-app-tauri
bun run typecheck
bun run build
bun x tauri build
```

The Windows installer produced by the Tauri build is the release artifact;
do not commit generated `target`, `dist`, or installer files to the source
repository.

## Reference projects

SCREENER is an independent implementation. For product and UX inspiration, see
[Retrace](https://github.com/haseab/retrace),
[Windrecorder](https://github.com/yuka-friends/Windrecorder), and
[DeskMate](https://github.com/zhaohb/deskmate).

Special Mention that helped a lot in the devlopment of this project
[Screenpipe project](https://github.com/screenpipe/screenpipe);

## Data and privacy

Captured frames, extracted text, and metadata remain on the local machine in
screener's SQLite data directory. Review the operating-system capture permissions
before starting the app, and stop capture when it is not needed.


[demo](https://github.com/irnahura/Screener-/releases/tag/v2.6.38-demo-home) use this for demo the other versions have some issues with them 
## MVP limitations

Screener is currently a native desktop MVP. Platform capture and OCR capabilities
vary by operating system, and audio, cloud sync, browser extensions, agents,
and release infrastructure are outside the MVP scope.
