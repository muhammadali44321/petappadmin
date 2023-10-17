import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Headers from '../components/Headers';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export default function Account() {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    await firestore()
      .collection('Admin')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log('ssjjjj', userData);
  return (
    <View style={styles.container}>
      <Headers heading="Admin Profile" />
      {userData ? (
        <>
          <View style={styles.userContainer}>
            <View style={styles.text}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Admin name:
              </Text>
              <Text style={{marginLeft: 7, color: 'black', fontSize: 16}}>
                {userData.fname}
                {userData.lname}
              </Text>
            </View>
            <View style={styles.text}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Admin email:
              </Text>
              <Text style={{marginLeft: 7, color: 'black', fontSize: 16}}>
                {userData.email}
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => logout()}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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
    height: 190,

    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#B1E523',
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
  text: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#B1E523',
    borderRadius: 10,
    marginTop: 40,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
