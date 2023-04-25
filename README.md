[![Fortify Security Scan](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/fortify.yml/badge.svg)](https://github.com/fortify-presales/IWA-Mobile/actions/workflows/fortify.yml)

# IWA-Mobile

#### Table of Contents

* [Overview](#overview)
* [Forking the Repository](#forking-the-repository)
* [Setting up the Development Environment](#setting-up-the-development-environment)
* [Running the Application](#running-the-application)

## Overview

_IWA-Mobile_ is an insecure [React Native](https://reactnative.dev/) mobile application for use in Micro Focus demonstrations. It includes some examples of bad 
and insecure code - which can be found using static and mobile security testing tools such 
as those provided by [Micro Focus Fortify](https://www.microfocus.com/en-us/cyberres/application-security).

The application is intended to provide the functionality of a typical "online pharmacy", including purchasing Products (medication)
and requesting Services (prescriptions, health checks etc). 

*Please note: the application should not be used in a production environment!*

## Forking the Repository

In order to execute example scenarios for yourself, it is recommended that you "fork" a copy of this repository into
your own GitHub account. The process of "forking" is described in detail in the [GitHub documentation](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) 
- you can start the process by clicking on the "Fork" button at the top right.


## Setting up the Development Environment

Go to the React Native setup documentation [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
and follow the instructions under **React Native CLI Quickstart** for your preferred operating
system and target device/emulator.

Clone the repository (preferably your fork from above) and then install all of the required packages
using:

```aidl
npm install
```

This application requires the backend API from
[IWAPharmacyDirect](https://github.com/fortify-presales/IWAPharmacyDirect). Follow the instructions for setting up
the environment for this application and then ensure it is running, for example run `.\gradlew bootRun` in this 
applications home directory.

Running the Application
-----------------------

Follow the instructions from [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
on how to start up the Metro Bundler and running the application. For example in one terminal, run

```aidl
npx react-native start
```

and then in another terminal (assuming you are using an Android emulator):

```aidl
npx react-native run-android
```

Finally, to create a proxy from the IWA API running locally to the application running on the emulator:

```aidl
adb reverse tcp:8888 tcp:8888
```

The application should now be ready to use.
