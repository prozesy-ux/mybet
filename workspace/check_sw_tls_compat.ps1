param(
  [string]$HostName = "api.gpzes.com"
)

$ErrorActionPreference = "Stop"

Write-Host "Checking TLS compatibility for $HostName ..."

$tcp = New-Object System.Net.Sockets.TcpClient($HostName, 443)
$ssl = New-Object System.Net.Security.SslStream($tcp.GetStream(), $false, ({ $true }))
$ssl.AuthenticateAsClient($HostName)
$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($ssl.RemoteCertificate)

$sig = $cert.SignatureAlgorithm.FriendlyName
$pub = $cert.PublicKey.Oid.FriendlyName
$san = ($cert.Extensions | Where-Object { $_.Oid.Value -eq "2.5.29.17" } | Select-Object -First 1)

Write-Host "Subject           : $($cert.Subject)"
Write-Host "Issuer            : $($cert.Issuer)"
Write-Host "Expires           : $($cert.NotAfter.ToString('o'))"
Write-Host "Signature         : $sig"
Write-Host "Public Key Alg    : $pub"
Write-Host "Negotiated TLS    : $($ssl.SslProtocol)"
Write-Host "Cipher            : $($ssl.CipherAlgorithm) $($ssl.CipherStrength)"
if ($san) {
  Write-Host "SAN               : $($san.Format($true).Replace("`r`n", '; '))"
}

$ssl.Close()
$tcp.Close()

if ($pub -match "ECC|ECDSA" -or $sig -match "ECDSA") {
  Write-Warning "This host appears to use ECDSA. Legacy .NET clients may fail with secure-channel errors. Prefer RSA cert for swtest compatibility."
} else {
  Write-Host "Certificate key type looks RSA-compatible for legacy clients."
}

Write-Host ""
Write-Host "Protocol probes (Invoke-WebRequest):"

$tests = @(
  @{ Name = "TLS1.0"; Value = [Net.SecurityProtocolType]::Tls },
  @{ Name = "TLS1.1"; Value = [Net.SecurityProtocolType]::Tls11 },
  @{ Name = "TLS1.2"; Value = [Net.SecurityProtocolType]::Tls12 }
)

foreach ($t in $tests) {
  try {
    [Net.ServicePointManager]::SecurityProtocol = $t.Value
    Invoke-WebRequest -UseBasicParsing -Uri ("https://" + $HostName + "/") -Method Get -TimeoutSec 15 | Out-Null
    Write-Host ("  " + $t.Name + " : Handshake OK")
  } catch {
    $msg = $_.Exception.Message
    if ($msg -match "Could not create SSL/TLS secure channel") {
      Write-Host ("  " + $t.Name + " : Handshake FAIL (secure channel)")
    } else {
      Write-Host ("  " + $t.Name + " : Request reached server (" + $msg + ")")
    }
  }
}
