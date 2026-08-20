---
name: screener-team
description: Use the native Screener CLI to query Enterprise team activity or safely preview, deploy, and schedule managed team Pipes. Injected only by the Enterprise app for active admins.
---

# Screener Enterprise admin

Use `screener team`; it reads the admin token and API base from Screener's
Enterprise settings. Never print tokens or read `enterprise.json` into context.

## Choose the smallest command

```bash
# Identify a device before searching for one teammate.
screener team devices --raw

# Search first; default to 24h and at most 20 results.
screener team search "TOPIC" --since 24h -n 20 --raw > /tmp/sp-team.jsonl

# Fetch a short chronology only after the device and window are known.
screener team records --device-id DEVICE --since 4h --kind all -n 50 --raw > /tmp/sp-team.jsonl
```

Keep context small: check `wc -c /tmp/sp-team.jsonl`; if it exceeds 5 KB,
filter with `jq` or narrow the query/window instead of printing the whole file.
Reference results by timestamp and device, quote only short snippets, respect
anonymous `user_*` labels, and do not volunteer unrelated employee data.

For the user's own machine, use `screener-api`, not this skill.

## Managed team Pipes

```bash
screener team pipes list
screener team pipes preview ./my-pipe/pipe.md
screener team pipes deploy ./my-pipe/pipe.md
screener team pipes schedule my-pipe "every day at 9am"
```

Before any mutation, show the exact preview and target. New deployments default
to Cloud Runner; use `--device`, `--member`, or `--all-runtimes` only when the
user explicitly chooses that scope. Use `--yes` for automation only after the
same preview is accepted. Version conflicts fail closed; re-list and re-preview
rather than overwriting a teammate's change. Use `--json` for structured
receipts.

The CLI explains missing-token and scope errors. Team reads require the relevant
`read:devices`, `read:search`, or `read:records` scope; Pipe management requires
`write:pipes`. Direct the user to <https://screenpi.pe/enterprise?tab=tokens> to
mint or rotate a token, then Settings → Privacy → Admin Team API Token.
