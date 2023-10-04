#
# Example script to perform Fortify SCA static analysis
#

# Import some supporting functions
Import-Module $PSScriptRoot\modules\FortifyFunctions.psm1

# Import local environment specific settings
$EnvSettings = $(ConvertFrom-StringData -StringData (Get-Content ".\.env" | Where-Object {-not ($_.StartsWith('#'))} | Out-String))
$AppName = $EnvSettings['SSC_APP_NAME']
$AppVersion = $EnvSettings['SSC_APP_VER_NAME']
$SSCUrl = $EnvSettings['SSC_URL']
$SSCAuthToken = $EnvSettings['SSC_AUTH_TOKEN'] # CIToken
$ScanSwitches = ""

# Test we have Fortify installed successfully
Test-Environment
if ([string]::IsNullOrEmpty($AppName)) { throw "Application Name has not been set" }

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

#Write-Host Running translation...
##& sourceanalyzer '-Dcom.fortify.sca.ProjectRoot=.fortify' $JVMArgs $ScanSwitches -b "$AppName" `
#    -jdk 11 -java-build-dir "target/classes" -cp $ClassPath -debug -verbose `
#    -exclude ".\src\main\resources\static\js\lib" -exclude ".\src\main\resources\static\css\lib" -exclude ".\node_modules" `
#    "src/main/java/**/*" "src/main/resources/**/*" "Dockerfile*"

#Write-Host Running scan...
#& sourceanalyzer '-Dcom.fortify.sca.ProjectRoot=.fortify' $JVMArgs $ScanSwitches -b "$AppName" `
#    -cp $ClassPath  -java-build-dir "target/classes" -debug -verbose -rules etc/sca-custom-rules.xml `
#    -scan-precision $PrecisionLevel -build-project "$AppName" -build-version "$AppVersion" -build-label "SNAPSHOT" -scan -f "$($AppName).fpr"

Write-Host Generating PDF report...
& ReportGenerator '-Dcom.fortify.sca.ProjectRoot=.fortify' -user "Demo User" -format pdf -f "$($AppName).pdf" -source "$($AppName).fpr"

if (![string]::IsNullOrEmpty($SSCUrl)) {
    Write-Host Uploading results to SSC...
    & fortifyclient uploadFPR -file "$($AppName).fpr" -url $SSCUrl -authtoken $SSCAuthToken -application $AppName -applicationVersion $AppVersion
}

Write-Host Done.
