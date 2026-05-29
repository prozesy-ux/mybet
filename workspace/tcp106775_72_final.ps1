$base = 'https://ex-api-demo-yy.568win.com'
$key = 'CB768EF40A78496AAB6815E1C92A548D'
$headers = @{ 'Content-Type' = 'application/json' }

$r72 = Invoke-RestMethod -Method Post -Uri ($base + '/web-root/restricted/seamless-wallet/resend-order') -Headers $headers -Body (@{
  txnId = '4937968'
  portfolio = 'SportsBook'
  companyKey = $key
  serverId = 'GPZES01'
} | ConvertTo-Json -Compress)

$out = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  request = @{
    txnId = '4937968'
    portfolio = 'SportsBook'
    companyKey = $key
    serverId = 'GPZES01'
  }
  response = $r72
}

$outPath = 'workspace/TCP-106775_72_final.json'
$out | ConvertTo-Json -Depth 30 | Set-Content -Path $outPath -Encoding UTF8

Write-Output "Wrote $outPath"
Write-Output ('errorId=' + $r72.error.id + ' msg=' + $r72.error.msg)
Write-Output ('resendDetailCount=' + @($r72.resendDetail).Count)
