# ConvergeIST Device-Specific Feature Flags

This static-site flag system is intentionally **browser-local**. It allows an owner to preview desktop and mobile experiences independently without exposing controls to ordinary visitors or requiring a backend.

## Opening the controls

Append `?features=1` to any ConvergeIST URL. For example:

`/business?features=1`

The bottom-right **Flags** control appears only when this query parameter is present. Each choice is persisted in that browser using local storage. **Reset** restores the defaults below.

| Flag | Default | Scope | Purpose |
| --- | --- | --- | --- |
| `mobileEnquiryFlow` | On | `≤700px` | Enables the compact, touch-first enquiry surface. |
| `desktopFilmTreatment` | On | `>700px` | Enables the Business Visits editorial film treatment. |
| `desktopFilmMotion` | On | `>700px` | Enables the supplementary motion layer inside the desktop treatment. |

For a public, server-controlled rollout later, move this registry to a backend configuration source and resolve the flags before rendering. The current setup is deliberately client-only to match the project’s static architecture.
