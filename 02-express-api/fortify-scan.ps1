
$AppName = (Split-Path -Path (Get-Location) -Leaf)
$AppVersion = "1.0"
<#
# $ScanSwitches = @"
-Dcom.fortify.sca.Phase0HigherOrder.Languages=javascript,typescript
-Dcom.fortify.sca.EnableDOMModeling=true
-Dcom.fortify.sca.follow.imports=true
-Dcom.fortify.sca.exclude.unimported.node.modules=true"
#>
$ScanSwitches = ""

Write-Host Running translation...
& sourceanalyzer '-Dcom.fortify.sca.ProjectRoot=.fortify' $ScanSwitches -b "$AppName" -verbose `
-exclude ".\config" ".\src" -exclude ".\node_modules"

Write-Host Running scan...
& sourceanalyzer '-Dcom.fortify.sca.ProjectRoot=.fortify' $ScanSwitches -b "$AppName" -verbose `
   -build-project "$AppName" -build-version "$AppVersion" -build-label "SNAPSHOT" -scan `
   -f "$($AppName).fpr"

Write-Host Generating PDF report...
& ReportGenerator '-Dcom.fortify.sca.ProjectRoot=.fortify' -user "Demo User" -format pdf -f "$($AppName).pdf" -source "$($AppName).fpr"

Write-Host Done.
