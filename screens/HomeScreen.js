import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
const dummyUserData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    image: require('../assets/UserDummy.png'), // Replace with actual image paths
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    image: require('../assets/UserDummy.png'), // Replace with actual image paths
  },
  // Add more dummy user data as needed
];
export default function HomeScreen({navigation}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const List = [];
        await firestore()
          .collection('Users')
          .get()
          .then(querySnapshot => {
            console.log('Total Petspost', querySnapshot.size);
            querySnapshot.forEach(doc => {
              const {email, fname, lname, userImage} = doc.data();
              List.push({
                id: doc.id,
                email: email,
                fname: fname,
                lname: lname,
                userImage: userImage,
              });
            });
          });
        console.log('List', List);
        setPosts(List);
        if (loading) {
          setLoading(false);
        }
        console.log('posts', List);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
  }, []);
  const handleOnPress = (screenName, item) => {
    navigation.navigate(screenName, {selectedItem: item});
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => handleOnPress('UserPosts', item)}>
      <Image
        source={
          item.userImage == null
            ? require('../assets/UserDummy.png')
            : {uri: item.userImage}
        }
        style={styles.userImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fname}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <Header heading="Animal Land Admin" />
      <View style={{marginBottom: 180}}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    marginVertical: 10,
    backgroundColor: '#E2FC9B',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 40,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderRadius: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
});
