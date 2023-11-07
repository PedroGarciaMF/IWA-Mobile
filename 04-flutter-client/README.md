# Flutter

### Getting started

- First, create a regular Android Studio development set up.
    - Install Android Studio (accept all defaults).
    - Create a simple dummy app.
    - Create a virtual device. (I initially used the API 33 image, but it gave lots of screen flicker. I then created a Pixel 5 API 30 device, and that worked fine.)
    - Ensure you can run the app on the virtual device.
    - In Android Studio, Tools -> SDK Manager, tab "SDK Tools", install Command-line Tools.
    - Optional: in Android Studio, install the Flutter plugin. This will also install the Dart plugin.
- Install Flutter:
    - Download and unpack Flutter from https://docs.flutter.dev/get-started/install, add flutter/bin to the PATH.
    - Run "flutter doctor --android-licenses" and accept the licenses.
    - Run "flutter doctor" again. Should be all green.
    - "flutter device" should show the virtual Android device as well as browser devices.
- In "pwdleak", issue "flutter run". The application should
  fire up. Enter a password. It will be logged to the console.
    - Note: the "pwdleak" example can arbitrarily run in a browser or in an emulator. That's not true for the sqlissues example. This requires the SQLite database which isn't present in a browser, so it won't run.
    - Note: apps can also be run from Android Studio.






