import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'MyPwdWidget.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'Fortify Flutter pwd demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: MyHomePage(),
      );
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  bool _isVisible = false;

  final textController = TextEditingController();

  @override
  void initState() {
    super.initState();

    // Start listening to changes.
    textController.addListener(_printLatestValueOf2ndField);
  }

  @override
  void dispose() {
    textController.dispose();
    super.dispose();
  }

  void updateStatus() {
    setState(() {
      _isVisible = !_isVisible;
    });
  }

  void _printLatestValueOf2ndField() {
    /* Vulnerability: private info leak. */
    print('The second password is: ${textController.text}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Fortify Flutter Password demo"),
      ),
      body: Center(
        child: Form(
          child: Column(
            children: [
              TextFormField(
                keyboardType: TextInputType.text,
                /* Constant value 'true' clearly indicates private data */
                obscureText: true,  // <--- understanding this is the key issue. See scoping in Confluence.
                onChanged: (text) {
                   /* Vulnerability: private information leak.
                     Note: there are multiple events in Flutter, and many
                     different logging options, so will require quite a few
                     rules. From SCA perspective, same pattern.
                    */
                   print('The first password is: $text');
                },
                decoration: InputDecoration(
                    hintText: "Enter password"
                ),
              ),
              TextFormField(
                keyboardType: TextInputType.text,
                /* Common pattern: you may show the password in clear, so it's
                not constant value 'true', but still the fact that it's there
                and not 'false', is indication of private data. */
                obscureText: _isVisible ? false : true,
                /* Here, we work with a controller rather than catching the event directly. */
                controller: textController,
                decoration: InputDecoration(
                  hintText: "Enter password",
                  suffixIcon: IconButton(
                    onPressed: () => updateStatus(),
                    icon: Icon(_isVisible ? Icons.visibility : Icons.visibility_off),
                  ),
                ),
              ),
              /* Vulnerability: private information leak. */
              MyPwdWidget((String value) { print('The third password is (1/2): $value'); },
                /* Vulnerability: private information leak. */
                onPwdChanged2: (String value) { print('The third password is (2/2): $value'); },),
            ]
          )
        )
      ),
    );
  }
}

