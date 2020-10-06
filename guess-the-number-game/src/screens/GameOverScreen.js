/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Colors } from '@colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import { Fonts } from '@fonts';
const { height, width } = Dimensions.get('window');

const GameOverScreen = (props) => {
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
  if (deviceOrientation === 'landscape') {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View
              style={[
                styles.imageContainer,
                {
                  height: 320,
                  width: 320,
                  borderRadius: 320 / 2
                }
              ]}>
              <Image
                style={styles.image}
                resizeMode={'cover'}
                source={require('../../assets/success.png')}
              />
            </View>
            <View style={styles.resultContainer}>
              <BodyText style={styles.resultText}>
                {'Your phone needed '}
                <Text style={styles.highlight}>{props.roundsNumber}</Text>
                {' rounds to guess the number '}
                <Text style={styles.highlight}>{props.userNumber}</Text>
              </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>{'NEW GAME'}</MainButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View
              style={[
                styles.imageContainer,
                {
                  height: height <= 640 ? 250 : 320,
                  width: height <= 640 ? 250 : 320,
                  borderRadius: height <= 640 ? 250 : 320 / 2
                }
              ]}>
              <Image
                style={styles.image}
                resizeMode={'cover'}
                source={require('../../assets/success.png')}
              />
            </View>
            <View style={styles.resultContainer}>
              <BodyText style={styles.resultText}>
                {'Your phone needed '}
                <Text style={styles.highlight}>{props.roundsNumber}</Text>
                {' rounds to guess the number '}
                <Text style={styles.highlight}>{props.userNumber}</Text>
              </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>{'NEW GAME'}</MainButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    height: width * 0.7,
    width: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  resultContainer: { marginHorizontal: 30, marginVertical: 15 },
  image: {
    height: '100%',
    width: '100%'
  },
  resultText: {
    ...Fonts.regular(20),
    textAlign: 'center'
  },
  highlight: {
    color: Colors.primary,
    ...Fonts.bold(20)
  }
});

export default GameOverScreen;
