# RIOM contributor notes

RIOM is a local-first desktop activity journal built around screen capture,
OCR/text processing, metadata extraction, and SQLite storage.

## Structure

- `crates/screener-*`: capture, processing, storage, and supporting libraries.
- `apps/screener-app-tauri`: the Tauri desktop application and frontend.

## Development commands

Run `cargo fmt --all -- --check`, `cargo check --workspace`, and
`cargo test --workspace --no-fail-fast` from the repository root after Rust
changes. Run `bun run typecheck` and `bun run build` from
`apps/screener-app-tauri` after frontend changes. Build the Windows release
with `bun x tauri build` from that directory.

Keep the MVP focused on capture, OCR/accessibility text, local SQLite storage,
search, metadata, and event detail. Do not reintroduce cloud services,
mandatory providers, or removed integrations without an explicit product
requirement. Preserve upstream copyright and license notices.
