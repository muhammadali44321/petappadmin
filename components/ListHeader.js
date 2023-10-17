import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function ListHeader({heading}) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={handleBackPress}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.heading2}>posts</Text>
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
  heading2: {
    fontSize: 18,
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
  },
});
