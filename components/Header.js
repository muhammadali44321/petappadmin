import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Header({heading}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B1E523',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  icon: {
    marginLeft: 17,
  },
  heading: {
    fontSize: 18,
    marginLeft: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});
