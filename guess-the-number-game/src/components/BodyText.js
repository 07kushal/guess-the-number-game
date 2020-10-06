/* eslint-disable comma-dangle */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Fonts } from '@fonts';

const BodyText = (props) => (
  <Text style={[styles.body, { ...props.style }]}>{props.children}</Text>
);

const styles = StyleSheet.create({
  body: {
    ...Fonts.regular(12)
  }
});

export default BodyText;
