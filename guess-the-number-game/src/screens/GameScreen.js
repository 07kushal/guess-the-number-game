/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Card from '../components/Card';
import { Colors } from '@colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
const { height, width } = Dimensions.get('window');
const generateRandomBetween = (min, max, excluded) => {
  min = Math.ceil(min);
  // console.log('min', min);
  max = Math.floor(max);
  // console.log('max', max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  // console.log('Math.random() * (max - min)', Math.random() * (max - min));
  // console.log('rndNum', rndNum);
  if (rndNum === excluded) {
    return generateRandomBetween(min, max, excluded);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRounds) => {
  return (
    <View style={styles.listItem} key={value}>
      <BodyText># {numOfRounds}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};

const GameScreen = (props) => {
  let initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [deviceOrientation, setDeviceOrientation] = useState(
    Dimensions.get('window').width < Dimensions.get('window').height
      ? 'portrait'
      : 'landscape'
  );
  useEffect(() => {
    const deviceOrientation = () => {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        setDeviceOrientation('portrait');
      } else {
        setDeviceOrientation('landscape');
      }
    };
    Dimensions.addEventListener('change', deviceOrientation);
    return () => {
      //cleanup work
      Dimensions.removeEventListener('change', deviceOrientation);
    };
  });
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'grater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPassGuesses) => [nextNumber, ...curPassGuesses]);
  };
  if (deviceOrientation === 'landscape') {
    return (
      <SafeAreaView
        style={[
          styles.screen,
          {
            flexDirection: 'row'
          }
        ]}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TitleText>Opponent's Guess</TitleText>
          <NumberContainer>{currentGuess}</NumberContainer>
          <Card style={styles.buttonContainer}>
            <MainButton
              style={styles.button}
              onPress={nextGuessHandler.bind(this, 'lower')}>
              {'LOWER'}
            </MainButton>
            <MainButton
              style={styles.button}
              onPress={nextGuessHandler.bind(this, 'grater')}>
              {'GRATER'}
            </MainButton>
          </Card>
        </View>
        <View style={{ flex: 0.5 }}>
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
              {pastGuesses.map((guess, index) =>
                renderListItem(guess, pastGuesses.length - index)
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton
            style={styles.button}
            onPress={nextGuessHandler.bind(this, 'lower')}>
            {'LOWER'}
          </MainButton>
          <MainButton
            style={styles.button}
            onPress={nextGuessHandler.bind(this, 'grater')}>
            {'GRATER'}
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    // width: 400,
    // maxWidth: '90%',
    width: '95%',
    minWidth: 300,
    maxWidth: '95%'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listContainer: {
    flex: 1,
    width: width > 350 ? '80%' : '90%'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  button: {
    backgroundColor: Colors.primary
  }
});

export default GameScreen;
