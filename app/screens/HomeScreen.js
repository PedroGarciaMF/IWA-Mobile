
import React, { useState, useRef } from 'react';
import {View, Text, StatusBar, useColorScheme, ScrollView, TextInput, SafeAreaView, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {customStyle, backgroundStyle, isDarkMode} from './../style'

function HomeScreen() {
    /*const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };*/

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    // [DEV] Overlaps with 599C5EB8 source, so renamed in order to have a pure test
    // const myPasswordInput = useRef(null);
    const myDangerousInput = useRef(null);
    const showSearchText = true;

    function processPartialInput(t) {
        setInputText(t);

        /* Vulnerability: privacy leak (source scenario 1) */
        console.log("The keywords the user is entering: "  + t);
    }

    function processSubmittedInput(evt) {
        /* This next line should be part of the dataflow of a privacy leak with source scenario 1,
         * but isn't its actual sink. The sink is in the template that renders outputText. */
        setOutputText("Searching for: " + inputText);

        /* Vulnerability: privacy leak, source scenario 1, dataflow through processPartialInput*/
        console.log("The keywords that the user has entered: "  + inputText);

        /* Vulnerability: privacy leak, source scenario 2A */
        console.log("The keywords that the user has entered: "  + evt.target.value);

        /* Vulnerability: privacy leak, source scenario 2B */
        console.log("The keywords that the user has entered: "  + myDangerousInput.current.value);
    }

  return (
      <SafeAreaView style={backgroundStyle}>
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={backgroundStyle}>
              {/* Because we have secureTextEntry={true}, this should be a source of privacy
                taint (as well as a generic taint source).

                Note that this is a single "conceptual" source, but given how React Native works, there are
                multiple technical sources from the SCA standpoint:
                1. the single parameter of on "onChangeText" callback will be tainted
                2. the "value" of this component will be tainted,
                  2A which can be obtained through the "target" field of the event which will be goven to the "onSubmitEditing" callback.
                  2B which can be obtained using a reference to this component
            */}
              <TextInput
                  secureTextEntry={true}
                  ref={myDangerousInput}
                  style={[
                      customStyle.searchBar,
                      {
                          color: isDarkMode ? Colors.white : Colors.black,
                      },
                  ]}
                  placeholder="Search keyword(s)"
                  onChangeText={(t) => processPartialInput(t)}
                  onSubmitEditing={processSubmittedInput}
              />
              {/* Vulnerability: privacy leak */}
                  <Text style={[
                      customStyle.itemText,
                      {
                          color: isDarkMode ? Colors.white : Colors.black,
                      },
                  ]}>
                      {outputText}
                  </Text>

              <View
                  style={{
                      backgroundColor: isDarkMode ? Colors.black : Colors.white,
                  }}>
                <Image
                  style={{ width: 800, padding: 2 }}
                        source={require('../assets/img/pexels-photo-large-1.jpg')}
                />
              </View>
          </ScrollView>
      </SafeAreaView>
  );
}

export { HomeScreen }
