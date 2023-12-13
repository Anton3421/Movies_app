import React from 'react'
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import Movies from './Movies'
import WatchList from './WatchList'

const db = SQLite.openDatabase('moviedb.db');

const Tab = createBottomTabNavigator();

export default function App() {
  const [watchList, setWatchList] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists watchlist (id integer primary key autoincrement, Title TEXT, Year TEXT, Poster TEXT, Plot TEXT);');
    }, () => console.error("Error when creating DB"), null);
  }, []);

  const addToWatchlist = (movie) => {
    setWatchList(prevWatchList => [...prevWatchList, movie]);

    db.transaction(tx => {
      tx.executeSql(
        'insert into Watchlist (Title, Year, Poster, Plot) VALUES (?, ?, ?, ?);',
        [movie.Title, movie.Year, movie.Poster, movie.Plot]);
    }, null, null)
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from Watchlist;', [], (_, { rows }) => {
          setWatchList(rows._array);
        },
      );
    });
  }, []);

  const removeAddedMovie = (remove) => {
    const newWatchList = watchList.filter(movie => movie !== remove);
    setWatchList(newWatchList);

    db.transaction(tx => {
      tx.executeSql(
        'delete from Watchlist where id = ?;',
        [remove.id]);
      }, null, null)     
  };

  return (
    
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({}) => {
            let iconName;

            if (route.name === 'Movies') {
              iconName = 'local-movies';
            } else if (route.name === 'Watchlist') {
              iconName = 'collections';
            }
            return <MaterialIcons name={iconName} size={35} color='yellow' />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: 'yellow',
          },
          tabBarStyle: {
            backgroundColor: 'black', 
          },
        })}>
          
          <Tab.Screen name="Movies"
          options={{  
            headerStyle: {
              backgroundColor: 'black', 
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}>
          {props => <Movies {...props} addToWatchlist={addToWatchlist} />}
        </Tab.Screen>

        <Tab.Screen name="Watchlist"
        options={{  
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}>
          {props => ( <WatchList {...props} watchList={watchList} removeAddedMovie={removeAddedMovie}/>)}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>

  );
}

