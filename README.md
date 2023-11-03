[![Fortify Security Scan](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/express-api.yml/badge.svg)](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/express-api.yml)
[![Fortify Security Scan](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/react-native-client.yml/badge.svg)](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/react-native-client.yml)

# IWA-Mobile

#### Table of Contents

* [Overview](#overview)
* [Forking the Repository](#forking-the-repository)
* [Setting up the Development Environment](#setting-up-the-development-environment)
* [Running the Application](#running-the-application)

## Overview

_IWA-Mobile_ is an insecure [React Native](https://reactnative.dev/) mobile application with [ExpressJS](https://expressjs.com/) API and 
[MongoDB](https://www.mongodb.com/) database backend. 
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

For this application to run you will require the following to be installed:

- [MongoDB](https://www.mongodb.com/) Community Edition
- [NodeJS](https://nodejs.org/) LTS version
- [React Native](https://reactnative.dev/docs/environment-setup) CLI for your preferred operating system and target device/simulator.

Clone the repository (preferably your fork from above) and then install all the required third-party packages using:

Running the Application
-----------------------

**Populate MongoDB**

```aidl
cd 01-mongodb
npm install
npm run dev
```

**Start Express API**

```aidl
cd 02-express-api
npm install
npm run dev
```

The Express API should then be accessible at [http://localhost:3000](http://localhost:3000)

**React Native Client - Android**

Please read the instructions from [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
on how to start up the Metro Bundler and running the application first. Then in one terminal, run

```aidl
cd 03-react-native-client
npm install
npm run dev
```

then press `a` for *run on android*.

If your environment is configured correctly, the Android emulator should startup with the application running.
Finally, to create a proxy from the Express API running locally to the application running on the emulator:

```aidl
adb reverse tcp:3000 tcp:3000
```

Press `r` in the **react-native** console to reload the app and the application should now be ready to use.

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
