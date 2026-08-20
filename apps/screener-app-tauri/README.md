# RIOM desktop app

This is the Tauri desktop shell for RIOM. The active MVP surface is limited
to Overview, Activity/Search, Event Detail, and Settings/Privacy.

The native runtime keeps the pipeline local:

```text
screen capture → change detection → OCR/text processing → SQLite → UI
```

Run from this directory:

```bash
bun install
bun run tauri dev
```

The app requires native screen-recording permission. Audio, chat, agents,
cloud sync, accounts, semantic search, and multi-monitor capture are outside
the MVP and are not enabled by default.
