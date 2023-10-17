import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useContext} from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import SignupScreen from './SignupScreen';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      login(values.email, values.password);
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={{height: 100, width: 100, marginBottom: 30}}
        source={require('../assets/login.png')}
      />
      <Text style={styles.text}>Animal Land Admin</Text>
      <FormInput
        labelValue={formik.values.email}
        onChangeText={formik.handleChange('email')}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.errors.email && (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      )}
      <FormInput
        labelValue={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      {formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <FormButton
        buttonTitle="Sign In"
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate(SignupScreen)}>
        <Text style={styles.navButtonText}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#E2FC9B',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Lato-Regular',
  },
});

export default LoginScreen;
