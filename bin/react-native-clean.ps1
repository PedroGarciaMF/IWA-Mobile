del %appdata%\Temp\react-native-*
cd android
.\gradlew clean
cd ..
del node_modules/
npm cache clean --force
npm install
npm start -- --reset-cache
