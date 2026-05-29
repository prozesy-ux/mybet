# Environment Variables for Render Deployment

Copy these and fill in your values in the Render dashboard.

## Backend Service Environment Variables

```
DATABASE_URL=postgresql://postgres.XXXXX:PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
DATABASE_USER=postgres.XXXXX
DATABASE_PASSWORD=your-supabase-password
DATABASE_NAME=postgres
DATABASE_HOST=aws-1-ap-south-1.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_SSL=true
JWT_SECRET=your-jwt-secret-key-change-this-to-something-random
ADMIN_JWT_SECRET=your-admin-jwt-secret-change-this-to-something-random
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@12345
API_PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://mybet-frontend.render.com,https://gpzes.com,https://www.gpzes.com,https://*.pages.dev
TKPAY_API_BASE_URL=https://tkm.worldxxpp.com
TKPAY_API_DOCS_URL=https://worldpay168.readme.io/
TKPAY_MERCHANT_ID=9eaee712-6905-47e4-9a4a-07fb26e14f3d
TKPAY_MERCHANT_KEY=your-tkpay-merchant-key
TKPAY_INSTITUTION_NAME=WorldPay
TKPAY_SUPPORTED_CHANNELS=bkash:34,nagad:35
TKPAY_MIN_AMOUNT=100
TKPAY_MAX_AMOUNT=50000
TKPAY_PAYOUT_ENABLED=true
TKPAY_COLLECTION_CALLBACK_URL=https://your-backend-domain/api/payments/tkpay/callback/collection
TKPAY_PAYOUT_CALLBACK_URL=https://your-backend-domain/api/payments/tkpay/callback/payout
TKPAY_CALLBACK_IP_WHITELIST=34.126.218.136,34.131.126.154
```

## Frontend Service Environment Variables

```
VITE_API_BASE_URL=https://mybet-backend-xypv.onrender.com
VITE_PUBLIC_SITE_URL=https://mybet-frontend.render.com
```

## How to get Supabase values:

1. Go to Supabase project
2. Click Settings → Database
3. Copy connection string
4. Extract the values:
   - HOST: aws-1-ap-south-1.pooler.supabase.com
   - PORT: 5432
   - USER: postgres.xxxxx
   - PASSWORD: your-password
   - DATABASE: postgres

## Notes:

- Change JWT_SECRET and ADMIN_JWT_SECRET to random values
- Keep DATABASE_SSL=true for Supabase
- Update CORS_ORIGIN if using custom domains
- Update VITE_API_BASE_URL to match your backend URL from Render
- See TKPAY integration details in `TKPAY_INTEGRATION.md`
