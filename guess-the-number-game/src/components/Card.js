import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 5,
    padding: 20,
    borderRadius: 10,
  },

  title: { textAlign: 'center', fontSize: 20, marginTop: 20 },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default Card;
