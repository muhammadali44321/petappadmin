import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

export default function PictureButton({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Take picture from gallery</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 100,
    backgroundColor: '#B1E523',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
});
