[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [string]$Message = "Auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
  [switch]$Push
)

$ErrorActionPreference = "Stop"

$gitCommand = Get-Command git -ErrorAction SilentlyContinue
$gitPath = if ($gitCommand) {
  $gitCommand.Source
} else {
  "C:\Program Files\Git\cmd\git.exe"
}

if (-not (Test-Path $gitPath)) {
  throw "Git was not found. Install Git for Windows or add git to PATH."
}

$repoRoot = (Resolve-Path $PSScriptRoot).Path
$gitRoot = & $gitPath -C $repoRoot rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0) {
  throw "This script must be run from inside a Git repository."
}

if ([System.IO.Path]::GetFullPath($gitRoot) -ne $repoRoot) {
  throw "The script must be placed in the Git repository root."
}

if ([string]::IsNullOrWhiteSpace($Message)) {
  throw "Commit message cannot be empty."
}

if ($PSCmdlet.ShouldProcess($repoRoot, "Stage all changes and create a commit")) {
  & $gitPath -C $repoRoot add --all
  if ($LASTEXITCODE -ne 0) {
    throw "Could not stage project changes."
  }

  & $gitPath -C $repoRoot diff --cached --quiet
  $diffExitCode = $LASTEXITCODE

  if ($diffExitCode -eq 0) {
    Write-Host "No staged or unstaged changes to commit."
  } elseif ($diffExitCode -eq 1) {
    & $gitPath -C $repoRoot commit -m $Message
    if ($LASTEXITCODE -ne 0) {
      throw "Git could not create the commit."
    }
  } else {
    throw "Could not check staged changes (git exit code $diffExitCode)."
  }
}

if ($Push -and $PSCmdlet.ShouldProcess($repoRoot, "Push the current branch to its upstream")) {
  & $gitPath -C $repoRoot push
  if ($LASTEXITCODE -ne 0) {
    throw "Git could not push. Authenticate with GitHub and retry."
  }
}
