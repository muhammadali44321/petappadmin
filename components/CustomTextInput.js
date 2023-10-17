import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

export default function CustomTextInput({
  placeholder,
  value,
  onChangeText,
  type,
  height,
}) {
  return (
    <View style={[styles.input, {height}]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        keyboardType={type ? type : 'default'}
        onChangeText={txt => {
          onChangeText(txt);
        }}
        style={styles.textInput}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '90%',

    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  textInput: {
    flex: 1, // Take up available space inside the View
    textAlignVertical: 'top', // Align text to the top for multiline input
  },
});
