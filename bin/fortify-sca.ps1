#
# Example script to perform Fortify SCA static analysis
#

$AppName = "IWA-Mobile"
$AppVersion = "main"
$ScanSwitches = ""

# Run the translation and scan

Write-Host Running translation...
& sourceanalyzer '-Dcom.fortify.sca.ProjectRoot=.fortify' $ScanSwitches -b "$AppName" -verbose `
-jdk 11 -java-build-dir "android/app/build/intermediates/javac/debug/classes/com/iwamobile/**.*" `
-cp "android/app/build/intermediates/javac/debug/classes:lib/*.jar" `
-exclude ".\bin" -exclude ".\__tests__" -exclude ".\.bundle" -exclude ".\node_modules" `
"android/app/src/main/java/com/iwamobile/**/*" `
"android/app/src/debug/java/com/iwamobile/**/*" `
"app/**/*"

Write-Host Running scan...
& sourceanalyzer '-Dcom.fortify.sca.ProjectRoot=.fortify' $ScanSwitches -b "$AppName" -verbose `
   -java-build-dir "android/app/build/intermediates/javac/debug/classes/com/iwamobile/**.*" `
   -build-project "$AppName" -build-version "$AppVersion" -build-label "SNAPSHOT" -scan `
   -f "$($AppName).fpr"

Write-Host Generating PDF report...
& ReportGenerator '-Dcom.fortify.sca.ProjectRoot=.fortify' -user "Demo User" -format pdf -f "$($AppName).pdf" -source "$($AppName).fpr"

Write-Host Done.
