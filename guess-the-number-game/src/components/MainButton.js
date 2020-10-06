/* eslint-disable comma-dangle */
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@colors';
import { Fonts } from '@fonts';

const MainButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: { color: 'white', ...Fonts.regular(18) }
});

export default MainButton;
