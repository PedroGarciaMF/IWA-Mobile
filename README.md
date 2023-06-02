[![Fortify Security Scan](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/fortify.yml/badge.svg)](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/fortify.yml)

# IWA-Mobile

#### Table of Contents

* [Overview](#overview)
* [Forking the Repository](#forking-the-repository)
* [Setting up the Development Environment](#setting-up-the-development-environment)
* [Running the Application](#running-the-application)

## Overview

_IWA-Mobile_ is an insecure [React Native](https://reactnative.dev/) mobile application for use in application security demonstrations. 
It includes some examples of bad  and insecure code - which can be found using static and mobile security testing tools such 
as those provided by [Fortify by OpenText](https://www.microfocus.com/en-us/cyberres/application-security).

The application is intended to provide the functionality of a typical "online pharmacy", including purchasing Products (medication)
and requesting Services (prescriptions, health checks etc). 

*Please note: the application should not be used in a production environment!*

## Forking the Repository

In order to execute example scenarios for yourself, it is recommended that you "fork" a copy of this repository into
your own GitHub account. The process of "forking" is described in detail in the [GitHub documentation](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) 
- you can start the process by clicking on the "Fork" button at the top right.


## Setting up the Development Environment

_Note: for this application to run successfully it requires the backend REST API of the related web application
[IWA-Java](https://github.com/fortify/IWA-Java) to be running. Follow the instructions for setting up
the environment for this application and then make sure it is running using `mvn spring-boot:run`._

Go to the React Native setup documentation [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
and follow the instructions under **React Native CLI Quickstart** for your preferred operating
system and target device/emulator.

Clone the repository (preferably your fork from above) and then install all the required third-party packages using:

```aidl
npm install
```

Running the Application
-----------------------

**Android**

Follow the instructions from [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
on how to start up the Metro Bundler and running the application. For example in one terminal, run

```aidl
npx react-native start
```

then press `a` for *run on android*, alternatively in another terminal (assuming you are using an Android emulator):

```aidl
npx react-native run-android
```

If your environment is configured correctly, the Android emulator should startup with the application running.
Finally, to create a proxy from the IWA API running locally to the application running on the emulator:

```aidl
adb reverse tcp:8888 tcp:8888
```

Press `r` in the **react-native** console to reload the appand the application should now be ready to use.

**iOS**

TBD

Building and Installing the Application Binary
----------------------------------------------

**Android**

To build the Android `.apk` run the following:

```
cd android
.\gradlew assembleRelease
```

Attach your android device via USB and run:

```
adb devices
```

to list your attached device id. Then install it using a command similar
to the following:

```
adb -S YOUR_DEVICE_ID install "FULL_PATH_TO\android\app\build\outputs\apk\release\app-release.apk"
```

**iOS**

TBD
