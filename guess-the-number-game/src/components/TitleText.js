/* eslint-disable comma-dangle */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Fonts } from '@fonts';

const TitleText = (props) => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  title: {
    ...Fonts.bold(18)
  }
});

export default TitleText;
