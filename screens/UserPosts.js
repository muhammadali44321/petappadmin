import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ListHeader from '../components/ListHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';

export default function UserPosts({navigation}) {
  const route = useRoute();
  const {selectedItem} = route.params;
  console.log('selectedItem', selectedItem);
  const handleOnPress = (screenName, selectedItem) => {
    navigation.navigate(screenName, {userId: selectedItem.id});
  };
  return (
    <View>
      <ListHeader heading={selectedItem.fname} />
      <TouchableOpacity
        style={styles.main}
        onPress={() => handleOnPress('UserPetList', selectedItem)}>
        <View style={styles.textIcon}>
          <Icon name="pets" size={30} color="black" />
          <Text style={styles.heading}>Pets</Text>
        </View>
        <Text style={styles.desc}>Pet posts</Text>
        {/* <View style={styles.line}></View> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.main}
        onPress={() => handleOnPress('UserFoodList', selectedItem)}>
        <View style={styles.textIcon}>
          <Icons name="bone" size={30} color="black" />
          <Text style={styles.heading}>Food</Text>
        </View>
        <Text style={styles.desc}>Food posts</Text>
        {/* <View style={styles.line}></View> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.main}
        onPress={() => handleOnPress('UserAccessoryList', selectedItem)}>
        <View style={styles.textIcon}>
          <Icon name="shopping-cart" size={30} color="black" />
          <Text style={styles.heading}>Accessory</Text>
        </View>
        <Text style={styles.desc}>Accessory posts</Text>
        {/* <View style={styles.line}></View> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.main}
        onPress={() => handleOnPress('UserVetList', selectedItem)}>
        <View style={styles.textIcon}>
          <Icon name="medical-services" size={30} color="black" />
          <Text style={styles.heading}>Vets</Text>
        </View>
        <Text style={styles.desc}>Vet posts</Text>
        {/* <View style={styles.line}></View> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E2Fc9B',
    height: '50%',
    elevation: 5,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  desc: {
    marginLeft: 55,
    // marginTop: -5,
  },
  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    borderWidth: 5,
    borderColor: '#B1E523',
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  ButtonContainer: {
    width: '35%',
    elevation: 2,
    backgroundColor: '#B1E523',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 30,
    marginBottom: 70,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  ButtonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#B1E523',
    backgroundColor: '#E2FC9B',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: 'black',
    fontWeight: 'bold',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  main: {
    borderColor: '#B1E523',
    borderWidth: 4,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#E2FC9B',
    borderRadius: 15,

    height: 70,
  },
  textIcon: {
    marginTop: 5,
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
  },
  heading: {
    marginLeft: 9,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  line: {
    marginTop: 9,
    height: 2,
    width: '90%',
    backgroundColor: 'black',
    alignSelf: 'center',
  },
});
