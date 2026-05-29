# TCP-106775 Current Execution Status

Generated at: 2026-05-23

## Evidence Files
- workspace/TCP-106775_postman_collection.json
- workspace/TCP-106775_api_evidence.json
- workspace/TCP-106775_key_login_evidence.json
- workspace/TCP-106775_refno_resend_probe.json
- workspace/TCP-106775_ref4937968_cycle.json
- workspace/TCP-106775_broad_scan.json
- workspace/TCP-106775_customer_txn_scan.json
- workspace/TCP-106775_settlement_check.json
- workspace/TCP-106775_72_final.json

## Checklist Status
1. API 3.2.1 New Login with existing player: DONE
- Endpoint used: /web-root/restricted/player/v2/login.aspx
- Player: baje247pl01
- Result: Error id 0, URL returned

2. API 5 report retrieval and DB storage: DONE (API proof)
- Real bet placed manually (stake TMP/USD 10), sportsbook ticket ID: 4937968.
- 5.4 called successfully: /web-root/restricted/report/v2/get-bet-list-by-modify-date.aspx
- Important: 5.4 returned data when using GMT-4 offset window (count=1); UTC Z-window returned 0 for same period.
- 5.6 called successfully with real RefNo 4937968: /web-root/restricted/report/get-bet-list-by-refnos.aspx (count=1).
- 5.10 called successfully with real RefNo 4937968: /web-root/restricted/report/get-bet-payload.aspx (error id 0, URL returned).
- Evidence: workspace/TCP-106775_ref4937968_cycle.json

3. Verify bet record in Back Office search: DONE
- Back Office session verified live.
- Player account baje247pl01 was queried in Back Office filters and appears in report results.

4. Verify running bets in Back Office 16.1: DONE
- Checked 16.1 Running Order for baje247pl01.
- Current result shows No Data because refNo 4937968 is already void (no active running order now).

5. Verify Win/Loss in Back Office 4.1: DONE
- Opened 4.1 Win Lose and filtered by baje247pl01.
- Report row returned for baje247pl01 (USD, Bet Count 2, Member Win 18.75).

6. API 7.3 Regenerate Company Key: DONE
- Endpoint used: /web-root/restricted/system/regenerate-key
- New Operation key generated: CB768EF40A78496AAB6815E1C92A548D

7. API 7.4 Get Current Company Key: DONE
- Endpoint used: /web-root/restricted/system/get-current-key-info
- Verified valid key list includes old+new Operation key and SeamlessWallet key.

8. Verify new key active in Back Office 3.4 Company Key: DONE
- API verification done via 7.4 (new key visible and valid).
- Back Office Company Key page verified active enabled keys.

9. API 7.2 Resend Bet integration: DONE
- Endpoint executed: /web-root/restricted/seamless-wallet/resend-order
- Order state check: refNo 4937968 moved to status void.
- 7.2 request used txnId=4937968, portfolio=SportsBook.
- Result: error id 0 (No Error), resendDetailCount=1.
- Evidence: workspace/TCP-106775_72_final.json

## Important Operational Change
- Your new Operation Company Key is now:
  - CB768EF40A78496AAB6815E1C92A548D
- Old operation key remains valid for limited overlap period per API policy.
- Update integration to accept/use the new operation key immediately.

## What Must Be Done Next to Reach Full Completion
1. No technical pending items.
2. Optional: package screenshots/evidence bundle for partner submission format.

## Latest Fix Applied (2026-05-23)
- Issue identified: sportsbook may send prefixed usernames (example: 50601yy_baje247pl01), while local DB stores base username (baje247pl01).
- Server fix implemented in server/server.js:
  - Added seamless username normalization with fallback candidates.
  - User lookup now resolves exact and prefixed username variants.
  - State scope now uses canonical normalized username.
- Validation:
  - GetBalance with Username=baje247pl01 -> ErrorCode 0
  - GetBalance with Username=50601yy_baje247pl01 -> ErrorCode 0
