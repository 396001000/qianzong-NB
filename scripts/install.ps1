[CmdletBinding()]
param(
  [string]$CodexHome = $env:CODEX_HOME,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($CodexHome)) {
  $CodexHome = Join-Path $HOME '.codex'
}

$RepoRoot = Split-Path -Parent $PSScriptRoot
$SourceSkills = Join-Path $RepoRoot 'skills'
$DestSkills = Join-Path $CodexHome 'skills'
$BackupRoot = Join-Path $CodexHome 'skills-backup'
$Stamp = Get-Date -Format 'yyyyMMddHHmmss'

if (-not (Test-Path -LiteralPath $SourceSkills)) {
  throw "Missing source skills directory: $SourceSkills"
}

New-Item -ItemType Directory -Path $DestSkills -Force | Out-Null

$installed = 0
$skipped = 0
$backedUp = 0

Get-ChildItem -LiteralPath $SourceSkills -Directory -Force | ForEach-Object {
  $sourceDir = $_.FullName
  $destDir = Join-Path $DestSkills $_.Name

  if (Test-Path -LiteralPath $destDir) {
    if (-not $Force) {
      Write-Host "Skip existing skill: $($_.Name). Use -Force to replace with backup."
      $script:skipped += 1
      return
    }

    New-Item -ItemType Directory -Path $BackupRoot -Force | Out-Null
    $backupDir = Join-Path $BackupRoot "$($_.Name)-$Stamp"
    Move-Item -LiteralPath $destDir -Destination $backupDir
    $script:backedUp += 1
  }

  Copy-Item -LiteralPath $sourceDir -Destination $DestSkills -Recurse -Force
  $script:installed += 1
}

[pscustomobject]@{
  codexHome = $CodexHome
  destination = $DestSkills
  installed = $installed
  skipped = $skipped
  backedUp = $backedUp
  force = [bool]$Force
  restartRequired = $true
} | ConvertTo-Json -Depth 3
