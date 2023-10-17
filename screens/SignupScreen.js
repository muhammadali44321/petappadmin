import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const {register, googleLogin} = useContext(AuthContext);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '', // New field
      lastName: '', // New field
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async values => {
      await register(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
      );
      //  navigation.navigate('LoginScreen');
    },
  });
  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.log('Error signing up with Google:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an admin account</Text>
      <FormInput
        labelValue={formik.values.firstName}
        onChangeText={formik.handleChange('firstName')}
        placeholderText="First Name"
        iconType="user"
        autoCapitalize="words"
        autoCorrect={false}
      />
      {formik.errors.firstName && (
        <Text style={styles.errorText}>{formik.errors.firstName}</Text>
      )}

      {/* New Last Name Input */}
      <FormInput
        labelValue={formik.values.lastName}
        onChangeText={formik.handleChange('lastName')}
        placeholderText="Last Name"
        iconType="user"
        autoCapitalize="words"
        autoCorrect={false}
      />
      {formik.errors.lastName && (
        <Text style={styles.errorText}>{formik.errors.lastName}</Text>
      )}
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
      <FormInput
        labelValue={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />
      {formik.errors.confirmPassword && (
        <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
      )}
      <FormButton
        buttonTitle="Sign Up"
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
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
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});

export default SignupScreen;
