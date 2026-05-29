# TCP-106775 - Staging Execution Checklist

## Scope from 568Win
1. API 3.2.1 New Login: login with existing player and place a bet.
2. API 5 reports: fetch bet records and store in local DB.
- 5.4 Get Bet List By Modify Date (Without Username)
- 5.6 Get Bet List By RefNos
- 5.10 Get Bet Payload
3. Verify bet record in Back Office by player search.
4. Verify Running Bets in Back Office (16.1).
5. Verify Win/Loss report in Back Office (4.1).
6. API 7.3 Regenerate Company Key.
7. API 7.4 Get Current Company Key and collect valid non-expired keys.
8. Verify new key activated in Back Office (3.4 Company Key).
9. API 7.2 Resend Bet integration (trigger resend Settle/Cancel).

## Prerequisites
- Staging base domain and API entry URLs are reachable.
- Existing player account is available and active.
- Back Office account has access to Monitoring, Report, and Member Management pages.
- Local service can store report payloads in database.

## Execution Plan (in order)

### Phase A - Login and Bet Placement
1. Call API 3.2.1 New Login with player account.
2. Open returned URL/session and place one real test bet.
3. Capture evidence:
- Login request and response JSON
- Bet slip reference / refNo / transaction id
- UTC timestamp window for later report fetch

### Phase B - Report API Integration (DB storage)
1. Implement polling job for API 5.4 by modify date range.
2. Parse response and upsert bet headers into DB.
3. For each refNo returned, call API 5.6 to get exact records.
4. For each record, call API 5.10 to fetch full payload details.
5. Save raw JSON and normalized columns (refNo, username, stake, result, modifyDate, provider fields).
6. Add idempotency key (companyKey + refNo + modifyDate) to avoid duplicates.

### Phase C - Back Office Verification
1. Search player at top-left global search and locate placed bet.
2. Check Monitoring -> Running Bets (16.1) during unsettled period.
3. Check Report -> Win/Loss (4.1) after settlement.
4. Record screenshots for all 3 checks.

### Phase D - Company Key Rotation
1. Call API 7.3 Regenerate Company Key.
2. Immediately call API 7.4 Get Current Company Key.
3. Confirm both key list and expiry data are captured.
4. In Back Office (3.4 Company Key), verify newly generated key is Active.
5. Update integration config to accept all valid non-expired keys during transition window.

### Phase E - API 7.2 Resend Bet
1. Implement endpoint/service call wrapper for API 7.2.
2. Run one controlled resend test for a known bet/refNo.
3. Validate callback reception for Settle/Cancel on your SW endpoint.
4. Confirm final bet status is consistent between your DB and Back Office.

## Evidence Package to Prepare
- New Login request/response sample
- Bet placement proof (refNo + timestamp)
- API 5.4/5.6/5.10 sample requests/responses
- DB snapshot rows for inserted report records
- Back Office screenshots:
  - Player search result
  - 16.1 Running Bets
  - 4.1 Win/Loss
  - 3.4 Company Key activation
- API 7.3 + 7.4 request/response samples
- API 7.2 resend test logs and callback logs

## Suggested DB fields for report storage
- ref_no (unique)
- username
- product_type
- provider_id
- stake
- win_loss
- status
- bet_time
- settle_time
- modify_date
- raw_header_json
- raw_payload_json
- created_at
- updated_at

## Completion Criteria
- Each of the 9 requested items has proof.
- API 5 data is saved in DB and repeat polling is idempotent.
- New company key is generated and active in BO.
- API 7.2 resend flow is integrated and verified.

## Current Status
- Ready to execute
- Waiting only on staged run and evidence collection
