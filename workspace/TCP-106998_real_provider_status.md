# TCP-106998 Real Provider Status

Generated: 2026-05-23

## Current completion (real result proof)

- Completed: AFB Sportsbook / SBO Sports portfolio
  - Back Office 4.1 drill-down shows real rows for `baje247pl01` with bet refs:
    - `B2711301` (Won)
    - `4937968` (Rejected/Void flow)
  - API report check confirms sportsbook record exists in GMT-4 window:
    - `portfolio=SportsBook`
    - `refNo=4937968`

## Still pending (no real-bet + Back Office 4.1 proof yet)

Note: API 3.2.1 login is already successful for these providers. Pending means real bet/result evidence is not yet generated/visible.

- (SBO) 568Win Live Casino (LC)
- SBO Games (RNG)
- SBO Slots
- 568winGame
- AFB Game
- FunkyGame

## Why pending

- API 3.2.1 login URL generation is successful for all required providers (see `workspace/TCP-106998_321_login_matrix.json`).
- The missing part is real bet lifecycle evidence (bet placed -> settled/void/rejected -> visible in Back Office/report).
- Back Office 4.1 currently shows game type filters only for:
  - All
  - SBO Sports
  - SBO Virtual Sports
- No confirmed real result rows for the remaining providers were found in current evidence set.

## Issues encountered during real test run

- Live Casino runtime error while placing bet:
  - Frontend console error: `placeOrderValidatorMap: productType not found`
  - Effect: bet placement fails on LC page despite successful 3.2.1 login.
- RNG entry intermittently shows `InvalidRequest` dialog in integrated browser session.
  - Likely cause: token/session invalidation timing in embedded browser context.
- Some third-party game launches hit Cloudflare challenge page (`Attention Required`) before game entry.

These are active blockers for non-sports provider completion and should be reported to partner together with screenshots/log lines.

## API scan evidence (real records)

- File: `workspace/TCP-106998_provider_hourly_scan.json`
  - Window scanned hourly: `2026-05-22T00:00:00-04:00` to `2026-05-24T00:00:00-04:00`
  - `SportsBook`: `totalCount=1`
  - `Casino`: `totalCount=0`
  - `Games`: `totalCount=0`
  - `SeamlessGame`: `totalCount=0`
  - `ThirdPartySportsBook`: `totalCount=0`
  - `VirtualSports`: `totalCount=0`
  - `568WinSportsbook`: `totalCount=0`

- File: `workspace/TCP-106998_provider_scan_keycompare.json`
  - Compared both company keys over a full-day GMT-4 window
  - No non-sports portfolio records returned

## Required to close TCP-106998

1. Place at least one real bet per pending provider/product.
2. Wait for settle/void/reject update to appear.
3. Capture Back Office 4.1 proof (date range + username + row with bet ref/result).
4. Map each row to requested product list in partner reply.

## Partner Instruction Alignment (latest)

Partner requested to use API 3.2.1 and complete testing for:

- (SBO) 568Win Live Casino (LC)
- SBO Games (RNG)
- SBO Slots
- 568winGame
- AFB Game
- FunkyGame
- AFB Sportsbook

Current completion against this list:

- Done: AFB Sportsbook
- Pending: all non-sports providers above until real bet records are visible in Back Office 4.1 and report APIs.

## Message to send partner now

Hi team,

Noted and understood. We will proceed with API 3.2.1 login and complete provider testing for the remaining products:

- 568Win Live Casino (LC)
- SBO Games (RNG)
- SBO Slots
- 568winGame
- AFB Game
- FunkyGame
- AFB Sportsbook

Current status from our side:

- AFB Sportsbook has real-result proof.
- Remaining non-sports providers are still pending real-bet records in Back Office 4.1/report.

We will update you immediately once each provider shows real result records and this step is fully complete.

Thank you.
