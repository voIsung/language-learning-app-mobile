import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import

const ProfileSettings = ({ navigation }) => {
  const [languagePreference, setLanguagePreference] = useState('pl'); // Default: Polish

  const savePreferences = () => {
    Alert.alert('Zapisano', `Preferencje językowe ustawione na: ${languagePreference}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ustawienia konta</Text>

      <Text style={styles.subHeader}>Preferencje językowe</Text>
      <Picker
        selectedValue={languagePreference}
        style={styles.picker}
        onValueChange={(itemValue) => setLanguagePreference(itemValue)}
      >
        <Picker.Item label="Polski" value="pl" />
        <Picker.Item label="Angielski" value="en" />
        <Picker.Item label="Niemiecki" value="de" />
        <Picker.Item label="Francuski" value="fr" />
      </Picker>

      <TouchableOpacity style={styles.saveButton} onPress={savePreferences}>
        <Text style={styles.saveButtonText}>Zapisz preferencje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSettings;
