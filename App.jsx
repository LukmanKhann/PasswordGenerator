import * as Yup from "yup";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from "react";
import { style } from "@mui/system";
import { Formik } from "formik";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const passwordShema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});
const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassowrd = passwordLength => {
    let characterList = '';

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const speacialChars = '!@#$%^&*()_-+=<>?/[]{}|';
    const digitsChars = '0123456789';

    if (upperCase) {
      characterList += uppercaseChars;
    }  if (lowerCase) {
      characterList += lowercaseChars;
    }  if (numbers) {
      characterList += digitsChars;
    }  if (symbols) {
      characterList += speacialChars;
    }
    const passwordResult = createPassoword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassoword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordShema}
            onSubmit={values => {
              console.log('values', values);
              generatePassowrd(Number(values.passwordLength));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputWrapper}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputWrapper}>
                    Include Uppercase Letters
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#0020FF"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputWrapper}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#FFD900"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputWrapper}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#11F2E6"
                  />
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text >Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          {isPasswordGenerated ? (
          <View style={[styles.card, styles.elevatedCard]}>
            <Text style={styles.subTitle}>Result :</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable style={styles.generatePassowrd}>Password :  {password}</Text>
          </View>
        ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingHorizontal: 40,
  },
  appContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  inputWrapper: {
    width: 400,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 8,
  },
  inputStyle: {
    height: 40,
    backgroundColor: 'rgb(97, 158, 158)',
    width: 100,
    borderRadius: 6,
    marginTop: 4,
  },
  inputColumn: {
    flex: 1,
    // flexDirection : 'row',
    // justifyContent : 'start',
    marginHorizontal: 10,
    marginTop: 15,
  },
  formAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 23,
  },
  primaryBtn: {
    backgroundColor: '#9AC471',
    height: 34,
    borderRadius: 4,
    padding: 7,
  },
  primaryBtnTxt: {
    fontSize: 12,
  },
  secondaryBtn: {
    backgroundColor: '#E08C5E',
    height: 34,
    width : 100,
    borderRadius: 4,
    padding: 7,
    alignItems : 'center'
  },
  card: {
    height: 100,
    width:400,
    backgroundColor: '#80C195',
    flex : 1,
   flexDirection : 'column',
   justifyContent  : "center",
   alignItems : 'center',
   borderRadius : 7
  },
  subTitle : {
    color : 'black',
    fontSize : 16,
  fontWeight : '600',
  },
  description : {
    color : 'black',
    fontSize : 13,
    marginVertical : 7
  },
  generatePassowrd : {
    color : 'black',
    fontWeight : 'bold'
  },
  errorText : {
    fontSize : 10,
    color : 'red'
  }
 
});
