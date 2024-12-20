import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveToSecureStore, deleteFromSecureStore } from '../utils/SecureStoreUtils';

const TOKEN_KEY = 'userToken';

const LoginRegisterScreen = () => {
  const navigation = useNavigation();
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = async () => {
    if (email && password) {
      const token = 'mockAuthToken123'; // Replace with real token
      await saveToSecureStore(TOKEN_KEY, token);
      console.log('Logging in with token:', token);
      navigation.navigate('Home'); // Navigate to your main screen (e.g., Dashboard)
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Registering with:', email, password);
    // Add your registration logic here
  };

  const handleLogout = async () => {
    await deleteFromSecureStore(TOKEN_KEY);
    console.log('User logged out');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={isRegister ? handleRegister : handleLogin}
      >
        <Text style={styles.buttonText}>
          {isRegister ? 'Register' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleText}>
          {isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
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
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginRegisterScreen;
