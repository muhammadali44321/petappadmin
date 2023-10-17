import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignupScreen"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
