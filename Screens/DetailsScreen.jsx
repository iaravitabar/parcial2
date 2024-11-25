import React from 'react';
import {View, Text, StyleSheet } from 'react-native';


const DetailsScreen = ({ route }) => {
    const { destination } = route.params;

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{destination.name}</Text>
            <Text style={styles.description}>{destination.description}</Text>
            <Text style={[styles.tag, styles[destination.difficulty.toLowerCase()]]}>{destination.difficulty}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    tag : {
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
        backgroundColor: 'violet',
        color: 'white',
    },
});

export default DetailsScreen;