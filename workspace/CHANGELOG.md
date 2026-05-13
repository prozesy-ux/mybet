<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>

## 2026-05-12 (latest)
- Created `RegistrationModal.tsx`: currency dropdown, phone+email+password fields, promo code, agreement checkbox, social buttons (Google/Telegram/Steam), Log in link
- Wired Registration button in `AuthActions.tsx` with `regOpen` state
- `onLoginClick` prop on RegistrationModal closes reg and opens login modal
- Removed all `__ANIMA_DBG__` debug console.log calls from AuthActions

## 2026-05-12
- Fixed tsconfig.app.json: added `baseUrl` and `paths` for `@/` alias resolution
- Changed AuthActions import to relative path `./LoginModal` for safer bundling
- Added debug log to verify modal toggle state
- Created full `LoginModal.tsx` with phone/email tabs, password toggle, social login (Google/Telegram), forgot password, register link
- Wired `AuthActions.tsx` Login button with `useState` to open/close the modal
- Modal uses `font-inter`, white background, green-600 accent, matching site design system

</changelog>
