# ConvergeIST

ConvergeIST is an editorial, route-led guide for international students arriving in China and business visitors planning supplier visits, sourcing work, and shipping handoffs.

## Technology

The application is a React 19, Vite, TypeScript, and Tailwind CSS single-page application. Client-side routes are handled by Wouter. The project uses `pnpm` and includes static-host configuration for both Vercel and Netlify.

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Run validation and a production build with:

```bash
pnpm check
pnpm build
```

The production build is written to `dist/public`.

## Deploy with Vercel

1. Import this GitHub repository in [Vercel](https://vercel.com/new).
2. Vercel detects the committed configuration automatically.
3. Confirm `pnpm build` as the build command and `dist/public` as the output directory.
4. Deploy.

`vercel.json` provides the single-page application rewrite required for direct links such as `/arrivals/shanghai`, `/business-cities/shenzhen`, and `/cities#business-cities`.

## Deploy with Netlify

1. Import this GitHub repository in [Netlify](https://app.netlify.com/start).
2. The committed `netlify.toml` supplies the build command, output directory, Node version, and single-page application fallback.
3. Deploy.

## Optional analytics environment variables

Analytics loads only when **both** variables are set in the selected host’s environment settings:

| Variable | Purpose |
| --- | --- |
| `VITE_ANALYTICS_ENDPOINT` | Base URL for the Umami analytics server. |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website identifier. |

If the variables are not configured, the analytics script is skipped and the site still runs normally.

## Owner-only feature previews

Append `?features=1` to any URL to open browser-local controls for the mobile enquiry flow and desktop Business Visits film treatment. These controls are intended for previews; their settings persist only in the current browser’s local storage.

## Contact

Email [success@airweber.tech](mailto:success@airweber.tech), call [+44 7754 285 455](tel:+447754285455), or follow [@convergeist](https://www.instagram.com/convergeist/).
