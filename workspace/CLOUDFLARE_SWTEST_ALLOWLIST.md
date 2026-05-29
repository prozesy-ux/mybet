# Cloudflare Rules to Resolve 568Win WebException 530

Use these rules on the zone that serves api.gpzes.com.

## Why
568Win test page is reaching the domain but Cloudflare returns 530 from their side. This is usually edge/origin access policy mismatch, not Seamless API logic.

## Step A: Create an IP List (recommended)
Create an IP list named:
- 568win_swtest_ips

Add all IPs below.

### Office IPs
- 122.146.58.49
- 61.220.125.7
- 61.220.125.8
- 220.130.194.76
- 111.235.225.61
- 111.235.225.62
- 125.227.48.247
- 125.227.48.248
- 136.228.131.134
- 163.47.15.15
- 103.60.253.249
- 103.60.255.247
- 15.152.236.209
- 15.152.26.49

### Server IPs
- 203.176.129.162
- 103.60.252.203
- 103.60.252.250
- 103.60.253.203
- 103.60.254.250
- 103.60.254.203
- 103.60.255.203
- 203.57.34.203
- 203.57.35.203
- 103.60.252.204
- 103.60.253.205
- 103.60.253.221
- 103.60.253.249
- 103.60.255.247
- 43.198.1.150
- 15.152.117.63
- 43.218.41.172
- 52.194.35.1
- 34.92.69.111
- 34.80.140.183
- 34.96.190.70
- 34.95.200.210

## Step B: WAF Custom Rule (Allow)
Create rule with action Allow and put it above managed challenge rules.

Expression:
(http.host eq "api.gpzes.com" and ip.src in $568win_swtest_ips)

## Step C: Optional Bypass Rule for Seamless Endpoints
If managed WAF/bot checks still interfere, add Skip rule for these paths from 568Win IPs.

Expression:
(http.host eq "api.gpzes.com" and ip.src in $568win_swtest_ips and http.request.method eq "POST" and lower(http.request.uri.path) in {"/getbalance" "/deduct" "/settle" "/cancel" "/rollback" "/getbetstatus"})

Skip products:
- WAF Managed Rules
- Super Bot Fight Mode (if enabled)
- Rate Limiting (if enabled)

## Step D: SSL/TLS Settings for Testing Window
- SSL mode: Full (strict)
- Minimum TLS Version: TLS 1.0 (temporary for 568Win legacy client compatibility)

After 568Win confirms pass, raise minimum TLS back to TLS 1.2.

## Step E: Re-test Procedure
1. Keep domain on swtest page without trailing slash: https://api.gpzes.com
2. Click Stop Previous Sending.
3. Select all products.
4. Start Testing.
5. Pass criteria:
   - Web Exception empty
   - Need To Fix Count = 0
   - Report table populated

## Verify From Your Side
Run:
- powershell -ExecutionPolicy Bypass -File .\workspace\check_sw_tls_compat.ps1 -HostName api.gpzes.com

And smoke test:
- POST https://api.gpzes.com/GetBalance returns ErrorCode 0.
