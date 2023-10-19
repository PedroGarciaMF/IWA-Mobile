
$AppName = "IWA-Mobile"

Write-Host "Removing files..."
Remove-Item -Force -Recurse ".fortify" -ErrorAction SilentlyContinue
Remove-Item "$($AppName)*.fpr" -ErrorAction SilentlyContinue
Remove-Item "$($AppName)*.pdf" -ErrorAction SilentlyContinue
Remove-Item "fod.zip" -ErrorAction SilentlyContinue
Remove-Item "FoDPackage.zip" -ErrorAction SilentlyContinue

Write-Host "Done."
