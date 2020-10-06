/* eslint-disable comma-dangle */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@colors';

const NumberContainer = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    <Text style={styles.number}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15
  },
  number: {
    color: Colors.accent,
    fontSize: 20,
    paddingVertical: 15
  }
});

export default NumberContainer;
