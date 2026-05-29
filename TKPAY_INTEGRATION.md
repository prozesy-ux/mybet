# TKPAY Integration Documentation

This document records the active payment gateway integration details and operational mapping for this project.

## Provider Summary

- Payment channel name: TKPAY
- Institution: WorldPay
- Merchant ID: 9eaee712-6905-47e4-9a4a-07fb26e14f3d
- API docs: https://worldpay168.readme.io/
- API domain: https://tkm.worldxxpp.com
- Supports payout API (disbursement): Yes

## Supported Channels

- BKash (channel code `34`)
- Nagad (channel code `35`)

Current platform defaults in this repo use:
- `bkash`
- `nagad`

## Amount Limits

- BKash: 100 to 50000
- Nagad: 100 to 50000

These limits are applied in seeded/auto-synced payment methods.

## Callback Source IP Whitelist

Allow only the following callback source IPs:

- 34.126.218.136
- 34.131.126.154

## Environment Variables

Set the following in deployment/server environment:

```env
TKPAY_API_BASE_URL=https://tkm.worldxxpp.com
TKPAY_API_DOCS_URL=https://worldpay168.readme.io/
TKPAY_MERCHANT_ID=9eaee712-6905-47e4-9a4a-07fb26e14f3d
TKPAY_MERCHANT_KEY=<your-merchant-key>
TKPAY_INSTITUTION_NAME=WorldPay
TKPAY_SUPPORTED_CHANNELS=bkash:34,nagad:35
TKPAY_MIN_AMOUNT=100
TKPAY_MAX_AMOUNT=50000
TKPAY_PAYOUT_ENABLED=true
TKPAY_COLLECTION_CALLBACK_URL=https://your-backend-domain/api/payments/tkpay/callback/collection
TKPAY_PAYOUT_CALLBACK_URL=https://your-backend-domain/api/payments/tkpay/callback/payout
TKPAY_CALLBACK_IP_WHITELIST=34.126.218.136,34.131.126.154
```

## Integration Notes

- The backend currently uses generic `payment_methods` records for deposit/withdraw validation.
- During backend startup, payment methods are synchronized so `bkash` and `nagad` are active with provider `TKPAY` and range 100-50000.
- Legacy `upay` is automatically marked `inactive`.
- Existing user flows for deposit/withdraw continue to work without endpoint path changes.

## Backend/Frontend Mapping in This Repo

- Backend seed/sync: `server/server.js`
- User deposit modal defaults: `src/components/modals/DepositModal.tsx`
- Transaction history logo mapping: `src/components/modals/TransactionHistoryModal.tsx`
- Deploy env template: `DEPLOYMENT_ENV_TEMPLATE.md`
- Server env template: `server/.env.example`

## Checklist For Go-Live

1. Fill `TKPAY_MERCHANT_KEY` from provider dashboard.
2. Set collection and payout callback URLs to your production backend.
3. Ensure callback gateway/network allows only listed whitelist IPs.
4. Verify `bkash` and `nagad` methods are active in admin panel.
5. Run one deposit and one payout UAT test and verify callback + status transition.

## Source Message Snapshot

Provided integration payload included:

- 对接支付资料:
  1. 支付渠道名称: TKPAY
  2. 商户号: 9eaee712-6905-47e4-9a4a-07fb26e14f3d
  3. API对接文档: https://worldpay168.readme.io/
  4. 支持服务: bKash(34), Nagad(35)
  5. API出款 (代付): Yes
  6. 单笔最低/最高充值: 100-50000
  7. Api域名: https://tkm.worldxxpp.com
  8. 回调IP: 34.126.218.136, 34.131.126.154
  9. 机构名称: WorldPay
