import React from 'react';
import { StyleSheet, TextInput, View, Text, FlatList, Image } from 'react-native';
import { Header, Input, Button, Icon, ListItem } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function WatchList({ watchList, removeAddedMovie }) {

    const removeMovie = (item) => {
         removeAddedMovie(item);
    }

    return (
        <View style={styles.container}>

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.flatListContainer}>
                        <Text style={{ color: 'yellow' }}>{item.Title} ({item.Year})</Text>
                        <View style={styles.textContainer}>
                            <Image style={{ width: 150, height: 200 }} source={{ uri: item.Poster }} />
                            <Text style={{ color: 'yellow' }}>- {item.Plot}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button onPress={() => removeMovie(item)} color='yellow'>
                            <Text style={{ color: 'black', fontSize: 12 }}>Remove from watchlist</Text>
                            <MaterialIcons name="delete" color="black" size={20} />
                        </Button>
                        </View>
                    </View>
                )}
                data={watchList} />
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
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        marginRight: 300,
    },
    buttonContainer: {
        width: 150,
        height: 40,
        marginBottom: 20,
    }
  });