param(
  [string]$Base = '',
  [string]$CompanyKey = '',
  [string]$ServerId = 'GPZES01',
  [string]$Username = '',
  [string]$OutPath = 'workspace/TCP-107370_bdt_check_prod.json'
)

if (-not $Base) {
  $Base = $env:SW_PROD_BASE_URL
}
if (-not $CompanyKey) {
  $CompanyKey = $env:SW_PROD_COMPANY_KEY
}
if (-not $Username) {
  $Username = $env:SW_PROD_TEST_USERNAME
}

if (-not $Base) {
  throw 'Missing production Base URL. Pass -Base or set SW_PROD_BASE_URL.'
}
if (-not $CompanyKey) {
  throw 'Missing production CompanyKey. Pass -CompanyKey or set SW_PROD_COMPANY_KEY.'
}
if (-not $Username) {
  throw 'Missing production test username. Pass -Username or set SW_PROD_TEST_USERNAME.'
}

powershell -NoProfile -ExecutionPolicy Bypass -File "workspace/tcp107370_bdt_check.ps1" -Base $Base -CompanyKey $CompanyKey -ServerId $ServerId -Username $Username -OutPath $OutPath
