import 'package:flutter/material.dart';

class MyPwdWidget extends StatefulWidget {
  const MyPwdWidget(this.onPwdChanged1, {
    Key? key,
    required this.onPwdChanged2
  }) : super(key: key);

  final ValueChanged<String> onPwdChanged1;
  final ValueChanged<String> onPwdChanged2;

  @override
  State<MyPwdWidget> createState() => _MyPwdWidgetState();
}

class _MyPwdWidgetState extends State<MyPwdWidget> {
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      keyboardType: TextInputType.text,
      /* Constant value 'true' clearly indicates private data */
      obscureText: true,
      onChanged: (text) { widget.onPwdChanged1(text); widget.onPwdChanged2(text); },
      decoration: InputDecoration(
          hintText: "Enter password"
      ),
    );
  }
}