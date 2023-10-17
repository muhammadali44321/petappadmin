import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserPosts from '../screens/UserPosts';
import UserPetList from '../screens/UserPetList';
import UserAccessoryList from '../screens/UserAccessoryList';
import UserFoodList from '../screens/UserFoodList';
import UserVetList from '../screens/UserVetList';
import Account from '../screens/Account';
import PetListForm from '../screens/PetListForm';
import FoodListForm from '../screens/FoodListForm';
import AccessoryListForm from '../screens/AccessoryListForm';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceListForm from '../screens/ServiceListForm';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can customize the icon's appearance here, such as size and color
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#B1E523',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{display: 'flex'}, null],
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{headerShown: false}}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
}

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="MyTabs"
        component={MyTabs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserPosts"
        component={UserPosts}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserPetList"
        component={UserPetList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserVetList"
        component={UserVetList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserFoodList"
        component={UserFoodList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserAccessoryList"
        component={UserAccessoryList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PetListForm"
        component={PetListForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="FoodListForm"
        component={FoodListForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AccessoryListForm"
        component={AccessoryListForm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ServiceListForm"
        component={ServiceListForm}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
