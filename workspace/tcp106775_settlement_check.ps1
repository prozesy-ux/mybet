$base = 'https://ex-api-demo-yy.568win.com'
$key = 'CB768EF40A78496AAB6815E1C92A548D'
$headers = @{ 'Content-Type' = 'application/json' }

$r56 = Invoke-RestMethod -Method Post -Uri ($base + '/web-root/restricted/report/get-bet-list-by-refnos.aspx') -Headers $headers -Body (@{
  refNos = '4937968'
  portfolio = 'SportsBook'
  companyKey = $key
  language = 'en'
  serverId = 'GPZES01'
} | ConvertTo-Json -Compress)

$r57 = Invoke-RestMethod -Method Post -Uri ($base + '/web-root/restricted/report/get-customer-transaction.aspx') -Headers $headers -Body (@{
  username = 'baje247pl01'
  startDate = '2026-05-23T10:30:00-04:00'
  endDate = '2026-05-23T12:30:00-04:00'
  companyKey = $key
  serverId = 'GPZES01'
} | ConvertTo-Json -Compress)

$out = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  ref = '4937968'
  betStatus = if (@($r56.result).Count -gt 0) { @($r56.result)[0].status } else { 'not-found' }
  betRecord = if (@($r56.result).Count -gt 0) { @($r56.result)[0] } else { $null }
  customerTxns = $r57
}

$outPath = 'workspace/TCP-106775_settlement_check.json'
$out | ConvertTo-Json -Depth 40 | Set-Content -Path $outPath -Encoding UTF8

Write-Output "Wrote $outPath"
Write-Output ('betStatus=' + $out.betStatus)
Write-Output ('txnCount=' + @($r57.result).Count)
