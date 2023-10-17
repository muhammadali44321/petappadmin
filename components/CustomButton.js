import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({onPress}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>Submit post</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: 55,
    backgroundColor: '#B1E523',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
  },
});
