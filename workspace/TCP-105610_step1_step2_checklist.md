# TCP-105610 - Seamless Wallet Precheck (Step 1 + Step 2)

## What 568Win is asking before staging credentials
You must complete and prove:
1. Step 1: IP whitelist
2. Step 2: API integration + Seamless Wallet test page pass

Only after these are done and evidence is sent, they will review and then proceed.

## Source
Document extracted from:
- C:\Users\mpro\Downloads\Telegram Desktop\568Win Seamless Wallet SOP_18.pdf

Text extraction file:
- C:\Users\mpro\Desktop\1win\workspace\seamless_wallet_sop_extracted.txt

## Critical Notes from SOP
- Test all product types on the Seamless Wallet test page, even if you will only launch some products.
- Need To Fix Count must be 0.
- Save and send the test result page as HTML (Webpage, Complete).
- If domain changes, tests and setup must be done again.

### Domain formatting rules (important)
- On Seamless Wallet test page: Domain must NOT end with slash (/)
  - Example: http://abcd.com
- In Back Office callback URL setup (Step 3): each callback URL MUST end with slash (/)

## Currency Ratio Rules
- 1:1000 for IDR / VND / MYK
  - 1 credit = 1000 currency units
- 1:1 for IDO / VNO / MMK
  - 1 credit = 1 currency unit

## Step 1 - Whitelist 568Win IPs
Whitelist all below.

### Office IP
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

### Server IP
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

## Step 2 - API integration + test pass
A. Complete Seamless Wallet API integration (all required endpoints)
B. Execute Seamless Wallet test page

Fill test page fields:
- Domain: your callback domain without trailing slash
- CompanyKey: your Company Key (or random string per SOP)
- Test Username: existing player account with 500 balance

Pass condition:
- Need To Fix Count = 0
- All product types tested

Evidence required:
- Save test result page as HTML (Webpage, Complete)
- Send HTML file to 568Win for review

## Ready-to-send reply template
Use this after finishing Step 1 and Step 2:

Hello team,

TCP-105610 precheck completed.

Step 1 (IP whitelist): Completed
- Whitelisted all Office and Server IPs from SOP.

Step 2 (Seamless Wallet API + test page): Completed
- API integration done.
- Test page completed for all product types.
- Need To Fix Count = 0.

Attached for your verification:
1. Seamless Wallet test result HTML file (Webpage, Complete)
2. Screenshot showing test page final pass state
3. Test username used (500 balance)
4. Domain used in test page (without trailing slash)

Please review and proceed with staging credential sharing.

Thank you.
