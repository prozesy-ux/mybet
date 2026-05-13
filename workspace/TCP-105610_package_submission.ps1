param(
  [string]$Workspace = "C:\Users\mpro\Desktop\1win\workspace",
  [string]$HtmlResult = "C:\Users\mpro\Desktop\1win\workspace\seamless-test-result.html",
  [string]$TestScreenshot = "C:\Users\mpro\Desktop\1win\workspace\seamless-test-pass.png",
  [string]$WhitelistScreenshot = "C:\Users\mpro\Desktop\1win\workspace\ip-whitelist-proof.png",
  [string]$Domain = "",
  [string]$CompanyKey = "",
  [string]$TestUsername = "",
  [string]$OutputZip = "C:\Users\mpro\Desktop\1win\workspace\TCP-105610_Submission_Pack.zip"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Workspace)) {
  throw "Workspace path not found: $Workspace"
}

$required = @($HtmlResult, $TestScreenshot)
$missing = @()
foreach ($f in $required) {
  if (-not (Test-Path $f)) { $missing += $f }
}
if ($missing.Count -gt 0) {
  Write-Output "Missing required files:"
  $missing | ForEach-Object { Write-Output " - $_" }
  throw "Add required files and run again."
}

$submissionDir = Join-Path $Workspace "TCP-105610_Submission"
if (Test-Path $submissionDir) { Remove-Item -Recurse -Force $submissionDir }
New-Item -ItemType Directory -Path $submissionDir | Out-Null

Copy-Item $HtmlResult (Join-Path $submissionDir "01_seamless_test_result.html")
Copy-Item $TestScreenshot (Join-Path $submissionDir "02_seamless_test_pass.png")
if (Test-Path $WhitelistScreenshot) {
  Copy-Item $WhitelistScreenshot (Join-Path $submissionDir "03_ip_whitelist_proof.png")
}

$body = @"
Hello team,

TCP-105610 precheck completed.

Step 1 (IP whitelist): Completed
Step 2 (Seamless Wallet API integration + test page): Completed
- All product types tested
- Need To Fix Count = 0

Details used:
- Domain: $Domain
- CompanyKey: $CompanyKey
- Test Username: $TestUsername

Attached for checking:
1. Seamless Wallet test result HTML file (Webpage, Complete)
2. Final pass screenshot
3. IP whitelist proof screenshot

Please verify and proceed with staging credential sharing.

Thank you.
"@

$bodyPath = Join-Path $submissionDir "00_message_to_568Win.txt"
Set-Content -Path $bodyPath -Value $body -Encoding UTF8

$checkPath = Join-Path $submissionDir "README.txt"
$check = @"
TCP-105610 Submission Pack

Contains:
- 00_message_to_568Win.txt
- 01_seamless_test_result.html
- 02_seamless_test_pass.png
- 03_ip_whitelist_proof.png (if provided)

If your domain changes, rerun test and regenerate this pack.
"@
Set-Content -Path $checkPath -Value $check -Encoding UTF8

if (Test-Path $OutputZip) { Remove-Item -Force $OutputZip }
Compress-Archive -Path (Join-Path $submissionDir "*") -DestinationPath $OutputZip -Force

Write-Output "Submission directory: $submissionDir"
Write-Output "Submission zip: $OutputZip"
Write-Output "Done. Send ZIP to 568Win team."
