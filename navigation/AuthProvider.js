import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },

        register: async (firstName, lastName, email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('Admin')
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: firstName,
                    lname: lastName,
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                  })
                  .catch(error => {
                    console.log(
                      'Something went wrong with to add user in user firestore: ',
                      error,
                    );
                  });
              })
              .catch(error => {
                console.log('Something went wrong with to sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
