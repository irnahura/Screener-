# RIOM Demo

This isolated Windows demo proves the core local workflow without compiling the full application stack.

Included: Tauri UI, primary-monitor change capture, local JPEG snapshots, SQLite activity history, search, and start/pause/resume/stop controls.

Excluded from this demo: audio, Whisper, ONNX/ORT, ML redaction, enterprise sync, cloud/agent infrastructure, and telemetry.

Build from the repository root:

```powershell
$env:CARGO_BUILD_JOBS="2"
cargo build --manifest-path apps/riom-demo-tauri/Cargo.toml --bin riom-demo --profile riom-demo
```

The executable is produced under `target/riom-demo/riom-demo.exe` in this crate.
