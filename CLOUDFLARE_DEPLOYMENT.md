# Cloudflare Deployment Guide

This project can be put on Cloudflare in a few different ways.

## What already works

- The frontend is Vite-based and can be deployed to Cloudflare Pages as a static site.
- The frontend now falls back to the current site origin outside localhost, so if the app is served from `https://gpzes.com`, it will call the same origin for API requests unless `VITE_API_BASE_URL` is set.
- The backend accepts configurable CORS origins through `CORS_ORIGIN`.
- Supabase/Postgres is already the database layer, so no database migration is needed just to move hosting.

## Best hosting options

### Option 1: Fastest

- Host the frontend on Cloudflare Pages.
- Keep the Express API on a separate backend host or a tunnel.
- Use `VITE_API_BASE_URL` to point the frontend at the backend URL.

### Option 2: All Cloudflare, but requires API migration

- Host the frontend on Cloudflare Pages.
- Rebuild the Express API as a Cloudflare Worker or Pages Function.
- Use Cloudflare Hyperdrive or a compatible Supabase access pattern for database calls.

### Option 3: Temporary demo only

- Use Cloudflare Tunnel to expose the local Express server.
- Good for testing and verification.
- Not a permanent production setup.

## Cloudflare Pages settings

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root
- Node version: modern LTS recommended

## Required environment variables

Frontend:

- `VITE_API_BASE_URL`
- `VITE_PUBLIC_SITE_URL`

Backend:

- `DATABASE_URL`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_SSL`
- `JWT_SECRET`
- `ADMIN_JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `API_PORT`
- `CORS_ORIGIN`

## For `gpzes.com`

If you want the app to live on `gpzes.com`, set:

- Frontend site URL: `https://gpzes.com`
- CORS origin: `https://gpzes.com,https://www.gpzes.com`

If the frontend and API are on the same domain, the frontend can call relative API paths like `/api/...`.

## What I still need from you for a real permanent Cloudflare setup

1. Confirm whether you want only the frontend on Cloudflare Pages, or the whole API migrated too.
2. Share the Cloudflare account/domain access for `gpzes.com`.
3. Share the Supabase connection details if they are not already configured in the backend environment.
4. If you want a full Cloudflare-native backend, confirm you are okay with an API rewrite to Worker-compatible code.

## Recommendation

If you want the fastest production result, use:

- Cloudflare Pages for the React app
- A stable backend host for the Express API
- Supabase for the database

If you want, I can next prepare the exact Cloudflare Pages config and, if you choose, start the API migration plan for a true Cloudflare-native setup.