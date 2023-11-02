Remove-Item -Force -Recurse "$env:APPDATA\Temp\react-native-*" -ErrorAction SilentlyContinue
cd android
.\gradlew clean
cd ..
Remove-Item -Force -Recurse "node_modules" -ErrorAction SilentlyContinue
npm cache clean --force
#npm install
#npm dev -- --reset-cache
