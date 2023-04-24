# IWA-Mobile

An insecure React Native mobile application for use in Micro Focus demonstrations. It includes some examples of bad 
and insecure code - which can be found using static and mobile security testing tools such 
as those provided by [Micro Focus Fortify](https://www.microfocus.com/en-us/cyberres/application-security).

The application is intended to provide the functionality of a typical "online pharmacy", including purchasing Products (medication)
and requesting Services (prescriptions, health checks etc). 

*Please note: the application should not be used in a production environment!*

Running the app
---------------

This application requires the
[IWAPharmacyDirect](https://github.com/fortify-presales/IWAPharmacyDirect) API backend to be running. For example to 
start up a development server run `.\gradlew bootRun` in this project.

Then, to start react-native "metro server" run:

```
npm run start
```

and then select `a` to start an android emulator and run the app.

You will also need to allow the emulator access to the backend API, by running:

``
npm run android-dev
``

Then press `r` in the "metro server" window to "reload" the application.
