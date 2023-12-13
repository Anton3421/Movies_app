import { useState, useEffect } from 'react';
import React from 'react';
import { StyleSheet, TextInput, View, Text, FlatList, Image, Dimensions } from 'react-native';
import { Header, Input, Button, Icon, ListItem } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';




export default function Movies( { addToWatchlist }) {
    const [keyword, setKeyword] = useState('')
    const [movies, setMovies] = useState([]);
    
    const screenWidth = Dimensions.get('window').width;

    const getMovie = () => {
        fetch(`http://www.omdbapi.com/?apikey=641ba9a9&t=${keyword}`)
        .then(response => response.json())
        .then(data => setMovies([data]))
        .catch(error => {
        Alert.alert('Error', error);
        });
        }

    const addMovie = (item) => {
        addToWatchlist(item);
    }

    return (
        <View style={styles.container}>
            
            <Input
                style={{ fontSize: 18, width: 200, color: 'white' }}
                placeholder='Type movie here'
                value={keyword}
                onChangeText={text => setKeyword(text)}
            />
            <Button onPress={getMovie} color='yellow'>
                <Text style={{ color: 'black', fontSize: 20 }}>Search movie</Text>
                <MaterialIcons name="search" color="black" size={25} />
            </Button>
            
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 900, color: 'yellow' }}>{item.Title} ({item.Year})</Text>
                        <Image style={{ width: screenWidth , height: screenWidth }}
                            source={{ uri: item.Poster }}
                        />
                        <Text style={{ fontSize: 13, fontWeight: "normal", color: 'yellow' }}>{item.Plot}</Text>
                        <Button onPress={() => addMovie(item)} color='yellow'>
                            <Text style={{ color: 'black' }}>Add to watchlist</Text>
                            <MaterialIcons name="add-box" color="black" size={30} />
                        </Button>
                    </View>}
                data={movies} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });