import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Platform } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/destinations');
            setDestinations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/destinations/${id}`);
            fetchDestinations();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleFavorite = async (id, favorites) => {
        try {
            const updatedFavorites = favorites + 1;
            await axios.put(`http://localhost:8000/destinations/${id}`, { favorites: updatedFavorites });
            setDestinations(prevDestinations =>
                prevDestinations.map(destination =>
                    destination.id === id ? { ...destination, favorites: updatedFavorites } : destination
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { destination: item })}>
            <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text
                    style={[
                        styles.tag,
                        item.difficulty?.toLowerCase() === "fácil"
                            ? styles.easy
                            : item.difficulty?.toLowerCase() === "moderada"
                            ? styles.moderate
                            : styles.difficult,
                    ]}
                >
                    {item.difficulty}
                </Text>
                <Button title={`Favoritos (${item.favorites})`} onPress={() => toggleFavorite(item.id, item.favorites)} />
                <Button title="Eliminar" onPress={() => handleDelete(item.id)} />
                <Button title="Editar" onPress={() => navigation.navigate('AddEditDestination', { destination: item })} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={destinations.sort((a, b) => b.favorites - a.favorites)}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity
                style={[styles.button, Platform.OS === 'android' ? styles.androidButton : styles.iosButton]}
                onPress={() => navigation.navigate('AddEditDestination')}
            >
                <Text style={Platform.OS === 'android' ? styles.androidButtonText : styles.iosButtonText}>
                    {Platform.OS === 'android' ? 'Agregar Destino' : 'Agregar Destino'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        maxWidth: '85%',
        alignSelf: 'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tag: {
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    easy: {
        backgroundColor: 'green',
        color: 'white', 
    },
    moderate: {
        backgroundColor: 'yellow',
        color: 'black', 
    },
    difficult: {
        backgroundColor: 'purple',
        color: 'white', 
    },
    default: {
        backgroundColor: 'gray',
        color: 'white', 
    },
    button: {
        padding: 16,
        borderRadius: 4,
        marginTop: 16,
    },
    androidButton: {
        backgroundColor: 'blue',
        alignSelf: 'flex-start',
    },
    iosButton: {
        backgroundColor: 'green',
        alignSelf: 'flex-end',
    },
    androidButtonText: {
        color: 'black',
    },
    iosButtonText: {
        color: 'white',
    },
});

export default HomeScreen;