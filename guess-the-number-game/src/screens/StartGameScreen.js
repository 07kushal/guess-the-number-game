/* eslint-disable comma-dangle */
/* eslint-disable use-isnan */
/* eslint-disable radix */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Input from '../components/Input';
import { Colors } from '@colors';
import { Fonts } from '@fonts';
const { height, width } = Dimensions.get('window');

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    // setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    setEnteredValue(inputText);
  };
  const resetInputHandler = () => {
    Keyboard.dismiss();
    setEnteredValue('');
  };
  const confirmInputHandler = () => {
    const chooseNumber = parseInt(enteredValue);
    if (Number.isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert('Invalid Number', 'Number has to be between 1 and 99', [
        {
          text: 'Okay',
          style: 'destructive',
          onPress: () => {
            return resetInputHandler();
          }
        }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chooseNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summeryContainer}>
        <Text style={styles.chooseNumber}>{'You Selected'}</Text>
        <NumberContainer style={styles.numberContainer}>
          {selectedNumber}
        </NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          {'START GAME'}
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>{'The Game Screen!'}</Text>
            <Card style={styles.container}>
              <Text>{'Select A Number'}</Text>
              <Input
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'numeric'}
                maxLength={2}
                returnKeyType={'done'}
                onChangeText={numberInputHandler}
                value={enteredValue}
                style={styles.inputContainer}
                inputStyle={styles.input}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title={'Reset'}
                    // onPress={() => {}}
                    onPress={() => resetInputHandler()}
                    // onPress={resetInputHandler}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title={'Confirm'}
                    onPress={() => confirmInputHandler()}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    width: height <= 640 ? 300 : 300,
    alignItems: 'center'
    // maxWidth: '80%'
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    ...Fonts.bold(20)
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 15
  },
  button: {
    height: 40,
    width: 120
  },
  inputContainer: {
    borderRadius: 10,
    width: 120,
    marginTop: 10
  },
  input: {},
  chooseNumber: {
    textAlign: 'center',
    fontSize: 20
    // marginTop: 20
  },
  summeryContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  numberContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10
  }
});

export default StartGameScreen;
