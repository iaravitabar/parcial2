import React, { useState } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from 'react-native';

const AddEditDestination = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [favorites, setFavorites] = useState('');

  const handleAddEditDestination = async () => {
    if (!name || !description || !difficulty || !favorites) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    const newDestination = {
      name,
      description,
      Difficulty: difficulty,
    favorites,
    };

    try {
      const response = await fetch('http://localhost:8000/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      });

      if (response.ok) {
        Alert.alert('Éxito', '¡destino agregado exitosamente!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Hubo un problema al agregar el destino.');
      }
    } catch (error) {
      console.error('Error al agregar el destino:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Destino</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del destino"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Dificultad"
        value={difficulty}
        onChangeText={setDifficulty}
      />
      <TextInput
        style={styles.input}
        placeholder="Favoritos"
        value={favorites}
        onChangeText={setFavorites}
      />


      <TouchableOpacity style={styles.button} onPress={handleAddEditDestination}>
        <Text style={styles.buttonText}>Agregar Destination</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEditDestination;