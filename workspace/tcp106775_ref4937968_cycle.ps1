$base = 'https://ex-api-demo-yy.568win.com'
$key = 'CB768EF40A78496AAB6815E1C92A548D'
$headers = @{ 'Content-Type' = 'application/json' }

function PostJson($path, $body) {
  Invoke-RestMethod -Method Post -Uri ($base + $path) -Headers $headers -Body ($body | ConvertTo-Json -Compress)
}

$r54a = PostJson '/web-root/restricted/report/v2/get-bet-list-by-modify-date.aspx' @{
  portfolio = 'SportsBook'
  startDate = '2026-05-23T14:40:00Z'
  endDate = '2026-05-23T15:20:00Z'
  companyKey = $key
  isGetDownline = $false
  language = 'en'
  serverId = 'GPZES01'
}

$r54b = PostJson '/web-root/restricted/report/v2/get-bet-list-by-modify-date.aspx' @{
  portfolio = 'SportsBook'
  startDate = '2026-05-23T10:40:00-04:00'
  endDate = '2026-05-23T11:20:00-04:00'
  companyKey = $key
  isGetDownline = $false
  language = 'en'
  serverId = 'GPZES01'
}

$r54c = PostJson '/web-root/restricted/report/v2/get-bet-list-by-modify-date.aspx' @{
  portfolio = 'SportsBook'
  startDate = '2026-05-23T10:40:00-04:00'
  endDate = '2026-05-23T11:20:00-04:00'
  companyKey = $key
  isGetDownline = $true
  language = 'en'
  serverId = 'GPZES01'
}

$r56 = PostJson '/web-root/restricted/report/get-bet-list-by-refnos.aspx' @{
  refNos = '4937968'
  portfolio = 'SportsBook'
  companyKey = $key
  language = 'en'
  serverId = 'GPZES01'
}

$r510 = PostJson '/web-root/restricted/report/get-bet-payload.aspx' @{
  Language = 'en'
  Refno = '4937968'
  Portfolio = 'SportsBook'
  CompanyKey = $key
  ServerId = 'GPZES01'
}

$r72 = PostJson '/web-root/restricted/seamless-wallet/resend-order' @{
  txnId = '4937968'
  portfolio = 'SportsBook'
  companyKey = $key
  serverId = 'GPZES01'
}

$out = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  refNo = '4937968'
  windowTests = @{
    utc = @{ count = @($r54a.result).Count; error = $r54a.error }
    gmtMinus4 = @{ count = @($r54b.result).Count; error = $r54b.error }
    gmtMinus4Downline = @{ count = @($r54c.result).Count; error = $r54c.error }
  }
  api56 = $r56
  api510 = $r510
  api72WithTxnAsRef = $r72
}

$outPath = 'workspace/TCP-106775_ref4937968_cycle.json'
$out | ConvertTo-Json -Depth 30 | Set-Content -Path $outPath -Encoding UTF8

Write-Output "Wrote $outPath"
Write-Output ('5.4 counts utc=' + @($r54a.result).Count + ' gmt4=' + @($r54b.result).Count + ' gmt4downline=' + @($r54c.result).Count)
Write-Output ('5.6 error=' + $r56.error.id + ' count=' + @($r56.result).Count)
Write-Output ('5.10 error=' + $r510.error.id)
Write-Output ('7.2 error=' + $r72.error.id + ' msg=' + $r72.error.msg)
