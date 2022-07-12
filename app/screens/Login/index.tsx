/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';

import styles from './styles';
import NavigationService from 'app/navigation/NavigationService';
import { useTheme } from 'react-native-paper';
// import { useStore } from 'app/store';

const Login: React.FC = () => {
  const inputStyle = {
    borderWidth: 1,
    borderColor: '#4e4e4e',
    padding: 12,
    marginBottom: 5,
  };
  const { colors } = useTheme();

  const handleSubmit = () => {
    NavigationService.navigate('Home');
  };

  // const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      // eslint-disable-next-line react/destructuring-assignment
      onSubmit={() => NavigationService.navigate('Home')}
      validationSchema={yup.object().shape({
        name: yup.string().required('Please, provide your name!'),
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(4)
          .max(10, 'Password should not excced 10 chars.')
          .required(),
      })}>
      {({ values, handleChange, errors, setFieldTouched, touched }) => (
        <View style={styles.formContainer}>
          <TextInput
            value={values.name}
            style={inputStyle}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
            placeholder="Name"
          />
          {touched.name && errors.name && (
            // eslint-disable-next-line react-native/no-inline-styles
            <Text style={{ fontSize: 12, color: colors.primary }}>
              {errors.name}
            </Text>
          )}
          <TextInput
            value={values.email}
            style={inputStyle}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            placeholder="E-mail"
          />
          {touched.email && errors.email && (
            <Text style={{ fontSize: 12, color: colors.primary }}>
              {errors.email}
            </Text>
          )}
          <TextInput
            value={values.password}
            style={inputStyle}
            onChangeText={handleChange('password')}
            placeholder="Password"
            onBlur={() => setFieldTouched('password')}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={{ fontSize: 12, color: colors.primary }}>
              {errors.password}
            </Text>
          )}
          <Button icon="camera" mode="contained" onPress={handleSubmit}>
            {'Submit'}
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default Login;
