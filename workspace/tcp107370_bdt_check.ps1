param(
  [string]$Base = '',
  [string]$CompanyKey = '',
  [string]$ServerId = 'GPZES01',
  [string]$Username = 'baje247pl01',
  [string]$OutPath = 'workspace/TCP-107370_bdt_check.json'
)

if (-not $Base) {
  $Base = $env:SW_BASE_URL
}
if (-not $CompanyKey) {
  $CompanyKey = $env:SW_COMPANY_KEY
}

if (-not $Base) {
  throw 'Missing Base URL. Pass -Base or set SW_BASE_URL.'
}
if (-not $CompanyKey) {
  throw 'Missing CompanyKey. Pass -CompanyKey or set SW_COMPANY_KEY.'
}

$headers = @{ 'Content-Type' = 'application/json' }

function PostJson($path, $body) {
  try {
    $resp = Invoke-RestMethod -Method Post -Uri ($Base + $path) -Headers $headers -Body ($body | ConvertTo-Json -Depth 20 -Compress)
    return @{ ok = $true; path = $path; request = $body; response = $resp }
  } catch {
    return @{ ok = $false; path = $path; request = $body; error = $_.Exception.Message }
  }
}

function GetQueryParamValue($url, $name) {
  if (-not $url) { return $null }
  $escapedName = [regex]::Escape($name)
  $m = [regex]::Match([string]$url, '(?:\?|&)' + $escapedName + '=([^&]+)')
  if (-not $m.Success) { return $null }
  return [System.Uri]::UnescapeDataString($m.Groups[1].Value)
}

$checks = @(
  @{ name = 'SportsBook'; portfolio = 'SportsBook'; gpId = 0 },
  @{ name = '568WinSportsbook'; portfolio = '568WinSportsbook'; gpId = 0 },
  @{ name = 'ThirdPartySportsBook_AFB'; portfolio = 'ThirdPartySportsBook'; gpId = 1015 }
)

$results = @()

foreach ($check in $checks) {
  $payload = @{
    CompanyKey = $CompanyKey
    ServerId = $ServerId
    Username = $Username
    Portfolio = $check.portfolio
    Lang = 'EN'
    Device = 'd'
    ProductId = 0
    RecommendMatchId = 0
    GpId = $check.gpId
    IsWapSports = $false
  }

  $safePayload = [ordered]@{
    CompanyKey = '[REDACTED]'
    ServerId = $ServerId
    Username = $Username
    Portfolio = $check.portfolio
    Lang = 'EN'
    Device = 'd'
    ProductId = 0
    RecommendMatchId = 0
    GpId = $check.gpId
    IsWapSports = $false
  }

  $login = PostJson '/web-root/restricted/player/v2/login.aspx' $payload

  $url = $null
  $errorId = $null
  $errorMsg = $null
  $currencyName = $null

  if ($login.ok) {
    $url = [string]$login.response.url
    $errorId = $login.response.error.id
    $errorMsg = $login.response.error.msg
    $currencyName = GetQueryParamValue $url 'currencyName'
  }

  $results += [ordered]@{
    name = $check.name
    portfolio = $check.portfolio
    gpId = $check.gpId
    ok = $login.ok
    errorId = $errorId
    errorMsg = if ($login.ok) { $errorMsg } else { $login.error }
    currencyName = $currencyName
    url = $url
    request = $safePayload
  }
}

$status = 'unknown'
$observed = @($results | Where-Object { $_.currencyName })
if ($observed.Count -gt 0) {
  $distinct = @($observed.currencyName | Sort-Object -Unique)
  if ($distinct.Count -eq 1 -and $distinct[0] -eq 'BDT') {
    $status = 'bdt_confirmed'
  } elseif ($distinct -contains 'USD') {
    $status = 'usd_detected'
  } else {
    $status = 'non_bdt_detected'
  }
}

$out = [ordered]@{
  ticket = 'TCP-107370'
  generatedAt = (Get-Date).ToString('o')
  endpoint = $Base
  username = $Username
  serverId = $ServerId
  status = $status
  results = $results
  guidance = @(
    'If currencyName is USD/non-BDT, this is not a callback code bug. The player or parent agent currency in 568Win is not BDT.',
    'Create or use a BDT agent in Production (API 2.1 Register Agent with Currency=BDT, or BO create agent with BDT).',
    'Create a new test player under that BDT agent, then rerun this script against the Prod endpoint.'
  )
}

$out | ConvertTo-Json -Depth 30 | Set-Content -Path $OutPath -Encoding UTF8
Write-Output "Wrote $OutPath"
$out.results | Select-Object name, portfolio, ok, errorId, currencyName | Format-Table -AutoSize | Out-String | Write-Output
