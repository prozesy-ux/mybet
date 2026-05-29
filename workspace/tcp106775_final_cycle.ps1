$base = 'https://ex-api-demo-yy.568win.com'
$key = 'CB768EF40A78496AAB6815E1C92A548D'
$serverId = 'GPZES01'
$portfolio = 'SportsBook'
$start = '2026-05-23T14:54:00Z'
$end = '2026-05-23T15:05:00Z'
$headers = @{ 'Content-Type' = 'application/json' }

function PostJson($path, $body) {
  try {
    $resp = Invoke-RestMethod -Method Post -Uri ($base + $path) -Headers $headers -Body ($body | ConvertTo-Json -Depth 20 -Compress)
    return @{ ok = $true; path = $path; request = $body; response = $resp }
  } catch {
    return @{ ok = $false; path = $path; request = $body; error = $_.Exception.Message }
  }
}

$r54 = PostJson '/web-root/restricted/report/v2/get-bet-list-by-modify-date.aspx' @{
  companyKey = $key
  language = 'en'
  portfolio = $portfolio
  startDate = $start
  endDate = $end
  serverId = $serverId
  isGetDownline = $false
}

$results = @()
if ($r54.ok -and $r54.response.result) {
  $results = @($r54.response.result)
}

$ref = $null
if ($results.Count -gt 0) {
  $first = $results[0]
  foreach ($name in @('refNo', 'RefNo', 'refno', 'Refno', 'referenceNo', 'ReferenceNo', 'betRefNo', 'BetRefNo')) {
    if ($first.PSObject.Properties.Name -contains $name -and $first.$name) {
      $ref = [string]$first.$name
      break
    }
  }
}

if (-not $ref -and $results.Count -gt 0) {
  $json = $results[0] | ConvertTo-Json -Depth 20
  $m = [regex]::Match($json, '"(?:refNo|RefNo|refno|Refno|referenceNo|ReferenceNo|betRefNo|BetRefNo)"\s*:\s*"([^"]+)"')
  if ($m.Success) {
    $ref = $m.Groups[1].Value
  }
}

$r56 = if ($ref) {
  PostJson '/web-root/restricted/report/get-bet-list-by-refnos.aspx' @{
    serverId = $serverId
    portfolio = $portfolio
    companyKey = $key
    language = 'en'
    refNos = $ref
  }
} else {
  @{ skipped = $true; reason = 'No ref found from 5.4' }
}

$r510 = if ($ref) {
  PostJson '/web-root/restricted/report/get-bet-payload.aspx' @{
    Language = 'en'
    Refno = $ref
    Portfolio = $portfolio
    CompanyKey = $key
    ServerId = $serverId
  }
} else {
  @{ skipped = $true; reason = 'No ref found from 5.4' }
}

$txn = $null
if ($r56.ok -and $r56.response.result -and @($r56.response.result).Count -gt 0) {
  $first56 = @($r56.response.result)[0]
  foreach ($name in @('txnId', 'TxnId', 'transactionId', 'TransactionId', 'id', 'Id')) {
    if ($first56.PSObject.Properties.Name -contains $name -and $first56.$name) {
      $txn = [string]$first56.$name
      break
    }
  }
}

$r72 = if ($txn) {
  PostJson '/web-root/restricted/seamless-wallet/resend-order' @{
    companyKey = $key
    portfolio = $portfolio
    txnId = $txn
    serverId = $serverId
  }
} else {
  @{ skipped = $true; reason = 'No txnId found from 5.6' }
}

$out = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  note = 'Final cycle after user manual bet amount 10; ticket UI showed ID 4937968'
  window = @{
    startDate = $start
    endDate = $end
    portfolio = $portfolio
    companyKey = $key
    serverId = $serverId
  }
  extracted = @{
    refNo = $ref
    txnId = $txn
  }
  getBetListByModify = $r54
  getBetListByRefNos = $r56
  getBetPayload = $r510
  resendOrder = $r72
}

$outPath = 'workspace/TCP-106775_final_cycle.json'
$out | ConvertTo-Json -Depth 30 | Set-Content -Path $outPath -Encoding UTF8

Write-Output "Wrote $outPath"
Write-Output ($out.extracted | ConvertTo-Json -Depth 5)
if ($r54.ok -and $r54.response.result) {
  Write-Output ('5.4 result count: ' + @($r54.response.result).Count)
}
