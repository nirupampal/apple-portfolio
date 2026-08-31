$ErrorActionPreference = "Stop"

$envFile = Join-Path $PSScriptRoot "..\.env"
$workerDirectory = Join-Path $PSScriptRoot "..\cloudflare\portfolio-ai"

if (-not (Test-Path -LiteralPath $envFile)) {
  throw ".env was not found."
}

$line = Get-Content -LiteralPath $envFile |
  Where-Object { $_ -match '^\s*GEMINI_API_KEY\s*=' } |
  Select-Object -First 1

if (-not $line) {
  throw "GEMINI_API_KEY is missing from .env."
}

$key = ($line -split '=', 2)[1].Trim().Trim('"').Trim("'")
if ($key.Length -lt 20) {
  throw "GEMINI_API_KEY does not look valid."
}

Push-Location $workerDirectory
try {
  $key | npx wrangler secret put GEMINI_API_KEY
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

  npm run deploy
  exit $LASTEXITCODE
} finally {
  Pop-Location
}
