import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const Input = (props) => {
  return (
    <View style={{ ...styles.inputContainer, ...props.style }}>
      <TextInput {...props} style={{ ...styles.input, ...props.inputStyle }} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    height: 50,
  },
  input: {
    width: '100%',
    paddingRight: 5,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default Input;
