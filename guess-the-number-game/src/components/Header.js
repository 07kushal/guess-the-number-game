/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import TitleText from './TitleText';
import { Colors } from '@colors';
const { height, width } = Dimensions.get('window');

const Header = (props) => {
  const [deviceOrientation, setDeviceOrientation] = useState(
    Dimensions.get('window').width < Dimensions.get('window').height
      ? 'portrait'
      : 'landscape'
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get('window').width < Dimensions.get('window').height
      ? Dimensions.get('window').height
      : Dimensions.get('window').width
  );

  useEffect(() => {
    const setDeviceHeightAsOrientation = () => {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        setDeviceHeight(Dimensions.get('window').height);
      } else {
        setDeviceHeight(Dimensions.get('window').width);
      }
    };
    Dimensions.addEventListener('change', setDeviceHeightAsOrientation);
    return () => {
      //cleanup work
      Dimensions.removeEventListener('change', setDeviceHeightAsOrientation);
    };
  });

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
  console.log(deviceHeight);
  if (deviceOrientation === 'landscape') {
    return (
      <View style={[styles.header, { height: 60, paddingTop: 10 }]}>
        <TitleText>{props.title}</TitleText>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.header,
          {
            height: deviceHeight >= 812 ? 90 : 60,
            paddingTop: deviceHeight >= 812 ? 36 : 10
          }
        ]}>
        <TitleText>{props.title}</TitleText>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height >= 812 ? 90 : 60,
    paddingTop: height >= 812 ? 36 : 10,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Header;
