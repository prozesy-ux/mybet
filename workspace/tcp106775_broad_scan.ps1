$base = 'https://ex-api-demo-yy.568win.com'
$serverId = 'GPZES01'
$keys = @('799DCB01CFB9489CB2DF42D9B0743F59', 'CB768EF40A78496AAB6815E1C92A548D')
$portfolios = @('SportsBook', '568WinSportsbook', 'ThirdPartySportsBook')
$usernames = @('baje247pl01', '50601yy_baje247pl01')
$start = '2026-05-23T14:30:00Z'
$end = '2026-05-23T15:30:00Z'
$headers = @{ 'Content-Type' = 'application/json' }

function PostJson($path, $body) {
  try {
    $resp = Invoke-RestMethod -Method Post -Uri ($base + $path) -Headers $headers -Body ($body | ConvertTo-Json -Depth 20 -Compress)
    return @{ ok = $true; response = $resp; request = $body; path = $path }
  } catch {
    return @{ ok = $false; error = $_.Exception.Message; request = $body; path = $path }
  }
}

$rows = @()

foreach ($key in $keys) {
  foreach ($portfolio in $portfolios) {
    $r54 = PostJson '/web-root/restricted/report/v2/get-bet-list-by-modify-date.aspx' @{
      companyKey = $key
      language = 'en'
      portfolio = $portfolio
      startDate = $start
      endDate = $end
      serverId = $serverId
      isGetDownline = $false
    }

    $count54 = 0
    if ($r54.ok -and $r54.response.result) { $count54 = @($r54.response.result).Count }
    $rows += [ordered]@{api='5.4'; key=$key; portfolio=$portfolio; count=$count54; errorId=if($r54.ok){$r54.response.error.id}else{$null}; errorMsg=if($r54.ok){$r54.response.error.msg}else{$r54.error}}

    foreach ($username in $usernames) {
      $r55 = PostJson '/web-root/restricted/report/get-bet-list-by-transaction-date.aspx' @{
        username = $username
        portfolio = $portfolio
        startDate = $start
        endDate = $end
        language = 'en'
        companyKey = $key
        serverId = $serverId
      }
      $count55 = 0
      if ($r55.ok -and $r55.response.result) { $count55 = @($r55.response.result).Count }
      $rows += [ordered]@{api='5.5'; key=$key; portfolio=$portfolio; username=$username; count=$count55; errorId=if($r55.ok){$r55.response.error.id}else{$null}; errorMsg=if($r55.ok){$r55.response.error.msg}else{$r55.error}}
    }
  }
}

$out = [ordered]@{
  generatedAt = (Get-Date).ToString('o')
  window = @{ startDate = $start; endDate = $end }
  summary = $rows
}

$outPath = 'workspace/TCP-106775_broad_scan.json'
$out | ConvertTo-Json -Depth 20 | Set-Content -Path $outPath -Encoding UTF8

Write-Output "Wrote $outPath"
$rows | Format-Table -AutoSize | Out-String | Write-Output
